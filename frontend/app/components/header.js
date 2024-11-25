'use client';

import Link from "next/link";
import Image from "next/image";

export default function Header(){
    return( 
        <div className="bg-black w-full h-10 lg:h-16 sticky top-0 z-10 ">
          <Link  className="absolute top-1/2 left-10 -translate-y-1/2" href={"/"} >
            <Image 
              src={"/favicon.ico"}
              width={50}
              height={50}
              alt="logo of page"
            />
          </Link>
        </div>
     )
}