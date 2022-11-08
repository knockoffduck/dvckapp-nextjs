import 'chart.js/auto';
import React, { useEffect, useState } from 'react';
import { Chart } from 'react-chartjs-2';

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

export default function GetAccountData() {
    const [fetched, setFetched] = useState(false)
    const [data, setData] = useState({})

    const options = {
        plugins: {

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
        try {
            const result = await fetchProducts(url)
            result.map((account) => {
                final.Total += account.Balance
                final.Accounts += 1
                final.AccountLabels.push(account.Name)
                final.AccountBalances.push(account.Balance)
            })
            setData({
                labels: final.AccountLabels,
                datasets: [{
                    label: 'My First Dataset',
                    data: final.AccountBalances,
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
        <div className='w-[50%] flex relative '>
            {fetched ? <Chart id='chart' className='p-5' type='doughnut' data={data} options={options} /> :
                <button onClick={getData} className='btn loading'></button>
            }
        </div>
    )
}
