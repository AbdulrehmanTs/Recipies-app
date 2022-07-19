import { Icon } from "@iconify/react";
import React, { Fragment, useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import { isCooking } from "../atom/isCooking";
import { stockIngredients } from "../atom/my-stock";
import axios from "axios";
import Ingredients from "./ingredients";
import "../styles/cook-recipe-card.css";
import { recipesState } from "../atom/recipes-atom";


export default function CookRecipeCard({ recipe }) {
  const [stock, setStock] = useRecoilState(stockIngredients);
  const [isStocksAvailable, SetIsStocksAvailable] = useState(true);
  const [isStopLoop, set_isStopLoop] = useState(false);
  const ingredients = recipe.ingredients;

  const [recipieBeignCooked, set_recipieBeignCooked] = useState(null);
  const [remainingTime, set_remainingTime] = useState(null);


  const [secs, set_secs] = useState(120);

  const [widthInPer, set_widthInPer] = useState(null);
  
  const [isCookingb, set_isCookingb] = useRecoilState(isCooking);

  const [allRecipes, set_allRecipes] = useRecoilState(recipesState);

  const checkIsCook = (recipe) => {
    alert("cook is now started");
    console.log("recipe",recipe);
    // console.log("recipe.id",recipe.id);
    console.log("recipe.duration",recipe.duration);
    set_recipieBeignCooked(recipe.id)
    // set_remainingTime(recipe.duration)

    set_isCookingb(true)

    set_secs(()=>{
      let secs = recipe.duration * 60
      return secs
  })
  // const interval2 = setInterval(()=>{

  
  //   set_widthInPer(()=> {
  //     let newData
  
  //   if(secs  >  0){
  //     newData =  secs*100/ recipe.duration
  
  //   }else{
  //     newData=100
  //     clearInterval(interval2)
  //   }
  //   return newData
  //   }
  //     ); 
        
  // },1000)
  
const interval = setInterval(()=>{
 
  set_secs((prev)=> {
    let newData
    
  if(prev  >  0){
    newData =  prev  - 1

  }else{
    newData=0
    clearInterval(interval)
  }
  return newData
  }
    );
},1000)



setTimeout(  ()=> {
alert('Please eat the recipie otherwise it will burn in next 30 seconds')
},recipe.duration*60*1000)

setTimeout(  ()=> {
  alert('Your Dish has been burned');
  deleteRecipe();
},recipe.duration*60*1000+30000)
  












    
  };


   const deleteRecipe = async () => {
    await axios
      .delete(`http://localhost:3000/pre-recipes/${recipe.id}`)
      .then((res) => {
        set_allRecipes((prev)=>{
          let newRecipes =[]
          console.log(prev)
          prev.map(item=>{
            console.log(item,item.id,recipe.id)
           
            if(item.id == recipe.id){
              console.log('')
            }else{
              newRecipes.push(item)
            }
          })
          console.log(newRecipes)
          return [...newRecipes]
        })
      });
  };

//   const deleteRecipe = (recipe)=> {
//     let set_allRecipes = []
// {allRecipes.map(recipeFromData=> {
//   if(recipeFromData.id == recipe.id){
//     console.log("yes exist");
//   }
//   else {


//     set_allRecipes.push(recipeFromData);
//   }
// })}
//   }

  // console.log(stock,ingredients)
  useEffect(() => {
    ingredients.map((ingredient) => {
      stock.map((i) => {
        if (ingredient.ingredientId == i.ingredientId) {
          if (ingredient.quantity > i.quantity) {
            SetIsStocksAvailable(false);
          }
        }
      });

    

    // return ()=> {
    //   clearInterval(interval)
    // }

    },[]);
    // checkIsCook();
    // console.log(ingArr.length);

    // if (ingArr?.length >= stkArr?.length) {
    //   setisSelect(true);
    // } else {
    //   for (let i = 0; i <= ingArr?.length - 1; i++) {
    //     console.log(stkArr[i]?.ingredientId, stkArr[i]?.availableQuantity);
    //     console.log(ingArr[i]?.ingredientId, ingArr[i]?.quantity);
    //     if (
    //       ingArr[i]?.ingredientId === stkArr[i]?.ingredientId &&
    //       ingArr[i]?.quantity <= stkArr[i]?.availableQuantity
    //     ) {
    //       setisSelect(false);
    //     } else {
    //       setisSelect(true);
    //     }
    //   }
    // }

    // console.log("recipie.ingredients--------->>>>",recipe.ingredients.length);
    // console.log("stock--------->>>>",stock.length);
    if (recipe.ingredients.length > stock.length) {
      // console.log("can't cook")
    } else {
      // console.log("can cook");
      // console.log("recipie.ingredients-->>",recipe.ingredients);
      // console.log("stock-->>",stock);

      for (let i = 0; i < recipe.ingredients.length; i++) {
        // console.log("recipe.ingredients",recipe.ingredients[i])
        // console.log("stock ingredient",stock[i])

        // for (let j = 0; j < stock.length; j++) {

        // }

        // console.log("recipe.ingredients[i].ingredientId",recipe.ingredients[i].ingredientId);
        // console.log("stock[i].ingredientId",stock[i].ingredientId);

        if (isStopLoop == false) {
          // console.log("loop working----------------");
          if (recipe.ingredients[i].ingredientId == stock[i].ingredientId) {
            // console.log("quantity", recipe.ingredients[i].quantity);
            // console.log("availableQuantity", stock[i].availableQuantity);
            if (recipe.ingredients[i].quantity <= stock[i].availableQuantity) {
              console.log("availble");
            } else {
              console.log("unavailble");
              SetIsStocksAvailable(false);
              set_isStopLoop(true);
            }
          }
        }
      }

      // let counter= 0
      //   while (counter <= stock.length) {
      //     console.log("recipie.ingredients-->>",recipe.ingredients[counter].ingredientId);
      //     console.log("stock-->>",stock[counter].ingredientId);
      //     // if (counter == 1) {
      //     //   console.log("breaking")
      //     //    break;
      //     // }

      //     console.log('counter',counter);
      //     counter++;
      //  }
    }
  }, []);
  // console.log("-----------------------------------------------------")
  // console.log("recipie.ingredients---------",recipe.ingredients.length);
  // console.log("stock---------",stock.length);
  // console.log("-----------------------------------------------------")
  return (
    <div className="w-full h-full relative p-5 rounded-xl shadow border border-gray-100 font-montserrat pb-10">
     
     {secs == 0 ? "" : <>
     <div className={`absolute right-5 -top-5 h-12 ${recipe.id == recipieBeignCooked ? "bg-green-300" : "bg-green-100 "} px-2 flex items-center justify-center`}>
        <p className="font-bold font-montserrat text-sm flex items-center space-x-3 text-green-800">
          <Icon icon="bi:clock-history" className="w-5 h-5" />
          {recipe.id == recipieBeignCooked ? 
           <span>{secs} sec</span>
           :
           <span>{recipe.duration} mins</span>
           }
        </p>
      </div>
      </> }
      
      <div className="my-10">
        <h3 className="text-4xl xl:text-5xl break-words leading-normal font-semibold font-montserrat capitalize">
          {recipe.recipeName}
        </h3>
      </div>
      <div className="flex flex-col xl:flex-row justify-between w-full">
        <div>
          {recipe?.ingredients.map((ingredient) => (
            <div
              key={ingredient.ingredientId}
              className="flex items-center space-x-2"
            >
              <button>
                <Icon icon="carbon:add-alt" />
              </button>
              <Ingredients ingredient={ingredient} />
            </div>
          ))}
        </div>

        <div className="flex-1 py-4 flex flex-col space-y-2 absolute top-1/2 -translate-y-1/2 -right-1 ">
            {recipe.id == recipieBeignCooked ? 
              <>
              
              {secs == 0 ?
                  <button
                  onClick={()=> deleteRecipe(recipe)}
                  className={`  h-10 rounded-l-full text-white   hover:shadow-sm flex items-center justify-center space-x-2   bg-blue-400  text-[17px] px-5  border-[green]  `}
                >
                  Eat
                  
                </button>
                :
                <button
                className={`  h-10 rounded-l-full text-white   hover:shadow-sm flex items-center justify-center space-x-2  " bg-[green]  text-[15px] px-3   border-[green]  `}
              > Cooking
                
              </button>
              }
 


              </>
              : 
              <button
              onClick={()=> checkIsCook(recipe)}
              className={`px-5  h-10 rounded-l-full text-white font-medium hover:shadow-sm flex items-center justify-center space-x-2  
              ${
                isStocksAvailable
                  ? "bg-rose-700 border-rose-700 hover:bg-white hover:text-rose-700 hover:border "
                  : "bg-gray-500 cursor-not-allowed hover:bg-gray-500 border-0 "
              }
              `}
            >
              Cook
            </button>
            }
         
        </div>
      </div>

      {/* {recipe.id == recipieBeignCooked ? 
        <div className="absolute bottom-[10px] w-[100%] left-0 block">
          <div className="bg-gray-200 w-[90%] h-[10px] mx-auto overflow-hidden">

            <div className={`bg-[orange] w-[100%] h-[10px] left-0 rounded-[50px] block progress-animatio n duration-[9000ms]`}>
            </div>

          </div>
        </div>
      : 
      ""}
     */}
   
    </div>
  );
}
