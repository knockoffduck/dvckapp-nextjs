import 'chart.js/auto';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { Chart } from 'react-chartjs-2';
import { BiBookContent, BiHomeAlt } from 'react-icons/bi';
import { VscArrowSwap, VscGraph, VscSettings } from 'react-icons/vsc';
import GetAccountData from '../components/getAccountData';
import GetTransactions from '../components/getTransactions';

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
        setFetched(true)
    }


    return (
        <div className='flex bg-[#191c21]'>
            <div className='h-screen w-[15vw] grid grid-rows-3 top-0 pt-5 pl-5'>
                <h3>UP</h3>
                <div className='grid grid-rows-4 gap-0 row-start-2 grid-flow-dense'>
                    <div className='flex justify-start gap-2'>
                        <BiBookContent className='text-2xl'></BiBookContent>
                        <h3>Dashboard</h3>
                    </div>
                    <div className='flex justify-start gap-2'>
                        <VscGraph className='text-2xl'></VscGraph>
                        <h3>Analytics</h3>
                    </div>
                    <div className='flex justify-start gap-2'>
                        <VscArrowSwap className='text-2xl'></VscArrowSwap>
                        <h3>Transactions</h3>
                    </div>
                    <div className='flex justify-start gap-2'>
                        <VscSettings className='text-2xl'></VscSettings>
                        <h3>Settings</h3>
                    </div>
                </div>
                <div className='h-[100%] '>

                </div>
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
                        <div className='bg-[#24292d] drop-shadow-2xl h-[25vh] rounded-lg flex justify-between items-center'>
                            <div className='flex flex-col w-[50%] '>
                                <h4 className='px-5 text-2xl text-center '>Total Balance</h4>
                                <h4 className='px-5 text-lg text-center font-thin'>$3444</h4>

                            </div>
                            <GetAccountData />
                        </div>
                    </div>
                    <div className="box h-[100%] row-span-2">
                        <h3 className='py-4 text-2xl'>Top Activity</h3>
                        <div className='bg-[#24292d] drop-shadow-2xl h-[25vh] rounded-lg'></div>
                    </div>
                    <div className="box h-[100%] row-span-5">
                        <h3 className='py-4 text-2xl'>Recent Transactions</h3>
                        <div className='bg-[#24292d] drop-shadow-2xl h-[85%] rounded-lg'>
                            <GetTransactions />
                        </div>
                    </div>
                    <div className="box h-[100%] row-span-3 col-span-2">
                        <h3 className='py-4 text-2xl'>Monthly Spending Graph</h3>
                        <div className='relative bg-[#24292d] drop-shadow-2xl rounded-lg h-[75%] flex justify-center items-center'>
                            {fetched ? <Chart id='chart' className='p-5' type='line' data={data} options={{
                                elements: {
                                    point: {
                                        pointHitRadius: 50,
                                        pointRadius: 0
                                    }
                                },
                                tension: 0.4,
                                maintainAspectRatio: false,
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
                            } /> :
                                <button onClick={() => onbuttonclick()} className='btn loading'></button>
                            }
                        </div>
                    </div>
                </div>
            </div>
        </div >
    )
}

