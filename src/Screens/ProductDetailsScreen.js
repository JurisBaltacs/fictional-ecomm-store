import { Query } from "@apollo/client/react/components";
import React from "react";
import { ShopContext } from "../Contexts/ShopContextProvider";
import { PRODUCT_DATA_QUERY } from "../GraphQL/ProductDetailsQuery.js";
import withRouter from "../Utils/withRouter.js";
import ProductDataComponent from "../Components/ProductDataComponent";
import "../Components/ProductDataComponent.css";

class ProductDetailsScreen extends React.Component {
  render() {
    const urlProductId = this.props.router.params;
    const productId = urlProductId.id;
    return (
      <Query query={PRODUCT_DATA_QUERY} variables={{ productId }}>
        {({ loading, error, data }) => {
          if (loading) return "Loading...";
          if (error) return `Error! ${error.message}`;

          if (!data?.product) return null;

          return (
            <div>
              <ProductDataComponent data={data.product} />
            </div>
          );
        }}
      </Query>
    );
  }
}
ProductDetailsScreen.contextType = ShopContext;
export default withRouter(ProductDetailsScreen);
