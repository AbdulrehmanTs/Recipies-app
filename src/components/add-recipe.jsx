import { Icon } from '@iconify/react';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useRecoilState } from 'recoil';
import { addRecipeModal } from '../atom/add-recipe-modal';
import { recipesState } from '../atom/recipes-atom';
import RecipeList from './recipe-list';
import { alert } from '../atom/alert';
import { alertData } from '../atom/alertData';

export default function AddRecipe() {
	const [state, setState] = useRecoilState(addRecipeModal);
	const [recipes, setRecipes] = useRecoilState(recipesState);
	const [name, setname] = useState('');
	const [duration, setduration] = useState('');
	const [id, setId] = useState();
	const [ingredients, setingredients] = useState();
	const [addingredients, setaddingredients] = useState([]);
	const [alertOn, setAlertOn] = useRecoilState(alert);
	const [alertBoxData, setAlertBoxData] = useRecoilState(alertData);

	console.log(addingredients);
	useEffect(() => {
		setId(recipes?.length + 1);
	}, [recipes]);

	const fetchallIngredients = async () => {
		await axios.get('http://localhost:3000/ingredients').then((res) => {
			console.log(res);
			setingredients(res.data);
		});
	};

	const addIngredient = (id, values) => {
		setaddingredients([
			...addingredients,
			{
				ingredientId: id,
				measure: values.measure,
				quantity: values.quantity,
			},
		]);
	};

	const onSubmitHandler = (e) => {
		e.preventDefault();
		if (!name) {
			setAlertOn(true);
			setAlertBoxData({
				heading: 'Error!  ',
				message: 'Title is required.',
			});
		} else if (duration < 1) {
			setAlertOn(true);
			setAlertBoxData({
				heading: 'Error!  ',
				message: 'Duration is required.',
			});
		} else if (addingredients.length < 1) {
			setAlertOn(true);
			setAlertBoxData({
				heading: 'Error!  ',
				message: 'Add Some ingredients.',
			});
		} else {
			axios
				.post('http://localhost:3000/pre-recipes', {
					id: id,
					recipeName: name,
					duration: duration,
					ingredients: addingredients,
				})
				.then((res) => {
					setname('');
					setduration('');
					setaddingredients([]);
					setState(!state);
					// setRecipes(prev=>{
					//   let newRecipes=[...prev,{id: id,
					//     recipeName: name,
					//     duration: duration,
					//     ingredients: addingredients}]

					//     return [...newRecipes]
					// })
					setRecipes([
						...recipes,
						{
							id: id,
							recipeName: name,
							duration: duration,
							ingredients: addingredients,
						},
					]);

					setState(!state);
				})
				.catch((err) => {
					console.log(err.message);
				});
		}
	};

	useEffect(() => {
		fetchallIngredients();
	}, []);

	return (
		<>
			{state && (
				<div className="w-full h-screen fixed overflow-scroll top-0 left-0 backdrop-brightness-75 p-5 flex items-start justify-center">
					<div className="w-full lg:max-w-3xl h-auto p-10 bg-white">
						<div className="flex justify-between items-center">
							<h2 className="text-2xl font-extrabold font-cormorant">
								Add New Recipe
							</h2>

							<Icon
								icon="emojione-monotone:cross-mark"
								className="cursor-pointer"
								onClick={() => setState(!state)}
							/>
						</div>

						<div className="my-10 space-y-10">
							<div className="w-full h-14 border border-gray-700">
								<input
									className="w-full h-full font-cormorant bg-transparent text-xl ml-4 outline-none"
									placeholder="Recipe Title"
									type="text"
									value={name}
									onChange={(e) => {
										setname(e.target.value);
									}}
								/>
							</div>

							<div className="">
								<h2 className="text-xl font-extrabold font-cormorant">
									Ingredients
								</h2>

								<table className="w-full my-6 text-sm text-left text-gray-500 dark:text-gray-400">
									<thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
										<tr>
											<th scope="col" className="py-3 px-6">
												Ingredients
											</th>
											<th scope="col" className="py-3 px-6">
												Quantity
											</th>

											<th scope="col" className="py-3 px-6">
												action
											</th>
										</tr>
									</thead>
									<tbody>
										{ingredients?.map((ing) => (
											<RecipeList
												key={ing.id}
												ing={ing}
												addIngredient={addIngredient}
											/>
										))}
									</tbody>
								</table>
							</div>
							<div className="w-full h-14 border border-gray-700">
								<input
									className="w-full h-full font-cormorant bg-transparent text-xl ml-4 outline-none"
									placeholder="Duration [eg. 123]"
									value={duration}
									type="number"
									onChange={(e) => setduration(e.target.value)}
								/>
							</div>

							<div className="w-full flex justify-end">
								<button
									onClick={onSubmitHandler}
									className="bg-blue-500 px-10 py-5 text-white font-medium font-montserrat self-end"
								>
									Submit
								</button>
							</div>
						</div>
					</div>
				</div>
			)}
		</>
	);
}
