import Image from 'next/image';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa';



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

export const ImageSlider = () => {
    const [fetched, setFetched] = useState(false)
    const [loading, setLoading] = useState(false)
    const [clicked, setClicked] = useState(false)
    const [current, setCurrrent] = useState(0)
    const [data, setData] = useState([])
    let [length, setLength] = useState(0);
    let url = 'https://dvckapp.xyz/api';

    const nextSlide = () => {
        setCurrrent(current === length - 1 ? 0 : current + 1)
    }
    const prevSlide = () => {
        setCurrrent(current === 0 ? length - 1 : current - 1)
    }


    const onbuttonclick = async () => {
        console.log('running func')
        setClicked(true)
        try {
            setLoading(true)
            const data = await fetchProducts(url)
            setFetched(true)
            setData(data.reverse())
            setLength(await data.length)
            await setLoading(false)

        } catch (err) {
            console.log(err.message)
        }
    }

    useEffect(() => {
        onbuttonclick()
    }, []);


    return (
        <div className='w-screen h-screen' >
            <header className='flex items-center relative h-[10vh] p-7'>
                <Link href="/" className='font-bold text-4xl z-10' >dvck</Link>

            </header>
            <div className="flex relative h-[90vh] justify-center items-center">
                {fetched &&
                    <div>
                        <FaArrowLeft onClick={nextSlide} className="absolute tablet:top-1/2 mobile:bottom-1/4 left-20 text-6xl z-10 btn btn-outline rounded-none hover:rounded-lg" />
                        <FaArrowRight onClick={prevSlide} className="absolute tablet:top-1/2 mobile:bottom-1/4 right-20 text-6xl z-10 btn btn-outline rounded-none hover:rounded-lg" />
                    </div>
                }
                {!fetched
                    ? <button onClick={onbuttonclick} className={loading ? 'btn btn-outline rounded-none hover:rounded-lg loading' : 'btn btn-outline rounded-none hover:rounded-lg'}>Get Timetable</button>
                    :
                    data.map((timetable, index) => {
                        return (<div key={index} className='grid gap-6 justify-items-center' >
                            {index === current && (
                                <h3 className='text-center text-4xl font-bold'> {timetable.date}</h3>
                            )}
                            {index === current && (
                                <div className="relative mobile:h-[25vh] mobile:w-[75vw] tablet:h-[70vh] tablet:w-[65vw]">
                                    <Image src={timetable.timetable_url} fill alt={timetable.date} priority className="rounded-lg" />
                                </div>
                            )}

                        </div>
                        )
                    })}
            </div>
        </div>

    )
}