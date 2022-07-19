import React from "react";

/**
 * ## Header component
 * # The Header componet at the top of page
 * # use to navigate from one page to other
 *
 * @returns Header Page
 */
export default function Footer() {
  return (
    <div className="w-full bg-gray-50">
      <div className="h-44 flex flex-col justify-center items-center px-5 md:px-10 2xl:container 2xl:mx-auto 2xl:px-0">
        <h2 className="text-gray-700 font-writing text-4xl font-bold py-4">
          Recipe
        </h2>
        <p className="text-xs text-gray-500">Copyright @ 2022</p>
      </div>
    </div>
  );
}
