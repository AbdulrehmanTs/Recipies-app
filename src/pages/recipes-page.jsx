import React, { Fragment, useState } from 'react';
import { useRecoilState } from 'recoil';
import { recipesState } from '../atom/recipes-atom';
import RecipeCard from '../components/recipe-card';
import { Icon } from '@iconify/react';
import { addRecipeModal } from '../atom/add-recipe-modal';
import UpdateRecipe from '../components/update-recipe';

/**
 * ## Recipe Page
 * # The Recipe page where Create, show, delete
 * # recipies
 *
 * @returns Recipe Page
 */
export default function Recipes() {
	const [isAddRecipe, setisAddRecipe] = useRecoilState(addRecipeModal);
	const [recipes, setRecipes] = useRecoilState(recipesState);
	const [updatingId, setUpdatingId] = useState();
	return (
		<>
			<div className="">
				<div className="pt-20 px-5 md:px-10 2xl:container 2xl:mx-auto 2xl:px-0 relative min-h-screen ">
					<div className="pt-10">
						<div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-10">
							{recipes?.map((recipe) => (
								<Fragment key={recipe.id}>
									<RecipeCard
										setUpdatingId={setUpdatingId}
										recipe={recipe}
										setRecipes={setRecipes}
									/>
								</Fragment>
							))}
						</div>
					</div>
					<button
						onClick={() => setisAddRecipe(!isAddRecipe)}
						className="p-4 shadow-2xl rounded-full transform transition-transform duration-300 ease-linear bg-blue-700 text-white fixed right-5 bottom-10 flex items-center justify-center group"
					>
						<span className="hidden group-hover:inline-flex">Add Recipe</span>
						<Icon icon="carbon:add" className="w-10 h-10" />
					</button>
				</div>
			</div>
			<UpdateRecipe id={updatingId} />
		</>
	);
}
