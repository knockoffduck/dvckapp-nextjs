import React, { useState } from 'react';

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
        <div className='grid bg-[#191c21] h-full w-screen gap-6 pb-20 place-items-center'>
            <div className='h-[70px] w-full p-6'>
                <h1 className='text-4xl font-bold'>Shift Details</h1>
            </div>
            {!fetched ? <button onClick={() => getShiftData()} className={!loading ? 'btn w-[150px]' : 'btn loading'}>{!loading ? 'Get Data' : 'Fetching Data'}</button> :
                <div className='grid grid-cols-1 place-items-center'>
                    <div className='flex flex-col bg-[#24292d] drop-shadow-2xl w-[332px] h-[664px] rounded-lg'>
                        <div className='grid place-items-center h-[70px] w-full pt-3'>
                            <h2 className='font-semibold text-2xl'>14 - 21 November 2022</h2>
                            <div className='relative border-b w-[90%]'></div>
                        </div>
                        <div className='grid place-items-center p-5 gap-14'>
                            <div>
                                <h4 className='font-thin text-center text-xl'>Net Income</h4>
                                <h3 className='font-bold text-center text-2xl'>${data.Summary.NetIncome}</h3>
                            </div>
                            <div>
                                <h4 className='font-thin text-center text-xl'>Gross Income</h4>
                                <h3 className='font-bold text-center text-2xl'>${data.Summary.GrossIncome}</h3>
                            </div>
                            <div>
                                <h4 className='font-thin text-center text-xl'>Base Hours</h4>
                                <h3 className='font-bold text-center text-2xl'>{data.Summary.BaseHours}</h3>
                            </div>
                            <div>
                                <h4 className='font-thin text-center text-xl'>Penalty Hours</h4>
                                <h3 className='font-bold text-center text-2xl'>{data.Summary.PenaltyHours}</h3>
                            </div>
                            <div>
                                <h4 className='font-thin text-center text-xl'>Total Hours</h4>
                                <h3 className='font-bold text-center text-2xl'>{data.Summary.TotalHours}</h3>
                            </div>
                        </div>
                    </div>
                </div>
            }
        </div>
    )
}
