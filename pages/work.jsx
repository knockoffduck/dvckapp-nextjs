import Link from "next/link";
import { ImageSlider } from "../components/getTimetable";





export default function Work() {



    return (
        <div className="flex flex-col items-center justify-center ">
            <div className="navbar bg-base-200 ">
                <div className="flex-1">
                    <Link href="/" className="btn btn-ghost normal-case text-xl">Home</Link>
                </div>
            </div>
            <div className="flex h-[calc(100vh-64px)] place-items-center">
                <ImageSlider />
            </div>
        </div>
    )

}