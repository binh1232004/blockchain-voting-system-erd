'use client';
import OerDetail from "@/app/components/oerDetail"
import Link from "next/link"
import { decodeSlug } from "@/app/utils"
import useSWR from "swr";
import slugify from "slugify";
export default function Page({params}) {
    const fetcher = (url) => fetch(url).then((res) => res.json());
    const { data: oer, error, isLoading } = useSWR(
        "/api/oer/openTextBook",
        fetcher
    );
    if (error) return "An error has occurred.";
    if (isLoading) return "Loading...";
    const detailOer = oer.data.find((item) => item.slug === params.slug);
    return (
        <div>
            <OerDetail
                title={detailOer.title}
                description={detailOer.description}
                imgUrl={detailOer.img_url}
            />
            <Link href={"/"} className="p-3 bg-slate-500"> Back home</Link>
        </div>
    )
}
// export async function generateStaticParams(){
//     return [
//         {slug: 'oer1'},
//         {slug: 'oer2'},
//         {slug: 'oer3'},
//     ]
// }