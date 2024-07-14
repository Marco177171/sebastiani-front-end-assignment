import React, { useEffect, useState } from "react";
import {
  GetDiets,
  GetCuisines,
  GetDifficulties,
} from "../functions/GetFunctions";
import {
  Cuisine,
  Diet,
  Difficulty,
  FilterFormstate,
} from "../interfaces/Interfaces";

const SideBar: React.FC = () => {
  const [diets, setDiets] = useState<Diet[]>([]);
  const [difficulties, setDifficulties] = useState<Difficulty[]>([]);
  const [cuisines, setCuisines] = useState<Cuisine[]>([]);
  const [filterFormState, setFilters] = useState<FilterFormstate>({
    _page: 0,
    _limit: 10,
    q: "",
    cuisineId: "",
    dietId: "",
    difficultyId: "",
    _expand: [""],
  });
  const [difficultiesFilters, setDifficultiesFilters] = useState<string[]>([]);
  const [dietsFilters, setDietsFilters] = useState<string[]>([]);
  const [cuisineFilters, setCuisinesFilters] = useState<string[]>([]);
  const [error, setError] = useState<string | null>(null);

  const changeSearchText = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFilters((prevData) => ({ ...prevData, [name]: value }));
  };

  const updateDifficultiesFilters = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { value, checked } = e.target;
    setDifficultiesFilters((prevData) =>
      checked ? [...prevData, value] : prevData.filter((item) => item !== value)
    );
  };

  const updateDietsFilters = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value, checked } = e.target;
    setDietsFilters((prevData) =>
      checked ? [...prevData, value] : prevData.filter((item) => item !== value)
    );
  };

  const updateCuisinesFilters = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value, checked } = e.target;
    setCuisinesFilters((prevData) =>
      checked ? [...prevData, value] : prevData.filter((item) => item !== value)
    );
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const query = new URLSearchParams();

    query.append("q", filterFormState.q);
    if (cuisineFilters.length > 0)
      query.append("cuisineId", cuisineFilters.join(","));
    if (dietsFilters.length > 0) query.append("dietId", dietsFilters.join(","));
    if (difficultiesFilters.length > 0)
      query.append("difficultyId", difficultiesFilters.join(","));

    window.location.href = `/search_results?${query.toString()}`;
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const diets = await GetDiets();
        if (diets) setDiets(diets);
      } catch (err) {
        setError("Could not get diets");
      }

      try {
        const difficulties = await GetDifficulties();
        if (difficulties) setDifficulties(difficulties);
      } catch (err) {
        setError("Could not get difficulties");
      }

      try {
        const cuisines = await GetCuisines();
        if (cuisines) setCuisines(cuisines);
      } catch (err) {
        setError("Could not find cuisines");
      }
    };

    fetchData();
  }, []);

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="sideBar">
      <form onSubmit={handleSubmit}>
        <div className="sideBarSub">
          <input
            type="search"
            name="q"
            id="search"
            placeholder="search a recipe..."
            onChange={changeSearchText}
          />
          <div className="divider"></div>
          <h3>FILTERS</h3>
          <div className="divider"></div>
          <h6>cuisine</h6>
          {cuisines.map((cuisine) => (
            <div key={cuisine.id}>
              <input
                type="checkbox"
                id={`cuisineId-${cuisine.id}`}
                value={cuisine.id}
                onChange={updateCuisinesFilters}
              />
              <label htmlFor={`cuisineId-${cuisine.id}`}>{cuisine.name}</label>
              <br />
            </div>
          ))}
          <div className="divider"></div>
          <h6>difficulty</h6>
          {difficulties.map((difficulty) => (
            <div key={difficulty.id}>
              <input
                type="checkbox"
                id={`difficultyId-${difficulty.id}`}
                value={difficulty.id}
                onChange={updateDifficultiesFilters}
              />
              <label htmlFor={`difficultyId-${difficulty.id}`}>
                {difficulty.name}
              </label>
              <br />
            </div>
          ))}
          <div className="divider"></div>
          <h6>diets</h6>
          {diets.map((diet) => (
            <div key={diet.id}>
              <input
                type="checkbox"
                id={`diet-${diet.id}`}
                value={diet.id}
                onChange={updateDietsFilters}
              />
              <label htmlFor={`dietId-${diet.id}`}>{diet.name}</label>
              <br />
            </div>
          ))}
          <div className="divider"></div>
        </div>
        <div className="sideBarBottom">
          <input type="submit" value="search" />
        </div>
      </form>
    </div>
  );
};

export default SideBar;
