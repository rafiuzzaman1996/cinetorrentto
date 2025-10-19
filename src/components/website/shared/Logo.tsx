import React from "react";
import { Audiowide } from "next/font/google"

const audiowide = Audiowide({
  weight: "400", // Audiowide only has 400
  subsets: ["latin"],
})
const Logo = () => {
  return (
    <span
      className={audiowide.className + " px-2 py-1 rounded text-2xl xl:text-2xl md:text-md max-sm:text-sm font-bold text-orange-400 bg-gray-200 dark:bg-gray-800 tracking-wider"}>
      CineTorrentto
    </span>
  );
};

export default Logo;
