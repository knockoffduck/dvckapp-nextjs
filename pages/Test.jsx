import ProgressBar from "@ramonak/react-progress-bar";
import React, { useEffect, useRef, useState } from 'react';
import io from "socket.io-client";
const ENDPOINT = "http://localhost:3639"

export default function Test() {

    const [response, setResponse] = useState("")
    const inputRef = useRef(null)
    const [updated, setUpdated] = useState('')
    const [socket, setSocket] = useState(null)
    const [users, setUsers] = useState(0)
    const [progress, setProgress] = useState(0)

    useEffect(() => {
        if (!socket) {
            setSocket(io(ENDPOINT))
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

    const sendMessage = () => {
        setUpdated(inputRef.current.value)

    }

    const sendReq = () => {
        socket.emit('request', 'begin,https://nextlevel.worldmanager.com/content/forum_uploads/files/2247/Roster_W_E_12_10_22.jpg')
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
                <input ref={inputRef} type="text" placeholder='Type Here' className="input w-full max-w-xs" />
                <button onClick={sendMessage} className='btn'> submit</button>

            </div>
            <div className='flex gap-4'>
                <button onClick={sendReq} className='btn'>Request</button>
                <button onClick={sendCount} className='btn'>check Count</button>

            </div>
        </div>
    )
}
