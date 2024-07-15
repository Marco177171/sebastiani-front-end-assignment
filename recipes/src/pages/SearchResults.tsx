import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { Recipe } from "../interfaces/Interfaces";
import Layout from "./Layout";

const SearchResults: React.FC = () => {
  const [results, setResults] = useState<Recipe[]>([]);
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
        const data = await response.json();
        setResults(data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchData();
  }, [location.search]);

  if (error) {
    return <div>{error}</div>;
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
                  <span>
                    {result.cuisineId} | {result.dietId} | {result.difficultyId}
                  </span>
                  <br />
                  <a href={`/recipes/${result.id}`}>open</a>
                </div>
                <div className="col4">
                  {result.ingredients.map((ingredients) => (
                    <p>{ingredients}</p>
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
            <h3>your research did not produce any result</h3>
            <a href="/">go back</a>
          </>
        )}
      </div>
    </Layout>
  );
};

export default SearchResults;
