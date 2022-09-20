import React from "react";
import { NavLink } from "react-router-dom";
import { ShopContext } from "../../Contexts/ShopContextProvider";
import "./CartOverlay.css";
import ShoppingCart from "../../Screens/ShoppingCartScreen";

export default class CartOverlay extends React.Component {
  render() {
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

    return (
      <div>
        <div className="overlayWrapper" onClick={this.props.onClick}>
          <div className="overlayTitleWrapper">
            <div className="overlayTitle">My bag,</div>&nbsp;
            <div>{this.context.cartItems.length} items</div>
          </div>
          <div className="overlayContent">
            <ShoppingCart hideCartElement={true} />
          </div>
          <div className="overlayTotalWrapper">
            <div>Total:</div>
            <div>
              {priceSymbol}&nbsp;{totalPrice.toFixed(2)}
            </div>
          </div>
          <div className="bottomButtonWrapper">
            <NavLink to="/shoppingcart">
              <button className="viewBag">VIEW BAG</button>
            </NavLink>
            <div>
              <button className="checkOut">CHECK OUT</button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

CartOverlay.contextType = ShopContext;
