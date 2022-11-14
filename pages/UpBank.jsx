import 'chart.js/auto';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { Chart } from 'react-chartjs-2';
import { BiBookContent, BiHomeAlt } from 'react-icons/bi';
import { VscArrowSwap, VscGraph, VscSettings } from 'react-icons/vsc';
import GetAccountData from '../components/getAccountData';
import GetTransactions from '../components/getTransactions';
import TopCategories from '../components/TopCategories';

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
    const [data, setData] = useState({})

    const options = {
        elements: {
            point: {
                pointHitRadius: 50,
                pointRadius: 0
            }
        },
        tension: 0.4,
        maintainAspectRatio: true,
        scales: {
            y: {
                grid: {
                    color: 'rgba(46, 50, 61, 1)'
                }
            },
            x: {
                grid: {
                    color: 'rgba(46, 50, 61, 0)'
                }
            }
        }
    }

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
                    gradient.addColorStop(0, "rgba(204, 160, 227, 1)");
                    gradient.addColorStop(1, "rgba(204, 160, 227, 0)");
                    return gradient;
                },
                borderColor: 'rgb(204, 160, 227)',
                borderWidth: 2,
            }]
        })
        setFetched(true)
    }


    return (
        <div className='grid'>

            <div className='grid bg-[#191c21] h-full w-screen content-start pb-24'>
                <div className='h-[10vh] flex place-items-center justify-between px-5'>
                    <h3 className='font-bold text-4xl'>Dashboard</h3>
                    <Link href='/'>
                        <BiHomeAlt className='text-3xl'></BiHomeAlt>
                    </Link>
                </div>
                <div className="grid grid-cols-1 tablet:grid-cols-3 tablet:grid-rows-5 gap-6 justify-items-center px-5">
                    <div className="box h-[100%] w-full">
                        <h3 className='py-4 text-2xl'>Accounts Summary</h3>
                        <div className='bg-[#24292d] drop-shadow-2xl w-full'>
                            <GetAccountData />
                        </div>
                    </div>
                    <div className="box h-[100%] w-full">
                        <h3 className='py-4 text-2xl'>Top Activity</h3>
                        <div className='bg-[#24292d] drop-shadow-2xl w-full rounded-lg'>
                            <TopCategories />
                        </div>
                    </div>
                    <div className="box h-[100%] w-full">
                        <h3 className='py-4 text-2xl'>Recent Transactions</h3>
                        <div className='bg-[#24292d] drop-shadow-2xl w-full rounded-lg'>
                            <GetTransactions />
                            <div className='pb-4 px-4'>
                                <Link href='/'>
                                    <button className='w-full btn'>
                                        <h3 className='text-center'>Show All</h3>
                                    </button>
                                </Link>
                            </div>
                        </div>
                    </div>
                    <div className="box h-[100%] w-full">
                        <h3 className='py-4 text-2xl'>Monthly Spending Graph</h3>
                        <div className='relative bg-[#24292d] drop-shadow-2xl rounded-lg h-[75%] flex justify-center items-center'>
                            {fetched ? <Chart id='chart' className='p-5' type='line' data={data} options={options} /> :
                                <button onClick={() => onbuttonclick()} className='btn loading'></button>
                            }
                        </div>
                    </div>
                </div>

            </div>
            <nav className='tablet:h-screen tablet:w-[15vw] w-screen grid grid-rows-3 py-4 order-last tablet:order-1 fixed inset-x-0 bottom-0 h-[10%] '>
                <ul className='grid grid-flow-row grid-cols-4 tablet:grid-rows-4 gap-4'>
                    <li className='grid tablet:justify-start gap-1 place-items-center'>
                        <BiBookContent className='text-2xl'></BiBookContent>
                        <h3 className='text-sm'>Dashboard</h3>
                    </li>
                    <li className='grid tablet:justify-start gap-1 place-items-center'>
                        <VscGraph className='text-2xl'></VscGraph>
                        <h3>Analytics</h3>
                    </li>
                    <li className='grid tablet:justify-start gap-1 place-items-center'>
                        <VscArrowSwap className='text-2xl'></VscArrowSwap>
                        <h3>Transactions</h3>
                    </li>
                    <li className='grid tablet:justify-start gap-1 place-items-center'>
                        <VscSettings className='text-2xl'></VscSettings>
                        <h3>Settings</h3>
                    </li>
                </ul>

            </nav>
        </div >
    )
}

