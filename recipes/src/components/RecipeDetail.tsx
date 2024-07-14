import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getRecipeById, getRecipeComments } from "../functions/GetFunctions";
import { Recipe, Comment } from "../interfaces/Interfaces";
import { PostComment } from "../functions/PostFunctions";

const RecipeDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [recipe, setRecipe] = useState<Recipe | null>(null);
  const [comments, setComments] = useState<Comment[] | null>(null);
  const [newComment, setNewComment] = useState<Comment>({
    id: "",
    recipeId: "",
    comment: "",
    rating: 5,
    date: "",
  });
  const [error, setError] = useState<string | null>(null);

  const editComment = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewComment((prevData) => ({ ...prevData, [name]: value }));
  };

  const submitComment = async (e: React.ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await PostComment(recipe!, newComment!);
      console.log(response);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    const getRecipe = async () => {
      try {
        const fetchedRecipe = await getRecipeById(id!);
        setRecipe(fetchedRecipe);
      } catch (err) {
        setError("Could not find the requested recipe");
      }
    };
    getRecipe();
    const getComments = async () => {
      try {
        const fetchedComments = await getRecipeComments(id!);
        setComments(fetchedComments);
      } catch (err) {
        setError("Could not find the requested recipe");
      }
    };
    getComments();
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
          <div className="divider"></div>
          <h6>YOU'LL NEED:</h6>
          {recipe.ingredients.map((item) => (
            <p>{item}</p>
          ))}
          <div className="divider"></div>
          <h6>PREPARATION</h6>
          <p>{recipe.instructions}</p>
          <div className="card">
            <h5>leave a comment</h5>
            <form action="submitComment" method="post">
              <input type="range" id="rating" max={5} min={1} />
              <textarea
                name="comment"
                id="comment_text"
                placeholder="type here..."
              ></textarea>
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
        {comments.map((item) => (
          <div className="col4">
            <div className="card">
              <>
                <h5>{item.rating}/5</h5>
                <div className="divider"></div>
                <span>{item.comment}</span>
                <p>{item.date}</p>
              </>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default RecipeDetail;
