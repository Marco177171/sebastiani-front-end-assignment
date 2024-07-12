import { resolveCaa } from "dns";
import { useState, useEffect } from "react";

export interface Recipe {
  id: string;
  name: string;
  ingredients: string[];
  type: string;
  instructions: string;
  cuisineId: string;
  dietId: string;
  difficultyId: string;
  image: string;
}

async function fetchRecipeById(id: string) {
  try {
    const response = await fetch("http://localhost:8080/recipes/{id}");
    if (!response.ok) {
      throw new Error(`Error: ${response.status} ${response.statusText}`);
    }
    const data: Recipe = await response.json();
    return data;
  } catch (error) {
    console.error("Could not find recipes:", error);
  }
}

const RecipeDetail: React.FC = (id: any) => {
  const [Recipe, setItems] = useState<Recipe>();
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const getItems = async () => {
      try {
        const Rec = await fetchRecipeById(id);
        if (Rec != undefined) setItems(Rec);
      } catch (err) {
        setError("Could not get recipes");
      }
    };
    getItems();
  }, []);

  if (error || Recipe == undefined) {
    return <div>{error}</div>;
  }

  return (
    <>
      <h1>{Recipe.name}</h1>
      <div className="row">
        <div className="col6">
          <h3>cuisine</h3>
          <p>blabla</p>
          <h3>cuisine</h3>
          <p>blabla</p>
          <h3>cuisine</h3>
          <p>blabla</p>
          <h3>cuisine</h3>
          <p>blabla</p>
        </div>
        <div className="col6">
          <div className="picLarge"></div>
        </div>
      </div>
    </>
  );
};

export default RecipeDetail;
