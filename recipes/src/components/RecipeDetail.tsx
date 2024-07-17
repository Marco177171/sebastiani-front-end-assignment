import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  getRecipeById,
  getCuisineById,
  getDifficultyById,
  getDietById,
  getRecipeComments,
  computeAverage,
} from "../functions/GetFunctions";
import { Recipe, Comment } from "../interfaces/Interfaces";
import { PostComment } from "../functions/PostFunctions";

const RecipeDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [recipe, setRecipe] = useState<Recipe | null>(null);
  const [comments, setComments] = useState<Comment[] | null>(null);
  const [newComment, setNewComment] = useState<Comment>({
    id: "",
    recipeId: id || "",
    comment: "",
    rating: 5,
    date: new Date().toISOString(),
  });
  const [dietString, setDietString] = useState<string>("");
  const [difficultyString, setDifficultyString] = useState<string>("");
  const [cuisineString, setCuisineString] = useState<string>("");
  const [error, setError] = useState<string | null>(null);
  const [average, setAverage] = useState<number>(5);

  const editComment = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setNewComment((prevData) => ({ ...prevData, [name]: value }));
  };

  const submitComment = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await PostComment(recipe!, {
        ...newComment,
        date: new Date().toISOString(),
      });
      console.log(response);
      setComments(comments);
      setNewComment({
        id: "",
        recipeId: recipe!.id,
        comment: "",
        rating: 5,
        date: new Date().toISOString(),
      });
      window.location.reload();
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    const fetchRecipeData = async () => {
      try {
        const fetchedRecipe = await getRecipeById(id!);
        setRecipe(fetchedRecipe);

        const fetchedCuisine = await getCuisineById(fetchedRecipe.cuisineId);
        setCuisineString(fetchedCuisine.name);

        const fetchedDiet = await getDietById(fetchedRecipe.dietId);
        setDietString(fetchedDiet.name);

        const fetchedDifficulty = await getDifficultyById(
          fetchedRecipe.difficultyId
        );
        setDifficultyString(fetchedDifficulty.name);

        const fetchedComments = await getRecipeComments(id!);
        setComments(fetchedComments);

        const average = await computeAverage(fetchedComments);
        setAverage(average);
      } catch (err) {
        setError("Could not find the requested recipe");
      }
    };

    fetchRecipeData();
  }, [id]);

  if (error) {
    return <div>{error}</div>;
  }

  if (!recipe || !comments) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <div className="row">
        <div className="col6">
          <h1>{recipe.name}</h1>
          <p>
            {cuisineString}, {dietString}, {difficultyString} | {average}/5
            rated
          </p>
          <div className="divider"></div>
          <h6>YOU'LL NEED:</h6>
          {recipe.ingredients.map((item, index) => (
            <p key={index}>{item}</p>
          ))}
          <div className="divider"></div>
          <h6>PREPARATION</h6>
          <p>{recipe.instructions}</p>
          <div className="card">
            <h5>leave a comment</h5>
            <div className="divider"></div>
            <form onSubmit={submitComment}>
              <div style={{ justifyContent: "space-around", display: "flex" }}>
                <p>nasty</p>
                <p>good</p>
                <p>nice!</p>
                <p>great!</p>
                <p>delicious</p>
              </div>
              <input
                type="range"
                id="rating"
                name="rating"
                max={5}
                min={1}
                value={newComment.rating}
                onChange={editComment}
                required
              />
              <textarea
                id="comment"
                name="comment"
                placeholder="type here..."
                value={newComment.comment}
                onChange={editComment}
                required
              ></textarea>
              <input
                type="hidden"
                name="recipeId"
                value={newComment.recipeId}
                required
              />
              {/* <input type="hidden" name="date" value={newComment.date} /> */}
              <input type="submit" value="submit comment" />
            </form>
          </div>
        </div>
        <div className="col6">
          <div
            className="picLarge"
            style={{
              backgroundImage: `url(http://localhost:8080${recipe.image})`,
            }}
          ></div>
        </div>
      </div>
      <div className="divider"></div>
      <h3>COMMENTS</h3>
      <div className="row">
        {comments.map((item, index) => (
          <div className="col4" key={index}>
            <div className="card">
              <>
                <span>rating: {item.rating}/5</span>
                <div className="divider"></div>
                <h5>{item.comment}</h5>
              </>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default RecipeDetail;
