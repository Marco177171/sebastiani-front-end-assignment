import { Diet, Difficulty, Cuisine, Recipe } from "../interfaces/Interfaces";

export async function GetDiets() {
  try {
    const response = await fetch("http://localhost:8080/diets");
    if (!response.ok) {
      throw new Error(`Error: ${response.status} ${response.statusText}`);
    }
    const data: Diet[] = await response.json();
    return data;
  } catch (error) {
    console.error("Could not find diets: ", error);
  }
}

export async function GetDifficulties() {
  try {
    const response = await fetch("http://localhost:8080/difficulties");
    if (!response.ok) {
      throw new Error(`Error: ${response.status} ${response.statusText}`);
    }
    const data: Difficulty[] = await response.json();
    return data;
  } catch (error) {
    console.error("Could not find difficulties: ", error);
  }
}

export async function GetCuisines() {
  try {
    const response = await fetch("http://localhost:8080/cuisines");
    if (!response.ok) {
      throw new Error(`Error: ${response.status} ${response.statusText}`);
    }
    const data: Cuisine[] = await response.json();
    return data;
  } catch (error) {
    console.error("Could not find cuisines: ", error);
  }
}

export async function getRecipes() {
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

export const getRecipeById = async (id: string): Promise<Recipe> => {
  const response = await fetch(`http://localhost:8080/recipes/${id}`);
  if (!response.ok) {
    throw new Error(`Error: ${response.status} ${response.statusText}`);
  }
  const data: Recipe = await response.json();
  return data;
};
