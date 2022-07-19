import React from "react";
import HeroImg from "../assets/images/hero.jpg";

/**
 * ## Home Page
 * # The Home page is landing page of web app
 *
 * @returns Home Page
 */
export default function Home() {
  return (
    <div
      style={{
        backgroundImage: `url(${HeroImg})`
      }}
      className="w-full h-screen -mt-16 bg-cover bg-no-repeat"
    >
      <div className="pt-52 flex items-center justify-center">
        <h2 className="font-writing text-7xl lg:text-8xl xl:text-9xl text-center font-medium text-green-700">
          Cook Easy with <br /> Recipe
        </h2>
      </div>
    </div>
  );
}
