import React from "react";
import { ShopContext } from "../Contexts/ShopContextProvider";
import Attribute from "../Components/ProductAttributes/Attribute.js";
import "./ShoppingCartScreen.css";
import Slider from "../Components/Slider/Slider.js";

class ShoppingCartScreen extends React.Component {
  findQuantityPrice = () => {
    let cartItems = this.context.cartItems;
    let totalQuantity = 0;
    let totalPrice = 0;
    let priceSymbol = null;

    cartItems.forEach((item) => {
      totalQuantity = totalQuantity + item.quantity;
      const priceAmount = item.prices.find(
        (price) =>
          price.currency.label === this.context.selectedCurrency.toUpperCase()
      );
      totalPrice = totalPrice + priceAmount.amount * item.quantity;
      priceSymbol = priceAmount.currency.symbol;
    });

    return { totalPrice, priceSymbol, totalQuantity, cartItems };
  };

  render() {
    const { totalPrice, priceSymbol, totalQuantity, cartItems } =
      this.findQuantityPrice();

    return (
      <div>
        {!this.props.isCartOverlayItem ? <h1>CART</h1> : null}

        <div>
          {cartItems.map((item, index) => {
            const pricesArray = item.prices || [];

            const price = pricesArray.find(
              (price) =>
                price.currency.label ===
                this.context.selectedCurrency.toUpperCase()
            );

            const cartAttributesSorted = [...item.attributes];
            cartAttributesSorted.sort((a, b) => (a.id < b.id ? -1 : 1));

            return (
              <div className="shoppingCartItem" key={item.id}>
                <div className="shoppingCartContent" key={index}>
                  <div className="shoppingCartBrand">{item.brand}</div>
                  <div className="shoppingCartName">{item.name}</div>
                  <div className="shoppingCartPrice">
                    {price?.currency.symbol} &nbsp;
                    {price?.amount}
                  </div>

                  {cartAttributesSorted.map((attribute, index) => {
                    if (attribute.id === "Size") {
                      return (
                        <div key={index}>
                          <div className="shoppingCartTitles">Size:</div>
                          <div
                            key={attribute.id}
                            className="shoppingAttributeCartItemsWrapper"
                          >
                            {attribute.items.map((attributeItem) => (
                              <Attribute
                                isCartOverlayItem={this.props.isCartOverlayItem}
                                key={attributeItem.value}
                                data={attributeItem.value}
                                selected={
                                  attributeItem.value === item.selectedSize
                                }
                                onClick={() =>
                                  this.context.updateCartItem({
                                    ...item,
                                    selectedSize: attributeItem.value,
                                  })
                                }
                              />
                            ))}
                          </div>
                        </div>
                      );
                    }

                    if (attribute.id === "Color") {
                      return (
                        <div key={index}>
                          <div className="shoppingCartTitles">Color:</div>
                          <div
                            key={attribute.id}
                            className="shoppingAttributeCartItemsWrapper"
                          >
                            {attribute.items.map((attributeItem) => (
                              <Attribute
                                isColorAttribute={true}
                                isCartOverlayItem={this.props.isCartOverlayItem}
                                key={attributeItem.value}
                                color={attributeItem.value}
                                selected={
                                  attributeItem.value === item.selectedColor
                                }
                                onClick={() =>
                                  this.context.updateCartItem({
                                    ...item,
                                    selectedColor: attributeItem.value,
                                  })
                                }
                              />
                            ))}
                          </div>
                        </div>
                      );
                    }

                    if (attribute.id === "Capacity") {
                      return (
                        <div key={index}>
                          <div className="shoppingCartTitles">Capacity:</div>
                          <div
                            key={attribute.id}
                            className="shoppingAttributeCartItemsWrapper"
                          >
                            {attribute.items.map((attributeItem) => (
                              <Attribute
                                isCartOverlayItem={this.props.isCartOverlayItem}
                                key={attributeItem.value}
                                data={attributeItem.value}
                                selected={
                                  attributeItem.value === item.selectedCapacity
                                }
                                onClick={() =>
                                  this.context.updateCartItem({
                                    ...item,
                                    selectedCapacity: attributeItem.value,
                                  })
                                }
                              />
                            ))}
                          </div>
                        </div>
                      );
                    }
                  })}
                </div>
                <div className="shoppingCartQuantityWrapper">
                  <div className="shoppingCartQuantity">
                    <button
                      onClick={() =>
                        this.context.updateCartItem({
                          ...item,
                          quantity: item.quantity + 1,
                        })
                      }
                      className="shoppingCartQuantityBox"
                    >
                      +
                    </button>
                    <div>{item.quantity}</div>
                    <button
                      onClick={() => {
                        if (item.quantity <= 1) {
                          this.context.removeItemFromCart(item.id);
                        } else {
                          this.context.updateCartItem({
                            ...item,
                            quantity: item.quantity - 1,
                          });
                        }
                      }}
                      className="shoppingCartQuantityBox"
                    >
                      -
                    </button>
                  </div>
                </div>
                <Slider
                  slides={item.gallery}
                />
              </div>
            );
          })}
        </div>
        {!this.props.isCartOverlayItem ? (
          <div className="grid-container">
            <div>Tax 21%:</div>
            <div className="shoppingCartTotals">
              {priceSymbol} {(totalPrice * 0.21).toFixed(2)}
            </div>
            <div>Quantity:</div>
            <div className="shoppingCartTotals">{totalQuantity}</div>
            <div>Total:</div>
            <div className="shoppingCartTotals">
              {priceSymbol}&nbsp;
              {totalPrice.toFixed(2)}
            </div>
          </div>
        ) : null}
        {!this.props.isCartOverlayItem ? (
          <button className="order">ORDER</button>
        ) : null}
      </div>
    );
  }
}

ShoppingCartScreen.contextType = ShopContext;
export default ShoppingCartScreen;
