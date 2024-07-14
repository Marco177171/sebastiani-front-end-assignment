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
  const [FilterFormstate, setFilters] = useState<FilterFormstate>({
    searchText: "",
    cuisinesIds: [],
    difficultyIds: [],
    dietsId: [],
  });
  const [error, setError] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFilters((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e: React.ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:3000/");
      console.log(response);
    } catch (error) {
      console.error(error);
    }
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
      <form action="/search_results">
        <div className="sideBarSub">
          <input
            type="search"
            name="search recipe"
            id="search"
            placeholder="search a recipe..."
          />
          <div className="divider"></div>
          <h3>FILTERS</h3>
          <div className="divider"></div>
          <h6>cuisine</h6>
          {cuisines.map((cuisine) => (
            <>
              <input
                type="checkbox"
                key={cuisine.id}
                name=""
                id="cuisineCheckbox"
                value={cuisine.name}
              />
              <label>{cuisine.name}</label>
              <br />
            </>
          ))}
          <input type="checkbox" name="" id="" value={"ciao"} />
          <div className="divider"></div>
          <h6>difficulty</h6>
          {difficulties.map((difficulty) => (
            <>
              <input
                type="checkbox"
                key={difficulty.id}
                name=""
                id="difficultyCheckbox"
                value={difficulty.name}
              />
              <label>{difficulty.name}</label>
              <br />
            </>
          ))}
          <div className="divider"></div>
          <h6>diets</h6>
          {diets.map((diet) => (
            <>
              <input
                type="checkbox"
                key={diet.id}
                name=""
                id="dietCheckbox"
                value={diet.name}
              />
              <label>{diet.name}</label>
              <br />
            </>
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
