import React from "react";
import "./ProductItem.css";

const ProductItem = (props) => {
  const { data } = props;

  const selectedCurrency = "USD";
  const price = data.prices.find(
    (price) => price.currency.label === selectedCurrency
  );
  const priceAmount = price?.amount;

  return (
    <div>
      <div className="product">
        <img src={data.gallery}></img>
      </div>
      {data.name}
      <div>
        {priceAmount}
        {price.currency.symbol}
      </div>
    </div>
  );
};

export default ProductItem;
