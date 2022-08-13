import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  NavLink,
} from "react-router-dom";
import { gql } from "@apollo/client";
import { useQuery } from "@apollo/client";
import CategoryView from "../Components/CategoryView";
import "./HomeScreen.css";
import ProductDetails from "../Components/ProductDetails";
import Dropdown from "../Components/Dropdown";

export const LOAD_CATEGORIES = gql`
  {
    categories {
      name
    }
  }
`;

const HomeScreen = () => {
  const { data: categoryData } = useQuery(LOAD_CATEGORIES);

  const categoriesList = categoryData?.categories || [];

  return (
    <div className="topLevel">
      <Router>
        <div className="topNavContainer">
          {categoriesList.map((category) => (
            <NavLink
              activeclassname="active"
              className="topNav"
              key={category.name}
              to={`/category/${category.name}`}
            >
              {category.name.charAt(0).toUpperCase() + category.name.slice(1)}
            </NavLink>
          ))}
          <div className="currencySelectorContainer">
            <Dropdown />
          </div>
        </div>
        <Routes>
          <Route path="/" element={<CategoryView />}></Route>
          <Route
            path="/category/:categoryName/"
            element={<CategoryView />}
          ></Route>
          <Route
            path="/category/:categoryName/:id"
            element={<ProductDetails />}
          ></Route>
        </Routes>
      </Router>
    </div>
  );
};

export default HomeScreen;
