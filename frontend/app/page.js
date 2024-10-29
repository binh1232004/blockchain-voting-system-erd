'use client'
import OerReview from "./components/oerReview.js";
import { useEffect, useState } from "react";
import useSWR from "swr";
import { convertTitleToUrlString } from "./utils.js";
import slugify from "slugify";
export default function Home() {
  const fetcher = (url) => fetch(url).then((res) => res.json());
  const { data: oer, error, isLoading } = useSWR(
    "/api/oer/openTextBook",
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
          route={`oer/${encodeURIComponent(slugify(item.title))}`}
          imgUrl={
            item.img_url
          }
        />
      ))}
    </main>
  );
}
