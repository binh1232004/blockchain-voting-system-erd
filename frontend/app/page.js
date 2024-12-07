'use client'
import OerReview from "./components/oerReview.js";
import { encodeSlug } from "./utils.js";
import useSWRCustom from "./hooks/useSWRCustom.js";
import useOERVote from "./hooks/useOERVote.js";
import { useEffect } from "react";
export default function Home() {
  const {oer, error, isLoading} = useSWRCustom();
  const {setDecreasedOERFromEthereum, OERDecreasedOnVote} = useOERVote(undefined, oer);
  useEffect(() => {
    if(!isLoading)
      setDecreasedOERFromEthereum();
  }, [isLoading]);
  // useEffect(() => {
  //   console.log(OERDecreasedOnVote)
  // },[OERDecreasedOnVote]);
  if (error) return "An error has occurred.";
  if (isLoading) return "Loading...";
  return (
    <main>
      {OERDecreasedOnVote.map((item, index) => (
        <OerReview 
          key={item.id}
          order={index}
          title={item.title}
          route={`oer/${encodeSlug(item.title)}`}
          imgUrl={
            item.img_url
          }
          oerId={item.id}
          vote={item.vote}
        />
      ))}
    </main>
  );
}
