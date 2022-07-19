import React from "react";
import { useRecoilState } from "recoil";
import { BuyIng } from "../atom/buy-ing";
import { stockIngredients } from "../atom/my-stock";
import RemainingItem from "../components/remaining-item";

export default function MyStock() {
  const [remainingItems, setremainingItems] = useRecoilState(stockIngredients);
  const [buyIng, setBuyIng] = useRecoilState(BuyIng);

  return (
    <div className="pt-20 px-5 md:px-10 2xl:container 2xl:mx-auto 2xl:px-0 relative min-h-screen ">
      <div className="flex items-center justify-end py-5">
        <button
          onClick={() => setBuyIng(!buyIng)}
          className="px-4 py-2 bg-blue-400  rounded-md text-white font-medium hover:shadow-sm flex items-center justify-center space-x-2 hover:border border-sky-400 hover:bg-white hover:text-sky-400"
        >
          Buy Items
        </button>
      </div>
      <div className="overflow-x-auto relative">
        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="py-3 px-6">
                Ingredients
              </th>
              <th scope="col" className="py-3 px-6">
                Quantity
              </th>
            </tr>
          </thead>
          <tbody>
            {remainingItems?.map((remItem) =>  (
              <RemainingItem remItem={remItem} />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
