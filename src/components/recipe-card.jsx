import { Icon } from '@iconify/react';
import React, { Fragment } from 'react';
import Ingredients from './ingredients';
import axios from 'axios';
import { useRecoilState } from 'recoil';
import { isupdateRecipe } from '../atom/isupdate-recipe';

export default function RecipeCard({ recipe, setRecipes, setUpdatingId }) {
	const [isUpdate, setisupdate] = useRecoilState(isupdateRecipe);

	const deleteRecipe = async () => {
		await axios
			.delete(`http://localhost:3000/pre-recipes/${recipe.id}`)
			.then((res) => {
				setRecipes((prev) => {
					let newRecipes = [];
					console.log(prev);
					prev.map((item) => {
						console.log(item, item.id, recipe.id);

						if (item.id == recipe.id) {
							console.log('');
						} else {
							newRecipes.push(item);
						}
					});
					console.log(newRecipes);
					return [...newRecipes];
				});
			});
	};
	return (
		<div className="w-full h-full relative p-5 rounded-xl shadow border border-gray-100 font-montserrat pb-10">
			<div className="absolute right-5 -top-5 h-12 bg-green-100 px-2 flex items-center justify-center">
				<p className="font-bold font-montserrat text-sm flex items-center space-x-3 text-green-800">
					<Icon icon="bi:clock-history" className="w-5 h-5" />
					<span>{recipe.duration} mins</span>
				</p>
			</div>
			<div className="my-10">
				<h3 className="text-4xl xl:text-5xl break-words leading-normal font-semibold font-montserrat capitalize">
					{recipe.recipeName}
				</h3>
			</div>

			<div className="flex flex-col xl:flex-row justify-between w-full">
				<div>
					{recipe?.ingredients.map((ingredient) => (
						<Fragment key={ingredient.ingredientId}>
							<Ingredients ingredient={ingredient} />
						</Fragment>
					))}
				</div>

				<div className="flex-1 py-4 flex flex-col space-y-2 absolute top-1/2 -translate-y-1/2 -right-1 ">
					<button
						onClick={() => {
							setUpdatingId(recipe.id);
							setisupdate({
								state: true,
								id: recipe.id,
							});
						}}
						className="w-10 bg-sky-400 h-10 rounded-l-full text-white font-medium hover:shadow-sm flex items-center justify-center space-x-2 hover:border border-sky-400 hover:bg-white hover:text-sky-400"
					>
						<Icon icon="akar-icons:edit" className="w-6 h-6" />
					</button>
					<button
						onClick={deleteRecipe}
						className="w-10 bg-rose-400 h-10 rounded-l-full text-white font-medium hover:shadow-sm flex items-center justify-center space-x-2 hover:border border-rose-400 hover:bg-white hover:text-rose-400"
					>
						<Icon icon="ant-design:delete-twotone" className="w-6 h-6" />
					</button>
				</div>
			</div>
		</div>
	);
}
