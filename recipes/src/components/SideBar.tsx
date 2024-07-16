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
    _limit: 9,
    q: "",
    cuisineId: "",
    dietId: "",
    difficultyId: "",
    _expand: [""],
  });
  const [error, setError] = useState<string | null>(null);

  const editSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFilters((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const query = new URLSearchParams();

    query.append("q", filterFormState.q);
    if (filterFormState.cuisineId)
      query.append("cuisineId", filterFormState.cuisineId);
    if (filterFormState.dietId) query.append("dietId", filterFormState.dietId);
    if (filterFormState.difficultyId)
      query.append("difficultyId", filterFormState.difficultyId);
    window.location.href = `/search_results?${query.toString()}`;
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const diets = await GetDiets();
        if (diets) setDiets(diets);
        const difficulties = await GetDifficulties();
        if (difficulties) setDifficulties(difficulties);
        const cuisines = await GetCuisines();
        if (cuisines) setCuisines(cuisines);
      } catch (err) {
        setError("Could not fetch data");
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
            onChange={editSearch}
          />
          <div className="divider"></div>
          <h3>FILTERS</h3>
          <div className="divider"></div>
          <h6>cuisine</h6>
          {cuisines.map((cuisine) => (
            <div key={cuisine.id}>
              <input
                type="radio"
                name="cuisineId"
                id={`cuisineId-${cuisine.id}`}
                value={cuisine.id}
                onChange={editSearch}
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
                type="radio"
                name="difficultyId"
                id={`difficultyId-${difficulty.id}`}
                value={difficulty.id}
                onChange={editSearch}
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
                type="radio"
                name="dietId"
                id={`diet-${diet.id}`}
                value={diet.id}
                onChange={editSearch}
              />
              <label htmlFor={`dietId-${diet.id}`}>{diet.name}</label>
              <br />
            </div>
          ))}
        </div>
        <div className="sideBarBottom">
          <input type="submit" value="search" />
        </div>
      </form>
    </div>
  );
};

export default SideBar;
