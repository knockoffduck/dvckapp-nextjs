import { format, parse } from 'date-fns';
import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import io from "socket.io-client";


async function fetchProducts(url) {
    const response = await fetch(url, {
        next: {
            revalidate: 20,
        }
    });

    if (!response.ok) {
        throw new Error(`Error! status: ${response.status}`)
    }
    return response.json()
}

export default function ShiftViewer() {
    const [current, setCurrent] = useState(0)
    const [week, setWeek] = useState(null)
    const [loading, setLoading] = useState(false)
    const [fetched, setFetched] = useState(false)
    const [data, setData] = useState([])
    const [currentShifts, setCurrentShifts] = useState(null)
    const [shiftData, setShiftData] = useState([])
    let [length, setLength] = useState(0);
    const [updated, setUpdated] = useState('')
    const [socket, setSocket] = useState(null)
    const [progress, setProgress] = useState(0)
    const [pressed, setPressed] = useState(false)
    const url = 'https://dvckapp.xyz/api';

    const nextSlide = () => {
        setCurrent(current === length - 1 ? 0 : current + 1)
        setWeek(data[current])
        console.log(data[current].date)
        setPressed(false)
    }
    const prevSlide = () => {
        setCurrent(current === 0 ? length - 1 : current - 1)
        setWeek(data[current])
        console.log(data[current].date)
        setPressed(false)
    }
    const test = () => {
        updateShifts()
        setPressed(true)
    }

    const updateShifts = () => {
        const shiftArray = []
        shiftData.map((shift) => {
            if (shift.WeekID == data[current].id) {
                shiftArray.push(shift)
            }
        })
        setCurrentShifts(shiftArray)
        console.log(data[current], currentShifts)
    }
    const loadData = async () => {
        setLoading(true)
        try {
            const data = await fetchProducts(url)
            const shiftdata = await fetchProducts('https://dvckapp.xyz/shifts')
            setShiftData(shiftdata)
            setData(data.reverse())
            setLength(await data.length)
            setLoading(false)
            setWeek(data[current])
            setFetched(true)
        } catch (error) {
            console.log(error.message)
        }
        if (fetched) {
        }
    }
    const sendReq = () => {
        socket.emit(`request', 'begin, ${data[current].timetable_url}`)
    }
    const sendCount = () => {
        socket.emit('request', 'checkCount')
    }

    useEffect(() => {
        if (!fetched) {
            loadData()
        }
    }, []);

    useEffect(() => {
        if (!socket) {
            setSocket(io("https://dvckapp.xyz", { path: '/ws' }))
        }
        return () => {
            socket?.disconnect()
        }
    }, [socket])

    useEffect(() => {
        if (!socket) return
        socket.on('message', (text) => {
            setUpdated(text)
        })
        socket.on('progress', (percentage) => {
            setProgress(parseFloat(percentage))
        })

        return () => {
            socket.off('message')
            socket.off('progress')
        }
    }, [socket])



    return (
        <div className='grid justify-center'>
            <div className='flex h-[90px] w-full justify-center items-center'>
                <h1 className='text-center font-bold text-3xl'>
                    Shifts
                </h1>
            </div>
            <div className='flex flex-col w-full pb-8 gap-4 justify-center place-items-center'>
                {pressed &&
                    currentShifts.map((shift, index) => {
                        return (
                            <div key={index} className="bg-[url('../public/ShiftBG.svg')] h-[72px] w-[320px] flex text-black">
                                <div className='text-center  flex flex-col  justify-center w-[80px]'>
                                    <h5 className='font-bold leading-6 text-2xl'>{shift.Day}</h5>
                                    <h5 className='text-md leading-6'>{shift.Date}</h5>
                                </div>
                                <div className='flex flex-col w-[150px] justify-center items-center'>
                                    <h5 className='text-sm leading-6'>{shift.Start} to {shift.End}</h5>
                                </div>
                                <div className='flex w-[100px] justify-center items-center'>
                                    <h5 className='font-bold text-xl'>{shift.Hours} Hrs</h5>
                                </div>
                            </div>
                        )
                    })
                }

            </div>
            <div className='bg-[#25292D] flex flex-col pt-4 h-[670px] w-screen rounded-t-2xl'>
                <div className='flex w-full h-[34px] col-span-2 place-items-center justify-center'>
                    {fetched && <h4 className='text-center text-2xl font-semibold'>{
                        format(parse(data[current].date, 'dd MMMM yyyy', new Date), 'dd MMM')

                    }</h4>}


                </div>
                <div className='grid grid-cols-2 grid-rows-2 py-5 px-7 gap-6 w-full'>
                    <div className='bg-[#393D42] text-white btn flex justify-center items-center shadow-md w-full h-[80px] rounded-lg'>
                        <IoIosArrowBack onClick={nextSlide} className='text-5xl' />
                    </div>
                    <div className='bg-[#393D42] text-white btn flex justify-center items-center shadow-md w-full h-[80px] rounded-lg'>
                        <IoIosArrowForward onClick={prevSlide} className='text-5xl' />
                    </div>
                    <div onClick={test} className='bg-[#7C7AFF] text-white btn normal-case shadow-md col-span-2 w-full h-[80px] rounded-lg place-items-center justify-center flex'>
                        <h4 className='text-center text-2xl font-semibold'>Get Shifts</h4>
                    </div>
                </div>
                <div className='grid w-full h-[34px] col-span-2 place-items-center justify-center pt-10 gap-10'>
                    <h4 className='text-center text-2xl font-semibold'>Timetable</h4>
                    <div className='grid gap-6 justify-items-center' >
                        {fetched &&
                            <div className="relative h-[179px] w-[316px]">
                                <Image src={data[current].timetable_url} fill alt={data[current].date} priority className="rounded-lg" />
                            </div>
                        }

                    </div>
                </div>
            </div>
        </div>
    )
}
