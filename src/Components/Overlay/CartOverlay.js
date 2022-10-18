import React from "react";
import { NavLink } from "react-router-dom";
import { ShopContext } from "../../Contexts/ShopContextProvider";
import "./CartOverlay.css";
import ShoppingCart from "../../Screens/ShoppingCartScreen";

export default class CartOverlay extends React.Component {
  findPrice = () => {
    let cartItems = this.context.cartItems;
    let totalPrice = 0;
    let priceSymbol = null;

    cartItems.forEach((item) => {
      const priceAmount = item.prices.find(
        (price) =>
          price.currency.label === this.context.selectedCurrency.toUpperCase()
      );
      totalPrice = totalPrice + priceAmount.amount * item.quantity;
      priceSymbol = priceAmount.currency.symbol;
    });

    return { totalPrice, priceSymbol };
  };

  findQuantity = () => {
    let cartItems = this.context.cartItems;
    let totalQuantity = 0;

    cartItems.forEach((item) => {
      totalQuantity = totalQuantity + item.quantity;
    });
    return { totalQuantity };
  };

  render() {
    const { totalPrice, priceSymbol } = this.findPrice();
    const { totalQuantity } = this.findQuantity();

    return (
      <div className="overlayWrapper">
        <div className="overlayTitleWrapper">
          <div className="overlayTitle">My bag,</div>&nbsp;
          <div>{totalQuantity} items</div>
        </div>
        <div className="overlayContent">
          <ShoppingCart isCartOverlayItem={true} />
        </div>
        <div className="overlayTotalWrapper">
          <div>Total:</div>
          <div>
            {priceSymbol}&nbsp;{totalPrice.toFixed(2)}
          </div>
        </div>
        <div className="bottomButtonWrapper">
          <NavLink to="/shoppingcart">
            <button
              className="viewBag"
              onClick={this.props.onViewBagButtonClick}
            >
              VIEW BAG
            </button>
          </NavLink>
          <div>
            <button className="checkOut">CHECK OUT</button>
          </div>
        </div>
      </div>
    );
  }
}

CartOverlay.contextType = ShopContext;
