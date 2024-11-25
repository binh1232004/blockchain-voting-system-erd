import localFont from "next/font/local";
import Image from "next/image";
import "./globals.css";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata = {
  title: "BEV",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <header className="bg-black w-full h-10 lg:h-16">
          <div id="logo" className="bg-red-400 w-10 h-10 rounded">
            {/* <Image 
              src={"icon.png"}
              width={100}
              height={100}
            /> */}
          </div>
        </header>
        {children}

      </body>
    </html>
  );
}
