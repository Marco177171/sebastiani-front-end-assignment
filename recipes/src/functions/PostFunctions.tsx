import { Comment, Recipe } from "../interfaces/Interfaces";

export const PostComment = async (recipe: Recipe, comment: Comment) => {
  console.log("in post comment: Comment: ", comment);
  try {
    const response = await fetch(
      `http://localhost:8080/recipes/${comment.recipeId}/comments`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          comment: comment.comment,
          rating: comment.rating,
          date: comment.date,
        }),
      }
    );
    if (!response.ok) {
      throw new Error(`Error: ${response.status} ${response.statusText}`);
    }
  } catch (error) {
    console.error("Could not find diets: ", error);
  }
};

export const PostRecipe = async (recipe: Recipe) => {
  try {
    const formData = new FormData();
    formData.append("name", recipe.name);
    formData.append("ingredients", recipe.ingredients.join(","));
    formData.append("items", recipe.items);
    formData.append("instructions", recipe.instructions);
    formData.append("cuisineId", recipe.cuisineId);
    formData.append("dietId", recipe.dietId);
    formData.append("difficultyId", recipe.difficultyId);
    formData.append("image", recipe.image);
    const response = await fetch(`http://localhost:8080/recipes`, {
      method: "POST",
      body: formData,
    });
    if (!response.ok) {
      throw new Error(`Error: ${response.status} ${response.statusText} `);
    }
  } catch (error) {
    console.error("Could not post recipe: ", error);
  }
};
