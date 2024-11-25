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
    <Link href={route}>
        <div className="flex flex-row  mt-5 rounded bg-slate-300 mx-5 p-3 h-[150px]">

            <div className="w-1/2 flex flex-row">
                <Image
                    src={isValidUrl( imgUrl ) ? imgUrl : OER_COVER_DEFAULT }     
                    width={100}
                    height={100}
                    alt="Image of open educational text book"
                    className="rounded"
                />
            </div>
            <div className="flex flex-col w-1/2   text-xs md:text-sm lg:text-xl">
                <h1 className="font-bold">{title}</h1>
                <h1 className="">Total votes: {oneOERVote} OERT</h1>
            </div>
        </div> 
    </Link>
    )
}