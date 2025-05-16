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
  const titile = "loresad sd jaklsdj lkajlsakjd lkasjdlkasjdl saljkdlaksjdlkasjdlk jaslk jlakj lksjadlkasj lkjalsdj la lkasjdlasj aslkdjalskjd lkajkl sda ljklk jasd lsajdklajslkd j lksjdlkajkl asdlkj ";
  if (error) return "An error has occurred.";
  if (isLoading) return "Loading...";
  return (
    <main className="grid gap-4 grid-cols-2 p-2 md:grid-cols-4 md:p-10  lg:grid-cols-5 ">
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
       {/* <OerReview 
          key={8}
          order={8}
          title={titile}
          route={`oer/`}
          imgUrl={
            '/oerTextBookCover.png'
          }
          oerId={8}
          vote={0}
        /> */}
    </main>
  );
}
