import moment from 'moment';
import Link from 'next/link';
import React, { useState } from 'react';
import { BiHomeAlt } from 'react-icons/bi';

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

export default function Coles() {
    const [fetched, setFetched] = useState(false)
    const [loading, setLoading] = useState(false)
    const [data, setData] = useState([])
    const url = 'https://dvckapp.xyz/shiftdata';

    const getShiftData = async () => {
        setLoading(true)
        const data = await fetchProducts(url)
        setFetched(true)
        setData(await data)
        console.log(data)
    }

    return (
        <div className={fetched ? 'grid bg-[#191c21] h-full w-screen gap-6 place-items-center' : 'grid bg-[#191c21] h-screen w-screen gap-6'}>
            <div className='flex h-[100px] w-full p-6 justify-between items-center'>
                <h1 className='text-4xl font-bold'>Shift Details</h1>
                <Link href='/'>
                    <BiHomeAlt className='text-3xl'></BiHomeAlt>
                </Link>
            </div>
            {!fetched ? <div className='flex justify-center'><button onClick={() => getShiftData()} className={!loading ? 'btn w-[150px]' : 'btn loading'}>{!loading ? 'Get Data' : 'Fetching Data'}</button></div> :
                <div className='grid grid-cols-1 place-items-center pb-14'>
                    <div className='flex flex-col bg-[#24292d] drop-shadow-2xl w-[332px] h-[664px] rounded-lg'>
                        <div className='grid place-items-center h-[70px] w-full pt-3'>
                            <h2 className='font-semibold text-2xl'>14 - 21 November 2022</h2>
                            <div className='relative border-b w-[90%]'></div>
                        </div>
                        <div className='grid place-items-center p-5 gap-14'>
                            <div>
                                <h4 className='font-thin text-center text-xl'>Net Income</h4>
                                <h3 className='font-bold text-center text-2xl'>${data.Summary[0].NetIncome}</h3>
                            </div>
                            <div>
                                <h4 className='font-thin text-center text-xl'>Gross Income</h4>
                                <h3 className='font-bold text-center text-2xl'>${data.Summary[0].GrossIncome}</h3>
                            </div>
                            <div>
                                <h4 className='font-thin text-center text-xl'>Base Hours</h4>
                                <h3 className='font-bold text-center text-2xl'>{data.Summary[0].BaseHours}</h3>
                            </div>
                            <div>
                                <h4 className='font-thin text-center text-xl'>Penalty Hours</h4>
                                <h3 className='font-bold text-center text-2xl'>{data.Summary[0].PenaltyHours}</h3>
                            </div>
                            <div>
                                <h4 className='font-thin text-center text-xl'>Total Hours</h4>
                                <h3 className='font-bold text-center text-2xl'>{data.Summary[0].TotalHours}</h3>
                            </div>
                        </div>
                    </div>
                </div>
            }
            {fetched &&
                <div className='flex flex-col bg-[#24292d] drop-shadow-2xl w-full rounded-xl'>
                    <div className='grid h-[70px] w-full p-6'>
                        <h2 className='text-2xl'>This Week&apos;s Shifts</h2>
                    </div>
                    <div className="grid px-6 pb-6 gap-8">
                        {fetched && data.ShiftDetails.map((shift, index) => {
                            return (
                                <div key={index} className='grid grid-cols-3 grid-rows-1 bg-[#24292d] drop-shadow-2xl w-full h-[100px] rounded-xl justify-between'>
                                    <div className='flex flex-col justify-center pl-6 w-[1/3]'>
                                        <h3 className=''>{moment(shift.Date, 'DD/MM/YYYY').format('DD')} {moment(shift.Day, 'ddd').format('ddd')}</h3>
                                        <h4 className='text-white text-thin text-opacity-50 text-sm'>{shift.TotalHours} Hours</h4>
                                    </div>
                                    <div className='flex flex-col justify-center w-[1/3]'>
                                        <h3 className='text-white text-opacity-50 text-sm text-center'>{shift.Start} - {shift.End}</h3>
                                    </div>
                                    <div className='flex flex-col justify-center px-6 w-[1/3]'>
                                        <h3 className='text-xl font-bold text-center'>${shift.Pay.toFixed(2)}</h3>
                                    </div>
                                </div>
                            )
                        })}

                    </div>
                </div>
            }
        </div>
    )
}
