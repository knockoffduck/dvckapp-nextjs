import { format, parse } from 'date-fns';
import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";

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
    const [current, setCurrrent] = useState(0)
    const [loading, setLoading] = useState(false)
    const [fetched, setFetched] = useState(false)
    const [data, setData] = useState([])
    let [length, setLength] = useState(0);
    const url = 'https://dvckapp.xyz/api';

    const nextSlide = () => {
        setCurrrent(current === length - 1 ? 0 : current + 1)
    }
    const prevSlide = () => {
        setCurrrent(current === 0 ? length - 1 : current - 1)
    }

    const loadData = async () => {
        setLoading(true)
        try {
            const data = await fetchProducts(url)
            setData(data.reverse())
            setLength(await data.length)
            setLoading(false)
            setFetched(true)
        } catch (error) {
            console.log(error.message)
        }
    }

    useEffect(() => {
        if (!fetched) {
            loadData()
        }
    }, []);



    return (
        <div className='grid justify-center'>
            <div className='flex h-[90px] w-full justify-center items-center'>
                <h1 className='text-center font-bold text-3xl'>
                    Shifts
                </h1>
            </div>
            <div className='flex flex-col w-full pb-8 gap-4 justify-center place-items-center'>
                <div className="bg-[url('../public/ShiftBG.svg')] h-[72px] w-[320px] flex text-black">
                    <div className='text-center  flex flex-col  justify-center w-[80px]'>
                        <h5 className='font-bold leading-6 text-2xl'>Thu</h5>
                        <h5 className='text-md leading-6'>10 Nov</h5>
                    </div>
                    <div className='flex w-[150px] justify-center items-center'>
                        <h5 className='text-md leading-6'>09:00 - 17:00</h5>
                    </div>
                    <div className='flex w-[100px] justify-center items-center'>
                        <h5 className='font-bold text-xl'>8 Hrs</h5>
                    </div>
                </div>

            </div>
            <div className='bg-[#25292D] flex flex-col pt-4 h-[670px] w-screen rounded-t-2xl'>
                <div className='border flex w-full h-[34px] col-span-2 place-items-center justify-center'>
                    {fetched && data.map((timetable, index) => {
                        if (index === current) {
                            return (<h4 key={index} className='text-center text-2xl font-semibold'>{format(parse(timetable.date, 'dd MMMM yyyy', new Date), 'dd MMM')}</h4>)
                        }
                    }
                    )
                    }
                </div>
                <div className='grid grid-cols-2 grid-rows-2 py-5 px-7 gap-6 w-full'>
                    <div className='bg-[#393D42] text-white btn flex justify-center items-center shadow-md w-full h-[80px] rounded-lg'>
                        <IoIosArrowBack onClick={nextSlide} className='text-5xl' />
                    </div>
                    <div className='bg-[#393D42] text-white btn flex justify-center items-center shadow-md w-full h-[80px] rounded-lg'>
                        <IoIosArrowForward onClick={prevSlide} className='text-5xl' />
                    </div>
                    <div className='bg-[#7C7AFF] text-white btn normal-case shadow-md col-span-2 w-full h-[80px] rounded-lg place-items-center justify-center flex'>
                        <h4 className='text-center text-2xl font-semibold'>
                            Add to Calendar
                        </h4>
                    </div>
                </div>
                <div className='grid w-full h-[34px] col-span-2 place-items-center justify-center pt-10 gap-10'>
                    <h4 className='text-center text-2xl font-semibold'>Timetable</h4>
                    <div className=''>
                        {fetched &&
                            data.map((timetable, index) => {
                                return (<div key={index} className='grid gap-6 justify-items-center' >
                                    {index === current && (
                                        <div className="relative h-[179px] w-[316px]">
                                            <Image src={timetable.timetable_url} fill alt={timetable.date} priority className="rounded-lg" />
                                        </div>
                                    )}

                                </div>
                                )
                            })
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}
