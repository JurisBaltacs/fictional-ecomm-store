import React from "react";
import { ShopContext } from "../Contexts/ShopContextProvider";

export default class AddToCartButton extends React.PureComponent {
  onButtonClick = () => {
    if (this.props.isInStock && this.props.isEnabled) {
      return this.props.onAddToCartClick();
    } else if (!this.props.isInStock) {
      return alert(
        "This would be an e-mail form. Saying: 'Sign up to get notified when the item is available.' "
      );
    }
  };

  getButtonText = () => {
    if (this.props.isInStock && !this.props.isEnabled) {
      return "Select attribute";
    } else if (this.props.isInStock && this.props.isEnabled) {
      return "ADD TO CART";
    } else {
      return "Out of stock. Sign up for updates.";
    }
  };

  render() {
    const buttonText = this.getButtonText();

    return (
      <button onClick={this.onButtonClick} className="addToCart">
        {buttonText}
      </button>
    );
  }
}

AddToCartButton.contextType = ShopContext;
