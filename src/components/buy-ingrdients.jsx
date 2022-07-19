import axios from 'axios';
import React, { useState } from 'react';
import { useRecoilState } from 'recoil';
import { alert } from '../atom/alert';
import { alertData } from '../atom/alertData';
import { stockIngredients } from '../atom/my-stock';

export default function Buyingrdients({ ing }) {
	const [id, setid] = useState(ing?.id);
	const [ingredientId, setingredientId] = useState(ing?.id);
	const [measure, setmeasure] = useState('');
	const [isPost, setisPost] = useState(false);
	const [inStock, setInStock] = useRecoilState(stockIngredients);
	const [availableQuantity, setavailableQuantity] = useState(0);
	const LastQuantity = inStock?.find(
		(item) => item.id === id
	)?.availableQuantity;

	const [alertOn, setAlertOn] = useRecoilState(alert);
	const [alertBoxData, setAlertBoxData] = useRecoilState(alertData);

	const onSubmitHandler = async () => {
		const buying = {
			id,
			ingredientId,
			availableQuantity: parseFloat(availableQuantity) + LastQuantity,
			measure,
		};
		console.log(
			parseFloat(availableQuantity) + LastQuantity,
			parseFloat(availableQuantity),
			LastQuantity
		);
		setInStock((prev) => {
			// console.log(prev);
			let newStock = [];
			prev.map((item) => {
				if (item.id == id) {
					newStock.push(buying);
				} else {
					newStock.push(item);
				}
			});

			return [...newStock];
		});
		axios.put(`http://localhost:3000/fridge/${id}`, buying);
		setavailableQuantity(0);
		setAlertOn(true);
		setAlertBoxData({
			heading: 'succed.',
			message: `${availableQuantity} ${ing?.name} added!`,
		});
	};

	return (
		<tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
			<th
				scope="row"
				className="py-4 px-6 text-[#FFF] font-medium text-gray-900 whitespace-nowrap "
			>
				{ing?.name}
			</th>
			<td className="py-4 px-6">
				<div className="flex space-x-2">
					<div className="w-32 h-10 border border-gray-700">
						<input
							className="w-full h-full font-cormorant bg-transparent text-xl ml-4 outline-none"
							placeholder="0"
							type="number"
							value={availableQuantity}
							onChange={(e) => {
								setavailableQuantity(e.target.value);
							}}
						/>
					</div>
				</div>
			</td>

			<td className="py-4 px-6">
				<div className="w-32 h-10">
					<button
						onClick={onSubmitHandler}
						className="flex items-center justify-center text-white hover:bg-sky-500 w-full h-full bg-sky-400"
					>
						Buy
					</button>
				</div>
			</td>
		</tr>
	);
}
