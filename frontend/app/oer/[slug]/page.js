"use client";
import OerDetail from "@/app/components/oerDetail";
import Link from "next/link";
import useSWRCustom from "@/app/hooks/useSWRCustom";
export default function Page({ params }) {
    const { oer, error, isLoading } = useSWRCustom();
    if (error) return "An error has occurred.";
    if (isLoading) return "Loading...";
    const detailOer = oer.data.find((item) => item.slug === params.slug);
    let author = [];
    detailOer.contributors.forEach((contributor) => {
        let title = contributor.title ? contributor.title + ". " : "";
        let firstName = contributor.first_name
            ? contributor.first_name + " "
            : "";
        let middleName = contributor.middle_name
            ? contributor.middle_name + " "
            : "";
        let lastName = contributor.last_name
            ? contributor.last_name + ", "
            : ", ";
        let fullName = title + firstName + middleName + lastName;
        author.push({
            fullName: fullName,
            background: contributor.background_text,
        });
    });
    return (
        <div >
            <OerDetail
                title={detailOer.title}
                description={detailOer.description}
                imgUrl={detailOer.img_url}
                oerId={detailOer.id}
                author={author}
            />
        </div>
    );
}
