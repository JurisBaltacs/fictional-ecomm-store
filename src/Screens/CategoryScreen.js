import React from "react";
import { gql } from "@apollo/client";
import { Query } from "@apollo/client/react/components";
import { NavLink } from "react-router-dom";
import "./CategoryScreen.css";

export const LOAD_CATEGORIES = gql`
  {
    categories {
      name
    }
  }
`;

export default class CategoryScreen extends React.Component {
  render() {
    return (
      <Query query={LOAD_CATEGORIES}>
        {({ loading, error, data }) => {
          if (loading) return "Loading...";
          if (error) return `Error! ${error.message}`;

          const categoriesList = data?.categories || [];

          return (
            <div className="topItems">
              {categoriesList.map((category) => (
                <NavLink
                  activeclassname="active"
                  className="topNav"
                  key={category.name}
                  to={`/category/${category.name}`}
                >
                  {category.name.charAt(0).toUpperCase() +
                    category.name.slice(1)}
                </NavLink>
              ))}
            </div>
          );
        }}
      </Query>
    );
  }
}
