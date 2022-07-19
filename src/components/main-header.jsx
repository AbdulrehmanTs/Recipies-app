import React, { Fragment, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { isCooking } from "../atom/isCooking";
import { useRecoilState } from "recoil";

/**
 * ## Header component
 * # The Header componet at the top of page
 * # use to navigate from one page to other
 *
 * @returns Header Page
 */
export default function Header() {
  const [is_Cooking, set_is_Cooking] = useRecoilState(isCooking);

  return (
    <div className="w-full z-40 bg-white h-16 flex items-center px-5 md:px-10 2xl:container 2xl:mx-auto 2xl:px-0">
      <div className="flex items-center justify-between w-full">
        {/* Logo */}
        <h2 className="text-green-700 font-writing text-4xl font-bold">
          Recipe
        </h2>

        {/* Menu */}
        <div className="space-x-5">
          <Link
            onClick={() => {
              if (is_Cooking) {
                alert(" Stay On Page Please Cooking in Progress.");
              }
            }}
            to={is_Cooking ? "#" : "/"}
            className="text-base font-montserrat font-semibold text-gray-500 hover:underline hover:text-green-700"
          >
            Home
          </Link>
          <Link
            onClick={() => {
              if (is_Cooking) {
                alert(" Stay On Page Please Cooking in Progress.");
              }
            }}
            to={is_Cooking ? "#" : "/recipes"}
            className="text-base font-montserrat font-semibold text-gray-500 hover:underline hover:text-green-700"
          >
            Recipes
          </Link>
          <Link
            onClick={() => {
              if (is_Cooking) {
                alert(" Stay On Page Please Cooking in Progress.");
              }
            }}
            to={is_Cooking ? "#" : "/my-stock"}
            className="text-base font-montserrat font-semibold text-gray-500 hover:underline hover:text-green-700"
          >
            My Stock
          </Link>
          <Link
            onClick={() => {
              if (is_Cooking) {
                alert(" Stay On Page Please Cooking in Progress.");
              }
            }}
            to={is_Cooking ? "#" : "/cook-now"}
            className="text-base font-montserrat font-semibold text-gray-500 hover:underline hover:text-green-700"
          >
            Cook Now
          </Link>
        </div>
      </div>
    </div>
  );
}
