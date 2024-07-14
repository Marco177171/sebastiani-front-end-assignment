import { Comment, Recipe } from "../interfaces/Interfaces";

export const PostComment = async (recipe: Recipe, comment: Comment) => {
  try {
    const response = await fetch(
      `url(http://localhost:8080/recipes/${recipe.id}/comments`,
      {
        method: "POST",
        body: comment.comment,
      }
    );
    if (!response.ok) {
      throw new Error(`Error: ${response.status} ${response.statusText}`);
    }
  } catch (error) {
    console.error("Could not find diets: ", error);
  }
};
