import React, { useState, useEffect } from "react";
import { Recipe } from "../interfaces/Interfaces";
import { getRecipes } from "../functions/GetFunctions";

const RecipeList: React.FC = () => {
  const [Recipe, setItems] = useState<Recipe[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const getItems = async () => {
      try {
        const Recipes = await getRecipes();
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
              <div
                className="picSmall"
                style={{
                  backgroundImage: `url(http://localhost:8080${Recipes.image})`,
                }}
              ></div>
              <h3>{Recipes.name}</h3>
              <div className="divider"></div>
              <h6>INGREDIENTS</h6>
              <div className="divider"></div>
              {Recipes.ingredients.map((ingredients) => (
                <p>{ingredients}</p>
              ))}
              <a href="{recipes/`${Recipes.id}`}">see recipe's details</a>
            </div>
          </div>
        ))}
      </div>
      <ul></ul>
    </div>
  );
};

export default RecipeList;
