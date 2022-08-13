import React from "react";
import { useQuery, gql } from "@apollo/client";
import { useParams } from "react-router-dom";
import "./ProductDetails.css";

const ProductDetails = () => {
  const urlProductId = useParams();
  const productId = urlProductId.id;

  const { data } = useQuery(gql`
    {
      product(id: "${productId}") {
        name
        description
        brand
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
  `);

  const productDetails = data?.product || [];
  const imageGallery = productDetails?.gallery || [];

  // console.log("productDetails.prices: ", productDetails.prices);
  // console.log("productDetails: ", productDetails.prices[0].currency.symbol);

  // const selectedCurrency = "USD";
  // const price = productDetails.prices.find(
  //   (price) => price.currency.label === selectedCurrency
  // );
  // const priceAmount = price?.amount;

  <div>test</div>;

  return (
    <div className="productDetailWrapper">
      <div className="productDetailImagecontainer">
        {imageGallery.map((image, index) => (
          <img className="productDetailImages" key={index} src={image}></img>
        ))}
      </div>
      <div>
        <img src={imageGallery[0]}></img>
      </div>
      <div>
        <h1>{productDetails.brand}</h1>
        <h2>{productDetails.name}</h2>
        <h3>SIZE:</h3>
        <h3>COLOR</h3>
        <h3>PRICE</h3>
        <div>
          {/* {productDetails.prices[0].currency.symbol} */}
          {/* {priceAmount} */}
        </div>
        <button className="addToCart">
          ADD TO CART
        </button>
        <div dangerouslySetInnerHTML={{ __html: productDetails.description }} />
      </div>
    </div>
  );
};

export default ProductDetails;
