import React from "react";
import { NavLink } from "react-router-dom";
import { Query } from "@apollo/client/react/components";
import ProductItem from "./ProductItem";
import "./CategoryItems.css";
import withRouter from "../Utils/withRouter.js";
import { CATEGORY_DATA } from "../GraphQL/CategoryDataQuery.js";

class CategoryItems extends React.Component {
  render() {
    const urlParams = this.props.router.params;
    const categoryName = urlParams?.categoryName || "all";

    return (
      <Query query={CATEGORY_DATA} variables={{ categoryName }}>
        {({ loading, error, data }) => {
          if (loading) return "Loading...";
          if (error) return `Error! ${error.message}`;

          const products = data?.category?.products || [];

          return (
            <div>
              <div>
                <div className="categoryName">
                  {categoryName.charAt(0).toUpperCase() + categoryName.slice(1)}
                </div>
                <div className="content">
                  {products.map((item, index) => (
                    <NavLink
                      key={index}
                      to={`/category/${categoryName}/${item.id}`}
                    >
                      <div>
                        <ProductItem data={item} key={item.id} />
                      </div>
                    </NavLink>
                  ))}
                </div>
              </div>
            </div>
          );
        }}
      </Query>
    );
  }
}

export default withRouter(CategoryItems);
