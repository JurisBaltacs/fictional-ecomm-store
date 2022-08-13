import React from "react";
import { useQuery, gql } from "@apollo/client";
import {
  useParams,
  BrowserRouter as Router,
  Routes,
  Route,
  NavLink,
} from "react-router-dom";
import ProductItem from "./ProductItem";
import "./CategoryView.css";

const CategoryView = () => {
  const urlParams = useParams();
  const categoryName = urlParams?.categoryName || "all";

  const { data } = useQuery(gql`
  {
    category(input: { title: "${categoryName}"}) {
      products {
        id
        name
        gallery
        prices {
          amount
          currency {
            symbol
            label
          }
        }
      }
    }
  }
`);

  const products = data?.category?.products || [];

  // console.log("Category view data: ", data);

  return (
    <div>
      <div className="categoryName">
        {categoryName.charAt(0).toUpperCase() + categoryName.slice(1)}
      </div>
      <div className="content">
        {products.map((item, index) => (
          <NavLink key={index} to={`/category/${categoryName}/${item.id}`}>
            <div>
              <ProductItem data={item} key={item.id} />
            </div>
          </NavLink>
        ))}
      </div>
      {/* <Routes>
        <Route
          path="/category/:categoryName/:id"
          element={<ProductItem />}
        ></Route>
      </Routes> */}
    </div>
  );
};

export default CategoryView;
