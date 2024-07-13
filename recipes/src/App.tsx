import React, { Children } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import AddRecipe from "./pages/AddRecipe";
import Details from "./pages/Details";
import SearchResults from "./pages/SearchResults";

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/recipes/:id" element={<Details />} />
        <Route path="/recipes/add" element={<AddRecipe />} />
        <Route path="/search_results" element={<SearchResults />} />
      </Routes>
    </Router>
  );
};

export default App;
