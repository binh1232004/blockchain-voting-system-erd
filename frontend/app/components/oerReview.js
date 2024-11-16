'use client'
import Link from "next/link"
import Image from "next/image"
import { isValidUrl } from "../utils"
export default function OerReview({title, imgUrl, route}){
    const OER_COVER_DEFAULT  = '/oerTextBookCover.png';
    return (
        <div className="flex flex-row space-x-2 mt-5">

            <div className="w-1/2 bg-gray-700 h-[100px]">
                <Image
                    src={isValidUrl( imgUrl ) ? imgUrl : OER_COVER_DEFAULT }     
                    width={100}
                    height={100}
                    alt="Image of open educational text book"
                />
            </div>
            <div className="w-1/2 bg-red-700 h-[100px]">
                <h1>{title}</h1>
                <Link className=" mt-2 p-1 bg-slate-300" href={route}>Click me</Link>
            </div>
        </div> 
    )
}