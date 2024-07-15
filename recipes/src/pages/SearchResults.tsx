import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { Recipe, Diet, Difficulty, Cuisine } from "../interfaces/Interfaces";
import {
  getDifficultyById,
  getDietById,
  getCuisineById,
} from "../functions/GetFunctions";
import Layout from "./Layout";

interface DetailedRecipe extends Recipe {
  dietName: string;
  difficultyName: string;
  cuisineName: string;
}

const SearchResults: React.FC = () => {
  const [results, setResults] = useState<DetailedRecipe[]>([]);
  const [error, setError] = useState<string | null>(null);
  const location = useLocation();

  useEffect(() => {
    const fetchData = async () => {
      const query = new URLSearchParams(location.search).toString();

      console.log("QUERY STRING", query);
      console.log(`http://localhost:8080/recipes?${query}`);

      try {
        const response = await fetch(`http://localhost:8080/recipes?${query}`);
        if (!response.ok) {
          throw new Error("Failed to fetch search results");
        }
        const data: Recipe[] = await response.json();

        const detailedResults = await Promise.all(
          data.map(async (item) => {
            const [cuisine, difficulty, diet] = await Promise.all([
              getCuisineById(item.cuisineId),
              getDifficultyById(item.difficultyId),
              getDietById(item.dietId),
            ]);

            return {
              ...item,
              cuisineName: cuisine.name,
              difficultyName: difficulty.name,
              dietName: diet.name,
            };
          })
        );

        setResults(detailedResults);
      } catch (err) {
        console.error(err);
        setError("Failed to fetch search results");
      }
    };

    fetchData();
  }, [location.search]);

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <Layout>
      <div>
        <h2>Search Results</h2>
        {results.length > 0 ? (
          <ul>
            {results.map((result) => (
              <div className="row" key={result.id}>
                <div className="divider"></div>
                <div className="col4">
                  <h4>{result.name}</h4>
                  <p>
                    {result.dietName}, {result.cuisineName},{" "}
                    {result.difficultyName}
                  </p>
                  <br />
                  <a href={`/recipes/${result.id}`}>open</a>
                </div>
                <div className="col4">
                  {result.ingredients.map((ingredient, index) => (
                    <p key={index}>{ingredient}</p>
                  ))}
                </div>
                <div className="col4">
                  <div
                    className="picSmall"
                    style={{
                      backgroundImage: `url(http://localhost:8080${result.image})`,
                    }}
                  ></div>
                </div>
              </div>
            ))}
          </ul>
        ) : (
          <>
            <div className="divider"></div>
            <h3>Your search did not produce any results</h3>
            <a href="/">Go back</a>
          </>
        )}
      </div>
    </Layout>
  );
};

export default SearchResults;
