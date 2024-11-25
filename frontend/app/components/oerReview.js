'use client'
import Link from "next/link"
import Image from "next/image"
import { isValidUrl } from "../utils"
import useOERVote from "../hooks/useOERVote"
import { useEffect } from "react"
export default function OerReview({title, imgUrl, route, oerId}){
    const OER_COVER_DEFAULT  = '/oerTextBookCover.png';
    const {
        setOneOERVoteFromEthereum,
        oneOERVote
    } = useOERVote(oerId);
    useEffect(() => {
        setOneOERVoteFromEthereum();
    },[])
    return (
        <Link href={route} className="relative flex flex-row  mt-5 rounded bg-slate-100 bg-featured-oer  md:mx-5 p-3 h-[150px]">

            <div className="absolute left-0-0 top-0 bg-white  h-full animation-featured-oer"> Hello</div>
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
                <h1 className="color-title-featured-oer">{title}</h1>
                <h2 className="color-token-featured-oer">{oneOERVote + " " + "OERT"}</h2>
            </div>
        </Link> 
    )
}