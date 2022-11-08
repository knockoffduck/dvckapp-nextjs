import 'chart.js/auto';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { Chart } from 'react-chartjs-2';
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



export default function UpBank() {
    let url = 'https://dvckapp.xyz/chart'
    const [fetched, setFetched] = useState(false)
    const [loading, setLoading] = useState(false)
    const [clicked, setClicked] = useState(false)
    const [data, setData] = useState({})

    useEffect(() => {
        onbuttonclick()
    }, []);

    const onbuttonclick = async () => {
        const data = await fetchProducts(url)
        setData({
            labels: data.map((data) => data.x),
            datasets: [{
                label: "Amount Spent",
                data: data.map((data) => data.y),
                fill: 'start',
                backgroundColor: (context) => {
                    const ctx = context.chart.ctx;
                    const gradient = ctx.createLinearGradient(0, 0, 0, 275);
                    gradient.addColorStop(0, "rgba(96, 250, 103, 1)");
                    gradient.addColorStop(1, "rgba(96, 250, 103, 0)");
                    return gradient;
                },
                borderColor: 'rgb(96 250 103)',
                borderWidth: 2,
            }]
        })
        console.log(await data)
        setFetched(true)
    }


    return (
        <div className='flex bg-[#191c21]'>
            <div className='h-screen w-[15vw] flex px-16 pt-4'>
            </div>
            <div className='grid h-screen w-[85vw] content-start'>
                <div className='h-[10vh] flex place-items-center justify-between pr-10'>
                    <h3 className='font-bold text-4xl'>Dashboard</h3>
                    <Link href='/'>
                        <BiHomeAlt className='text-3xl'></BiHomeAlt>
                    </Link>
                </div>
                <div className="grid grid-cols-3 grid-rows-5 gap-6 pr-8">
                    <div className="box h-[100%] row-span-2">
                        <h3 className='py-4 text-2xl'>Accounts Summary</h3>
                        <div className='bg-[#24292d] drop-shadow-2xl h-[25vh] rounded-lg'></div>
                    </div>
                    <div className="box h-[100%] row-span-2">
                        <h3 className='py-4 text-2xl'>Top Activity</h3>
                        <div className='bg-[#24292d] drop-shadow-2xl h-[25vh] rounded-lg'></div>
                    </div>
                    <div className="box h-[100%] row-span-5">
                        <h3 className='py-4 text-2xl'>Recent Transactions</h3>
                        <div className='bg-[#24292d] drop-shadow-2xl h-[85%] rounded-lg'></div>
                    </div>
                    <div className="box h-[100%] row-span-3 col-span-2">
                        <h3 className='py-4 text-2xl'>Monthly Spending Graph</h3>
                        <div className='relative bg-[#24292d] drop-shadow-2xl rounded-lg h-[75%] flex justify-center items-center'>
                            {fetched ? <Chart id='chart' className='p-5' type='line' data={data} options={{ elements: { point: { pointHitRadius: 25 } }, tension: 0.3, maintainAspectRatio: false, scales: { y: { grid: { color: 'rgba(46, 50, 61, 1)' } }, x: { grid: { color: 'rgba(46, 50, 61, 0)' } } } }} /> :
                                <button onClick={onbuttonclick} className='btn'>Get chart</button>
                            }
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

