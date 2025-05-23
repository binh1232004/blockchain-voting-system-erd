'use client'
import Link from "next/link"
import Image from "next/image"
import { isValidUrl } from "../utils"
import useOERVote from "../hooks/useOERVote"
import { useEffect } from "react"
export default function OerReview({title, imgUrl, route, vote, order }){
    const OER_COVER_DEFAULT  = '/oerTextBookCover.png';
    let styleContainer = "flex flex-col bg-white rounded items-center p-3 gap-3 shadow-md h-full";
    let styleTitle = "";
    let styleToken = "font-bold ";
    let styleAnimation = "h-full w-[38px] ";
    // if(order <= 2 && vote != 0){
    //     styleContainer += " bg-featured-oer";
    //     styleTitle += "color-title-featured-oer";
    //     styleToken += "color-token-featured-oer";
    //     styleAnimation += "animation-featured-oer  bg-white";
    // }
    // else{
    //     styleContainer += "bg-slate-400";
    //     styleTitle += "text-black";
    //     styleToken += "text-white";
    // }
    return (
        <Link href={route} className={ styleContainer } >
            {/* <div className={styleAnimation}></div> */}
            <div className="flex flex-row h-2/3" >
                <Image
                    src={isValidUrl( imgUrl ) ? imgUrl : OER_COVER_DEFAULT }     
                    width={200}
                    height={100}
                    alt="Image of open educational text book"
                    className="rounded"
                />
            </div>
            <div className="flex flex-col justify-between text-xs md:text-sm pt-6 h-1/3">
                <h1 className={styleTitle}>{title}</h1>
            </div>
            <div className="w-full p-2 bg-slate-300 text-center ">
                <h2 className={styleToken}>{vote + " OER"}</h2>
            </div>
        </Link> 
    )
}