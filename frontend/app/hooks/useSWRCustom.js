'use client'
import useSWR from "swr"
export default function useSWRCustom(){
    const fetcher = (url) => fetch(url).then((res) => res.json());
    const { data: oer, error, isLoading } = useSWR(
        process.env.NEXT_PUBLIC_DATA_OER_URL,
        fetcher
    );
    return{ 
        oer,
        error,
        isLoading
    }    
}