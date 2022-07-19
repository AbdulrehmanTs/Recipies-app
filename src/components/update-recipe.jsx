import { Icon } from '@iconify/react';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useRecoilState } from 'recoil';
import { recipesState } from '../atom/recipes-atom';
import { isupdateRecipe } from '../atom/isupdate-recipe';
import RecipeList from './recipe-list';

export default function UpdateRecipe({ id }) {
	const [state, setState] = useRecoilState(isupdateRecipe);

	const [recipes, setRecipes] = useRecoilState(recipesState);
	const [recipeData, setRecipeData] = useState(null);

	const [name, setname] = useState('');
	const [duration, setduration] = useState('');
	const [ingredients, setingredients] = useState();
	const [addingredients, setaddingredients] = useState([]);
	console.log(id);
	const fetchallIngredients = async () => {
		if (id) {
			await axios
				.get(`http://localhost:3000/pre-recipes?id=${id}`)
				.then((res) => {
					setRecipeData(res.data[0]);
					setname(res.data[0]?.recipeName);
					setduration(res.data[0]?.duration);
					let newIngredientData = [];
					res.data[0]?.ingredients?.map((ingredient, index) => {
						const fetchIngredient = async () => {
							let name;
							await axios
								.get(
									`http://localhost:3000/ingredients/${ingredient.ingredientId}`
								)
								.then((response) => {
									name = response.data.name;
								});
							newIngredientData.push({ ...ingredient, name });
						};
						fetchIngredient();
					});

					setTimeout(() => {
						setingredients(newIngredientData);
					}, 1000);
				});
		}
	};

	// const addIngredient = (id, values) => {
	//   setaddingredients([
	//     ...addingredients,
	//     {
	//       ingredientId: id,
	//       measure: values.measure,
	//       quantity: values.quantity
	//     }
	//   ]);
	// };

	// const fetchRecipe = async () => {
	//   await axios
	//     .get(`http://localhost:3000/pre-recipes/${state?.id}`)
	//     .then((res) => {
	//       setname(res.data.recipeName);
	//       setduration(res.data.duration);
	//       res.data.ingredients.map((ingd) => {
	//         setaddingredients([...addIngredient, ingd]);
	//       });
	//     });
	// };

	const onSubmitHandler = (e) => {
		e.preventDefault();
		axios
			.put(`http://localhost:3000/pre-recipes/${state?.id}`, {
				recipeName: name,
				duration: duration,
				ingredients: ingredients,
			})
			.then((res) => {
				setname('');
				setduration('');
				setaddingredients([]);
				setState(!state);
				setRecipes((prev) => {
					let newData = [];
					prev.map((item) => {
						if (item?.id == state?.id) {
							newData.push({
								recipeName: name,
								duration: duration,
								ingredients: ingredients,
							});
						} else {
							newData.push(item);
						}
					});
					return [...newData];
				});
			});
	};

	useEffect(() => {
		// fetchRecipe();
		fetchallIngredients();
	}, [id]);

	const handleIngredient = (e, ing, index) => {
		setingredients((prev) => {
			let newIngredients = [];
			prev.map((item, ind) => {
				if (ind == index) {
					newIngredients.push({ ...item, quantity: e.target.value });
				} else {
					newIngredients.push(item);
				}
			});
			return [...newIngredients];
		});
	};
	return (
		<>
			{state.state && (
				<div className="w-full h-screen absolute top-0 left-0 backdrop-brightness-75 p-5 flex items-start justify-center">
					<div className="w-full lg:max-w-3xl h-auto p-10 bg-white">
						<div className="flex justify-between items-center">
							<h2 className="text-2xl font-extrabold font-cormorant">
								Update Recipe
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
									className="w-full h-full capitalize font-cormorant bg-transparent text-xl ml-4 outline-none"
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
										</tr>
									</thead>
									<tbody>
										{ingredients?.map((ing, index) => {
											return (
												// <RecipeList
												//   noAction={true}
												//   ing={ing}
												//   addIngredient={addIngredient}
												//   updateIngredients={addingredients}
												// />
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
																value={ing.quantity}
																onChange={(e) =>
																	handleIngredient(e, ing, index)
																}
															/>
														</div>
													</td>
												</tr>
											);
										})}
									</tbody>
								</table>
							</div>
							<div className="w-full h-14 border border-gray-700">
								<input
									className="w-full h-full font-cormorant bg-transparent text-xl ml-4 outline-none"
									placeholder="Duration"
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
