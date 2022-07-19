import React, { useState } from 'react';
import { useRecoilState } from 'recoil';
import { BuyIng } from '../atom/buy-ing';
import { Icon } from '@iconify/react';
import { ingredientsStore } from '../atom/ingredient';
import Buyingrdients from './buy-ingrdients';

export default function BuyIngredients() {
	const [buyIng, setBuyIng] = useRecoilState(BuyIng);
	const [ingredients] = useRecoilState(ingredientsStore);

	return (
		<>
			{buyIng && (
				<div className="w-full h-screen absolute top-0 left-0 backdrop-brightness-75 p-5 flex items-start justify-center">
					<div className="w-full lg:max-w-3xl h-auto p-10 bg-white">
						<div className="flex justify-between items-center">
							<h2 className="text-2xl font-extrabold font-cormorant">
								Buy Ingredients
							</h2>

							<Icon
								icon="emojione-monotone:cross-mark"
								className="cursor-pointer"
								onClick={() => setBuyIng(!buyIng)}
							/>
						</div>

						<div className="overflow-x-auto relative mt-4">
							<table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
								<thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
									<tr>
										<th scope="col" className="py-3 px-6">
											Ingredients
										</th>
										<th scope="col" className="py-3 px-6">
											Quantity
										</th>

										<th scope="col" className="py-3 px-6">
											Actions
										</th>
									</tr>
								</thead>
								<tbody>
									{ingredients?.map((ing) => (
										<Buyingrdients ing={ing} />
									))}
								</tbody>
							</table>
						</div>
						<div className="w-[100%] mt-4 flex justify-center">
							<button
								onClick={() => setBuyIng(!buyIng)}
								className="px-4 py-2 bg-blue-400  rounded-md text-white font-medium hover:shadow-sm flex items-center justify-center space-x-2 hover:border border-sky-400 hover:bg-white hover:text-sky-400"
							>
								Done
							</button>
						</div>
					</div>
				</div>
			)}
		</>
	);
}
