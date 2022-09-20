import React from "react";
import { ShopContext } from "../Contexts/ShopContextProvider";

export default class AddToCartDescription extends React.PureComponent {
  render() {
    return (
      <div>
        <button onClick={this.props.onAddToCartClick} className="addToCart">
          ADD TO CART
        </button>
        <div
          dangerouslySetInnerHTML={{
            __html: this.props.description,
          }}
        />
      </div>
    );
  }
}

AddToCartDescription.contextType = ShopContext;
