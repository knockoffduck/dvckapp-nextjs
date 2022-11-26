import ProgressBar from "@ramonak/react-progress-bar";
import React, { useEffect, useState } from 'react';
import io from "socket.io-client";
const ENDPOINT = "https://dvckapp.xyz"

export default function Test() {
    const [updated, setUpdated] = useState('')
    const [socket, setSocket] = useState(null)
    const [progress, setProgress] = useState(0)

    useEffect(() => {
        if (!socket) {
            setSocket(io(ENDPOINT, { path: '/ws' }))
        }
        return () => {
            socket?.disconnect()
        }
    }, [socket])

    useEffect(() => {
        if (!socket) return
        socket.on('message', (text) => {
            setUpdated(text)
        })
        socket.on('progress', (percentage) => {
            setProgress(parseFloat(percentage))
        })

        return () => {
            socket.off('message')
            socket.off('progress')
        }
    }, [socket])

    const sendReq = () => {
        socket.emit('request', 'begin, https://nextlevel.worldmanager.com/content/forum_uploads/files/2346/Roster_W_E_07_12_2022.jpg')
    }
    const sendCount = () => {
        socket.emit('request', 'checkCount')
    }

    return (
        <div className='grid w-screen h-screen place-items-center justify-center'>
            <div className='grid w-full place-items-center'>
                <h3>{updated}</h3>
                <ProgressBar customLabel=" " className="w-[50%]" completed={progress} />
            </div>
            <div className='flex gap-4'>
                <button onClick={sendReq} className='btn'>Request</button>
                <button onClick={sendCount} className='btn'>check Count</button>

            </div>
        </div>
    )
}
