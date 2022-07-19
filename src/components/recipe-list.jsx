import React, { useState } from 'react';

export default function RecipeList({ ing, addIngredient, noAction }) {
	const [quantity, setquantity] = useState('');
	const [measure, setmeasure] = useState('');
	const [isAdded, setIsAdded] = useState(false);
	const values = { quantity, measure };
	console.log(ing);
	return (
		<tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
			<th
				scope="row"
				className="py-4 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white"
			>
				{ing?.name}
			</th>
			<td className="py-4 px-6">
				<div className="w-2/3 h-10 border border-gray-700">
					<input
						className="w-full h-full font-cormorant bg-transparent text-xl ml-4 outline-none"
						placeholder="Quantity"
						type="number"
						value={quantity}
						onChange={(e) => setquantity(e.target.value)}
					/>
				</div>
			</td>

			{noAction || (
				<td className="py-4 px-6">
					<button
						onClick={() => {
							addIngredient(ing.id, values);
							setIsAdded(true);
						}}
						className={` ${
							isAdded ? 'bg-sky-500 ' : 'bg-sky-400 '
						} hover:bg-sky-500 px-6 py-3  w-[120px] text-xs text-white font-medium font-montserrat self-end`}
					>
						{isAdded ? 'Added' : 'Add'}
					</button>
				</td>
			)}
		</tr>
	);
}
