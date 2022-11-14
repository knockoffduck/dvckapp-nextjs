import 'chart.js/auto';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import React, { useEffect, useState } from 'react';
import { Chart } from 'react-chartjs-2';

async function fetchData(url) {
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

export default function GetAccountData() {
    const [fetched, setFetched] = useState(false)
    const [data, setData] = useState({})
    const [total, setTotal] = useState(0)

    const options = {
        cutout: 110,
        plugins: {
            datalabels: {
                backgroundColor: 'black',
                color: 'white',
                borderRadius: 25,
                borderWidth: 2,
            },

            legend: {
                display: false
            },
            chartAreaBorder: {
                borderColor: 'red',
                borderWidth: 4,

            }
        },
    }
    useEffect(() => {
        getData()
    }, []);

    const getData = async () => {
        let url = 'https://dvckapp.xyz/accounts'
        const final = { Total: 0, Accounts: 0, AccountLabels: [], AccountBalances: [] }
        const displayData = { AccountLabels: [], AccountBalances: [] }
        try {
            const result = await fetchData(url)
            result.map((account) => {
                final.Total += account.Balance
                final.Accounts += 1
                final.AccountLabels.push(account.Name)
                final.AccountBalances.push(account.Balance)
            })
            result.map((account) => {
                if (account.Balance / final.Total > 0.1) {
                    displayData.AccountLabels.push(account.Name)
                    displayData.AccountBalances.push(account.Balance)
                }
            })
            setTotal(final.Total)
            setData({
                labels: displayData.AccountLabels,
                datasets: [{
                    label: 'My First Dataset',
                    data: displayData.AccountBalances,
                    borderWidth: 0,
                    backgroundColor: ['rgb(124 120 255)', 'rgb(255 246 103)', 'rgb(104 210 114)', 'rgb(246 215 139)'],
                    hoverOffset: 2,
                    clip: false,
                }]
            })
            setFetched(true)
        } catch (error) {
            console.log(error)
        }
        console.log(final)
    }

    return (
        <div className=''>
            <div className='grid place-items-center'>
                <div className='absolute flex flex-col border justify-center'>
                    <h4 className='px-5 text-lg text-center '>Total</h4>
                    <h4 className='px-5 text-3xl text-center font-bold'>${total}</h4>
                </div>
                <div className='flex border w-full sm:w-[360px]'>
                    {fetched ? <Chart id='chart' className='p-5' type='doughnut' data={data} options={options} plugins={[ChartDataLabels]} /> :
                        <button onClick={getData} className='btn loading'></button>
                    }
                </div>
            </div>
            <div className='w-full h-[20vh] border '></div>
        </div>
    )
}
