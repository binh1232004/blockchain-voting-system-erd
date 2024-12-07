'use client'
import Link from "next/link"
import Image from "next/image"
import { isValidUrl } from "../utils"
import useOERVote from "../hooks/useOERVote"
import { useEffect } from "react"
export default function OerReview({title, imgUrl, route, vote, order }){
    const OER_COVER_DEFAULT  = '/oerTextBookCover.png';
    let styleContainer = "relative flex flex-row  mt-5 rounded md:mx-5 p-4 h-[150px] ";
    let styleTitle = "";
    let styleToken = "";
    let styleAnimation = "h-full w-[38px] ";
    if(order <= 2 && vote != 0){
        styleContainer += " bg-featured-oer";
        styleTitle += "color-title-featured-oer";
        styleToken += "color-token-featured-oer";
        styleAnimation += "animation-featured-oer  bg-white";
    }
    else{
        styleContainer += "bg-slate-400";
        styleTitle += "text-black";
        styleToken += "text-white";
    }
    return (
        <Link href={route} className={ styleContainer }>
            <div className={styleAnimation}></div>
            <div className="w-1/2 flex flex-row">
                <Image
                    src={isValidUrl( imgUrl ) ? imgUrl : OER_COVER_DEFAULT }     
                    width={100}
                    height={100}
                    alt="Image of open educational text book"
                    className="rounded"
                />
            </div>
            <div className="flex flex-col w-1/2   text-sm  lg:text-xl font-bold">
                <h1 className={styleTitle}>{title}</h1>
                <h2 className={styleToken}>{vote + " " + "OERT"}</h2>
            </div>
        </Link> 
    )
}