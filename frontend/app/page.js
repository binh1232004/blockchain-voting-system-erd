'use client'
import OerReview from "./components/oerReview.js";
import { encodeSlug } from "./utils.js";
import useSWRCustom from "./hooks/useSWRCustom.js";
export default function Home() {
  const {oer, error, isLoading} = useSWRCustom();
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
