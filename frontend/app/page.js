'use client'
import OerReview from "./components/oerReview.js";
import useSWR from "swr";
import { encodeSlug } from "./utils.js";
export default function Home() {
  const fetcher = (url) => fetch(url).then((res) => res.json());
  const { data: oer, error, isLoading } = useSWR(
    process.env.NEXT_PUBLIC_DATA_OER_URL,
    fetcher
  );
  if (error) return "An error has occurred.";
  if (isLoading) return "Loading...";
  return (
    <main>
      {oer.data.map((item, index) => (
        <OerReview 
          key={index}
          title={item.title}
          route={`oer/${encodeSlug(item.title)}`}
          imgUrl={
            item.img_url
          }
          oerId={item.id}
        />
      ))}
    </main>
  );
}
