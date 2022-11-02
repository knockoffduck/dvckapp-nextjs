import { motion } from 'framer-motion';
import Image from 'next/image';
import React, { useState } from 'react';
import { FaArrowAltCircleLeft, FaArrowAltCircleRight } from 'react-icons/fa';



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
            const data = await fetchProducts(url)
            setFetched(true)
            console.log('FETCHED')
            console.log('result is: ', data);
            setData(data)
            setLength(await data.length)

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
                    <FaArrowAltCircleLeft onClick={prevSlide} className="absolute top-1/2 left-8 text-5xl z-10 cursor-pointer select-none" />
                    <FaArrowAltCircleRight onClick={nextSlide} className="absolute top-1/2 right-8 text-5xl z-10 cursor-pointer select-none" />
                </motion.div>
            }
            {!fetched
                ? <button onClick={onbuttonclick} className="btn">Get Timetable</button>
                :
                data.map((timetable, index) => {
                    return (<div key={index} className='grid gap-6' >
                        {index === current && (
                            <h3 className='text-center text-4xl font-bold'> {timetable.date}</h3>
                        )}
                        {index === current && (
                            <motion.div
                                animate={{ opacity: 1 }}
                                initial={{ opacity: 0 }}
                                className="relative">
                                <Image src={timetable.timetable_url} width={1280} height={600} alt={timetable.date} priority className="object-contain rounded-lg" />
                            </motion.div>
                        )}

                    </div>
                    )
                })}
        </div>

    )
}