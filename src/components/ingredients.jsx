import React, { useEffect, useState } from "react";
import axios from "axios";

export default function CookRecipeTable({ ingredient }) {
  const [ing, seting] = useState(null);
  const fetchIngredient = async () => {
    await axios
      .get(`http://localhost:3000/ingredients/${ingredient.ingredientId}`)
      .then((res) => {
        // console.log(res);
        seting(res.data);
      });
  };
  useEffect(() => {
    fetchIngredient();
  }, []);

  return (
    <div className="flex justify-between w-72 items-center space-y-2 font-montserrat">
      <h2 className="text-lg font-semibold text-left">{ing?.name}</h2>
      <p className="text-lg font-medium space-x-1">
        <span>{ingredient.quantity}</span>
        <span>{ingredient.measure}</span>
      </p>
    </div>
  );
}
