import React, { useState, useEffect } from "react";

export interface Recipe {
  id: string;
  name: string;
  ingredients: string[];
  items: string;
  instructions: string;
  cuisineId: string;
  dietId: string;
  difficultyId: string;
  image: string;
}

async function fetchRecipes() {
  try {
    const response = await fetch("http://localhost:8080/recipes");
    if (!response.ok) {
      throw new Error(`Error: ${response.status} ${response.statusText}`);
    }
    const data: Recipe[] = await response.json();
    return data;
  } catch (error) {
    console.error("Could not find recipes: ", error);
  }
}

const RecipeList: React.FC = () => {
  const [Recipe, setItems] = useState<Recipe[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const getItems = async () => {
      try {
        const Recipes = await fetchRecipes();
        if (Recipes != undefined) setItems(Recipes);
      } catch (err) {
        setError("Could not get recipes");
      }
    };
    getItems();
  }, []);

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div>
      <div className="row">
        {Recipe.map((Recipes) => (
          <div className="col4" key={Recipes.id}>
            <div className="card">
              <div className="picSmall">
                <p>difficulty: {Recipes.difficultyId}</p>
              </div>
              <h3>{Recipes.name}</h3>
              <div className="divider"></div>
              <h6>INGREDIENTS</h6>
              <div className="divider"></div>
              {Recipes.ingredients.map((ingredients) => (
                <p>{ingredients}</p>
              ))}
              <a href="recipes/{Recipes.id}">see recipe's details</a>
            </div>
          </div>
        ))}
      </div>
      <ul></ul>
    </div>
  );
};

export default RecipeList;
