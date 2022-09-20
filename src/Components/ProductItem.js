import React from "react";
import "./ProductItem.css";
import { ShopContext } from "../Contexts/ShopContextProvider";

class ProductItem extends React.Component {
  render() {
    const { data } = this.props;

    const selectedCurrency = this.context.selectedCurrency.toUpperCase();
    const price = data.prices.find(
      (price) => price.currency.label === selectedCurrency
    );
    const priceAmount = price?.amount;
    const priceSymbol = price.currency.symbol;

    return (
      <div className="productWrapper">
        <div className="product">
          <img
            style={{
              opacity: data.inStock ? 1 : 0.5,
            }}
            src={data.gallery}
          ></img>
          <div
            style={{
              opacity: data.inStock ? 0 : 1,
            }}
            className="outOfStock"
          >
            Out of stock
          </div>
        </div>

        <div className="productTitle">{data.name}</div>
        <div className="priceStyle">
          {priceSymbol}
          {priceAmount}
        </div>
      </div>
    );
  }
}
ProductItem.contextType = ShopContext;
export default ProductItem;
