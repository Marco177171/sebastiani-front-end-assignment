import { join } from "path";
import {
  Diet,
  Difficulty,
  Cuisine,
  Recipe,
  Comment,
} from "../interfaces/Interfaces";

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

export const getDietById = async (id: string): Promise<Diet> => {
  const response = await fetch(`http://localhost:8080/diets`);
  if (!response.ok) {
    throw new Error(`Error: ${response.status} ${response.statusText}`);
  }
  const result: Diet[] = await response.json();
  const res = result.find((diet) => diet.id === id);
  console.log(res, "FOUND!");
  if (!res) {
    throw new Error(`Cuisine with id ${id} not found`);
  }
  return res;
};

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

export const getDifficultyById = async (id: string): Promise<Difficulty> => {
  const response = await fetch(`http://localhost:8080/difficulties`);
  if (!response.ok) {
    throw new Error(`Error: ${response.status} ${response.statusText}`);
  }
  const result: Difficulty[] = await response.json();
  const res = result.find((difficulty) => difficulty.id === id);
  console.log(res, "FOUND!");
  if (!res) {
    throw new Error(`Cuisine with id ${id} not found`);
  }
  return res;
};

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

export const getCuisineById = async (id: string): Promise<Cuisine> => {
  const response = await fetch(`http://localhost:8080/cuisines`);
  if (!response.ok) {
    throw new Error(`Error: ${response.status} ${response.statusText}`);
  }
  const result: Cuisine[] = await response.json();
  const res = result.find((cuisine) => cuisine.id === id);
  console.log(res, "FOUND!");
  if (!res) {
    throw new Error(`Cuisine with id ${id} not found`);
  }
  return res;
};

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

export const getRecipeComments = async (id: string): Promise<Comment[]> => {
  const response = await fetch(`http://localhost:8080/recipes/${id}/comments`);
  if (!response.ok) {
    throw new Error(`Error: ${response.status} ${response.statusText}`);
  }
  const data: Comment[] = await response.json();
  return data;
};

export const computeAverage = async (comments: Comment[]): Promise<number> => {
  let sum: number = 0;
  let amount: number = 0;

  comments.forEach((item) => {
    sum += item.rating;
    amount++;
  });

  const average = amount === 0 ? 0 : sum / amount;
  const result = parseFloat(average.toFixed(2));
  return result;
};
