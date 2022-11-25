import React from 'react'
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io"

export default function ShiftViewer() {
    return (
        <div className='grid justify-center'>
            <div className='flex h-[90px] w-full justify-center items-center'>
                <h1 className='text-center font-bold text-3xl'>
                    Shifts
                </h1>
            </div>
            <div className='flex flex-col h-[480px] w-full gap-4 justify-center place-items-center'>
                <div className="bg-[url('../public/ShiftBG.svg')] h-[72px] w-[320px] flex text-black">
                    <div className='text-center  flex flex-col  justify-center w-[80px]'>
                        <h5 className='font-bold leading-6 text-2xl'>10</h5>
                        <h5 className='text-xl leading-6'>Nov</h5>
                    </div>
                    <div className='flex w-[150px] justify-center items-center'>
                        <h5 className='text-md leading-6'>09:00 - 17:00</h5>
                    </div>
                    <div className='flex w-[100px] justify-center items-center'>
                        <h5 className='font-bold text-xl'>8 Hrs</h5>
                    </div>
                </div>

            </div>
            <div className='bg-[#25292D] flex flex-col pt-4 h-[670px] w-screen rounded-t-2xl'>
                <div className='flex w-full h-[34px] col-span-2 place-items-center justify-center'>
                    <h4 className='text-center text-2xl font-semibold'>19 Nov</h4>
                </div>
                <div className='grid grid-cols-2 grid-rows-2 py-5 px-7 gap-6 w-full'>
                    <div className='bg-[#393D42] text-white btn flex justify-center items-center shadow-md w-full h-[80px] rounded-lg'>
                        <IoIosArrowBack className='text-5xl' />
                    </div>
                    <div className='bg-[#393D42] text-white btn flex justify-center items-center shadow-md w-full h-[80px] rounded-lg'>
                        <IoIosArrowForward className='text-5xl' />
                    </div>
                    <div className='bg-[#7C7AFF] text-white btn normal-case shadow-md col-span-2 w-full h-[80px] rounded-lg place-items-center justify-center flex'>
                        <h4 className='text-center text-2xl font-semibold'>
                            Add to Calendar
                        </h4>
                    </div>
                </div>
            </div>
        </div>
    )
}
