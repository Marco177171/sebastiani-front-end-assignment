import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getRecipeById } from "../functions/GetFunctions";
import { Recipe } from "../interfaces/Interfaces";

const RecipeDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [recipe, setRecipe] = useState<Recipe | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const getRecipe = async () => {
      try {
        const fetchedRecipe = await getRecipeById(id!);
        setRecipe(fetchedRecipe);
      } catch (err) {
        setError("Could not find the requested recipe");
      }
    };
    getRecipe();
  }, [id]);

  if (error) {
    return <div>{error}</div>;
  }

  if (!recipe) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <div className="row">
        <div className="col6">
          <h1>{recipe.name}</h1>
          <div className="divider"></div>
          {recipe.ingredients.map((item) => (
            <p>{item}</p>
          ))}
          <div className="divider"></div>
          <p>{recipe.instructions}</p>
        </div>
        <div className="col6">
          <div
            className="picLarge"
            style={{
              backgroundImage: `url(http://localhost:8080${recipe.image})`,
            }}
          ></div>
        </div>
      </div>
    </>
  );
};

export default RecipeDetail;
