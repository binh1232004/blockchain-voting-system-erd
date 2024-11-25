'use client';
import OerDetail from "@/app/components/oerDetail"
import Link from "next/link"
import useSWRCustom from "@/app/hooks/useSWRCustom";
export default function Page({params}) {
    const {oer,error,isLoading} = useSWRCustom();
    if (error) return "An error has occurred.";
    if (isLoading) return "Loading...";
    const detailOer = oer.data.find((item) => item.slug === params.slug);
    return (
        <div>
            <OerDetail
                title={detailOer.title}
                description={detailOer.description}
                imgUrl={detailOer.img_url}
                oerId={detailOer.id}
            />
            <Link href={"/"} className="p-3 bg-slate-500"> Back home</Link>
        </div>
    )
}