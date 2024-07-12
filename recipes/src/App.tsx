import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import RecipeList from "./components/RecipeList";
import RecipeDetail from "./components/RecipeDetail";
import Details from "./pages/Details";

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        {/* <Route path="/" element={<RecipeList />} /> */}
        <Route path="/" element={<Home children={RecipeList} />} />
        <Route path="/recipes" element={<Home children={RecipeDetail} />} />
      </Routes>
    </Router>
  );
};

export default App;
