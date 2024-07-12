import { useEffect, useState } from "react";

export interface Difficulty {
  id: string;
  name: string;
}

export interface Diet {
  id: string;
  name: string;
}

export interface Cuisine {
  id: string;
  name: string;
}

async function getDiets() {
  try {
    const response = await fetch("http://localhost:8080/diets");
    if (!response.ok) {
      throw new Error(`Error: ${response.status} ${response.statusText}`);
    }
    const data: Diet[] = await response.json();
    return data;
  } catch (error) {
    console.error("Could not find diets: ", error);
  }
}

async function getDifficulties() {
  try {
    const response = await fetch("http://localhost:8080/difficulties");
    if (!response.ok) {
      throw new Error(`Error: ${response.status} ${response.statusText}`);
    }
    const data: Difficulty[] = await response.json();
    return data;
  } catch (error) {
    console.error("Could not find difficulties: ", error);
  }
}

async function getCuisines() {
  try {
    const response = await fetch("http://localhost:8080/cuisines");
    if (!response.ok) {
      throw new Error(`Error: ${response.status} ${response.statusText}`);
    }
    const data: Cuisine[] = await response.json();
    return data;
  } catch (error) {
    console.error("Could not find cuisines: ", error);
  }
}

const SideBar: React.FC = () => {
  const [diets, setDiets] = useState<Diet[]>([]);
  const [difficulties, setDifficulties] = useState<Difficulty[]>([]);
  const [cuisines, setCuisines] = useState<Cuisine[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const diets = await getDiets();
        if (diets) setDiets(diets);
      } catch (err) {
        setError("Could not get diets");
      }

      try {
        const difficulties = await getDifficulties();
        if (difficulties) setDifficulties(difficulties);
      } catch (err) {
        setError("Could not get difficulties");
      }

      try {
        const cuisines = await getCuisines();
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
        <button className="success" type="submit">
          search
        </button>
      </div>
    </div>
  );
};

export default SideBar;
