import { motion } from 'framer-motion';
import Image from 'next/image';
import React, { useState } from 'react';
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

    console.log(current)

    const onbuttonclick = async () => {
        setClicked(true)
        console.log(clicked)
        try {
            setLoading(true)
            const data = await fetchProducts(url)
            setFetched(true)
            console.log('FETCHED')
            console.log('result is: ', data);
            setData(data.reverse())
            setLength(await data.length)
            await setLoading(false)

        } catch (err) {
            console.log(err.message)
        }
    }


    return (
        <div className="flex relative w-screen h-screen justify-center items-center">
            {fetched &&
                <motion.div
                    animate={{ opacity: 1 }}
                    initial={{ opacity: 0 }}>
                    <FaArrowLeft onClick={nextSlide} className="absolute tablet:top-1/2 mobile:bottom-1/4 left-20 text-6xl z-10 btn btn-outline rounded-none hover:rounded-lg" />
                    <FaArrowRight onClick={prevSlide} className="absolute tablet:top-1/2 mobile:bottom-1/4 right-20 text-6xl z-10 btn btn-outline rounded-none hover:rounded-lg" />
                </motion.div>
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
                            <motion.div
                                animate={{ opacity: 1 }}
                                initial={{ opacity: 0 }}
                                className="relative mobile:h-[25vh] mobile:w-[75vw] tablet:h-[70vh] tablet:w-[65vw]">
                                <Image src={timetable.timetable_url} fill alt={timetable.date} priority className="rounded-lg" />
                            </motion.div>
                        )}

                    </div>
                    )
                })}
        </div>

    )
}