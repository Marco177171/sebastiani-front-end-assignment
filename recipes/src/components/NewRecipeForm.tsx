import React, { useEffect, useState, ChangeEvent, FormEvent } from "react";
import { Recipe, Diet, Difficulty, Cuisine } from "../interfaces/Interfaces";
import {
  GetDiets,
  GetDifficulties,
  GetCuisines,
} from "../functions/GetFunctions";
import { PostRecipe } from "../functions/PostFunctions";

const NewRecipeForm: React.FC = () => {
  const [recipe, setRecipe] = useState<Recipe>({
    id: "",
    name: "",
    ingredients: [],
    items: "",
    instructions: "",
    cuisineId: "",
    dietId: "",
    difficultyId: "",
    image: "",
  });
  const [diets, setDiets] = useState<Diet[]>([]);
  const [difficulties, setDifficulties] = useState<Difficulty[]>([]);
  const [cuisines, setCuisines] = useState<Cuisine[]>([]);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const diets = await GetDiets();
        if (diets) setDiets(diets);
      } catch (error) {
        setError("Could not get diets");
      }

      try {
        const difficulties = await GetDifficulties();
        if (difficulties) setDifficulties(difficulties);
      } catch (error) {
        setError("Could not get difficulties");
      }

      try {
        const cuisines = await GetCuisines();
        if (cuisines) setCuisines(cuisines);
      } catch (error) {
        setError("Could not get cuisines");
      }
    };

    fetchData();
  }, []);

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setRecipe((prevRecipe) => ({
      ...prevRecipe,
      [name]: value,
    }));
  };

  const handleIngredientsListChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.value) {
      setRecipe((prevRecipe) => ({
        ...prevRecipe,
        ingredients: e.target.value
          .split(",")
          .map((ingredient) => ingredient.trim()),
      }));
    }
  };

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      setRecipe((prevRecipe) => ({
        ...prevRecipe,
        image: file,
      }));
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try {
      await PostRecipe(recipe);
      alert("Recipe posted successfully!");
    } catch (err) {
      setError("Could not post recipe");
    }
  };

  return (
    <>
      <div className="centralLarge">
        <div className="card">
          <form onSubmit={handleSubmit}>
            <h3>New Recipe</h3>
            <div className="divider"></div>
            <h5>name</h5>
            <input
              type="text"
              name="name"
              placeholder="recipe's name..."
              value={recipe.name}
              onChange={handleChange}
              required
            />
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
                      checked={recipe.cuisineId === cuisine.id}
                      onChange={handleChange}
                      required
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
                      checked={recipe.difficultyId === difficulty.id}
                      onChange={handleChange}
                      required
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
                      id={`dietId-${diet.id}`}
                      value={diet.id}
                      checked={recipe.dietId === diet.id}
                      onChange={handleChange}
                      required
                    />
                    <label htmlFor={`dietId-${diet.id}`}>{diet.name}</label>
                    <br />
                  </div>
                ))}
              </div>
            </div>
            <div className="divider"></div>
            <h5>Image</h5>
            <input
              type="file"
              name="image"
              onChange={handleImageChange}
              required
            />
            <div className="divider"></div>
            <h5>ingredients</h5>
            <input
              type="text"
              name="ingredients"
              // value={recipe.ingredients}
              placeholder="type ingredients here"
              onChange={handleIngredientsListChange}
              required
            />
            <div className="divider"></div>
            <h5>instructions</h5>
            <textarea
              name="instructions"
              placeholder="write instructions here..."
              value={recipe.instructions}
              onChange={handleChange}
              required
            ></textarea>
            <input type="submit" value="post recipe" />
          </form>
        </div>
      </div>
    </>
  );
};

export default NewRecipeForm;
