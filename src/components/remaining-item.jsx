import React, { useState, useEffect } from 'react';
import axios from 'axios';

export default function RemainingItem({ remItem }) {
	const [ing, seting] = useState(null);
	const fetchIngredient = async () => {
		await axios
			.get(`http://localhost:3000/ingredients/${remItem.ingredientId}`)
			.then((res) => {
				seting(res.data);
			});
	};
	useEffect(() => {
		fetchIngredient();
	}, []);
	return (
		<tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
			<th
				scope="row"
				className="py-4 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white"
			>
				{ing?.name}
			</th>
			<td className="py-4 px-6">{remItem?.availableQuantity}</td>
		</tr>
	);
}
