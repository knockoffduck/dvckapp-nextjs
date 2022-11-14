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

export default function TopCategories() {
  const [fetched, setFetched] = useState(false)
  const [data, setData] = useState([])
  const month = moment().format('MMMM')

  useEffect(() => {
    getData()
  }, []);


  const getData = async () => {
    const url = 'https://dvckapp.xyz/transactions'
    const transactionData = await fetchData(url)

    const purchaseData = transactionData.filter((transaction) => {
      return transaction.Type == 'Credit' && moment(transaction.TransactionDate).format('MMMM') === month && transaction.Category !== 'Uncategorised'
    })

    const groupedCategories = Object.values(purchaseData.reduce((r, o) => (r[o.Category]
      ? (r[o.Category].Amount += o.Amount)
      : (r[o.Category] = { ...o }), r), {}))
    groupedCategories.sort((a, b) => b.Amount - a.Amount)
    setData(groupedCategories)
    setFetched(true)
  }

  return (
    <div className='grid justify-center py-3 gap-2 w-full'>
      <h3 className='text-center text-xl'>{month}</h3>
      <table className='table w-full'>
        <tbody>
          {fetched ? data.slice(0, 3).map((category, index) => {
            return (
              <tr key={index} className='hover cursor-pointer'>
                <th className='bg-[#24292d]'># {index + 1}</th>
                <td className='bg-[#24292d]'>{category.Category}</td>
                <td className='bg-[#24292d]'>${(category.Amount).toFixed(2)}</td>
              </tr>)
          }) :
            <button className='btn loading'></button>
          }
        </tbody>
      </table>
    </div>
  )
}
