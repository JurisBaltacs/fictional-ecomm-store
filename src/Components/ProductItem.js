import React from "react";
import "./ProductItem.css";
import { ShopContext } from "../Contexts/ShopContextProvider";
import CartCircle from "../Assets/CartCircle";

class ProductItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      color: null,
      size: null,
      capacity: null,
    };
  }
  findProductPrice = () => {
    const { data } = this.props;

    const selectedCurrency = this.context.selectedCurrency.toUpperCase();
    const price = data.prices.find(
      (price) => price.currency.label === selectedCurrency
    );
    const priceAmount = price?.amount;
    const priceSymbol = price.currency.symbol;

    return { priceAmount, priceSymbol };
  };

  addToCart = (e) => {
    e.preventDefault();
    const { data } = this.props;
    const itemInCart = this.context.cartItems.find(
      (item) => item.id === data.id
    );
    if (!itemInCart) {
      this.context.addItemToCart({
        ...data,
        quantity: 1,
        selectedColor: this.state.color,
        selectedSize: this.state.size,
        selectedCapacity: this.state.capacity,
      });
    } else {
      this.context.updateCartItem({
        ...itemInCart,
        quantity: itemInCart.quantity + 1,
      });
    }

    return { itemInCart };
  };

  render() {
    const { data } = this.props;
    const { priceAmount, priceSymbol } = this.findProductPrice();
    const isValidToAddToCart =
      data.inStock === true && data.attributes.length === 0;

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
        <div className="cartCircle">
          {isValidToAddToCart ? (
            <CartCircle onCartCircleClick={this.addToCart} />
          ) : (
            <div className="itemNotValid">
              <CartCircle />
            </div>
          )}
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
