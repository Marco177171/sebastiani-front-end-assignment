import React, { useEffect, useState } from "react";
import { Recipe, Diet, Difficulty, Cuisine } from "../interfaces/Interfaces";
import {
  GetDiets,
  GetDifficulties,
  GetCuisines,
} from "../functions/GetFunctions";
import { PostRecipe } from "../functions/PostFunctions";

const NewRecipeForm: React.FC = () => {
  const [recipe, setRecipe] = useState<Recipe | null>(null);
  const [diets, setDiets] = useState<Diet[]>([]);
  const [difficulties, setDifficulties] = useState<Difficulty[]>([]);
  const [cuisines, setCuisines] = useState<Cuisine[]>([]);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const diets = await GetDiets();
        if (diets) setDiets(diets);
      } catch (err) {
        setError("Could not get diets");
      }

      try {
        const difficulties = await GetDifficulties();
        if (difficulties) setDifficulties(difficulties);
      } catch (err) {
        setError("Could not get difficulties");
      }

      try {
        const cuisines = await GetCuisines();
        if (cuisines) setCuisines(cuisines);
      } catch (err) {
        setError("Could not find cuisines");
      }
    };

    fetchData();
  }, []);

  return (
    <>
      <div className="centralLarge">
        <div className="card">
          <form action="">
            <h3>New Recipe</h3>
            <div className="divider"></div>
            <h5>name</h5>
            <input type="text" name="" id="" placeholder="recipe's name..." />
            <div className="row">
              <div className="col4">
                <h6>cuisine</h6>
                {cuisines.map((cuisine) => (
                  <div key={cuisine.id}>
                    <input
                      type="radio"
                      name="cuisineId"
                      id={`cuisineId-${cuisine.id}`}
                      value={cuisine.id}
                      // onChange={editSearch}
                    />
                    <label htmlFor={`cuisineId-${cuisine.id}`}>
                      {cuisine.name}
                    </label>
                    <br />
                  </div>
                ))}
              </div>
              <div className="col4">
                <h6>difficulty</h6>
                {difficulties.map((difficulty) => (
                  <div key={difficulty.id}>
                    <input
                      type="radio"
                      name="difficultyId"
                      id={`difficultyId-${difficulty.id}`}
                      value={difficulty.id}
                      // onChange={editSearch}
                    />
                    <label htmlFor={`difficultyId-${difficulty.id}`}>
                      {difficulty.name}
                    </label>
                    <br />
                  </div>
                ))}
              </div>
              <div className="col4">
                <h6>diets</h6>
                {diets.map((diet) => (
                  <div key={diet.id}>
                    <input
                      type="radio"
                      name="dietId"
                      id={`diet-${diet.id}`}
                      value={diet.id}
                      // onChange={editSearch}
                    />
                    <label htmlFor={`dietId-${diet.id}`}>{diet.name}</label>
                    <br />
                  </div>
                ))}
              </div>
            </div>
            <div className="divider"></div>
            <h5>description</h5>
            <textarea
              name=""
              id=""
              placeholder="write description here..."
            ></textarea>
            <input type="submit" value="post recipe" />
          </form>
        </div>
      </div>
    </>
  );
};

export default NewRecipeForm;
