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
  console.log("adding new recipe to db");
  try {
    const response = await fetch(
      `url(http://localhost:8080/recipes/${recipe.id}/comments`,
      {
        method: "POST",
        body: recipe.id,
      }
    );
  } catch {}
};
