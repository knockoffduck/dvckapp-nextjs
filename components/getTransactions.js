import moment from 'moment';
import React, { useEffect, useState } from 'react';

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

export default function GetTransactions() {
    const [fetched, setFetched] = useState(false)
    const [data, setData] = useState([])

    useEffect(() => {
        getData()
    }, []);

    const getData = async () => {
        const url = 'https://dvckapp.xyz/transactions'
        const transactionData = await fetchData(url)
        const transactions = transactionData.map((transaction) => {
            const datesplit = transaction.TransactionDate.split('-')
            const date = `${datesplit[2]} ${moment(datesplit[1] - 1).format('MMM')} ${datesplit[0]}`
            return {
                id: transaction.id,
                Merchant: transaction.Merchant,
                Amount: transaction.Amount,
                TransactionDate: date,
                Category: transaction.Category,
                AccountID: transaction.AccountID,
                Type: transaction.Type
            }
        })
        let purchaseData = transactions.filter((transaction) => {
            return transaction.Type == 'Credit'
        })
        setData(await purchaseData)
        setFetched(true)
        console.log(await transactions)
    }

    return (
        <table className='table w-full pb-1'>
            <tbody>
                {fetched ?
                    data.slice(0, 7).map((transaction, index) => {
                        return (
                            <tr key={index} className='hover bg-[#24292d]'>
                                <td className='p-5 bg-[#24292d]'><div>
                                    <h4 className='text-md'>{transaction.Merchant}</h4>
                                    <h5 className='text-xs text-gray-300 font-thin'>{transaction.Category}</h5>
                                </div></td>
                                <td className='bg-[#24292d]'>
                                    <h5 className='text-md text-white text-opacity-50'>{transaction.TransactionDate}</h5>

                                </td>
                                <td className='bg-[#24292d]'><h4 className='text-md'>
                                    ${transaction.Amount}
                                </h4></td>
                            </tr>
                        )
                    }) :
                    <button onClick={() => getData()} className={!fetched ? 'btn' : 'btn loading'}>Fetch</button>
                }
            </tbody>
        </table>
    )
}