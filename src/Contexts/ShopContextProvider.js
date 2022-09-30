import React from "react";

export const currencyArray = [
  { code: "usd", label: "$ USD" },
  { code: "gbp", label: "£ GBP" },
  { code: "aud", label: "A$ AUD" },
  { code: "jpy", label: "¥ JPY" },
  { code: "rub", label: "₽ RUB" },
];

export const ShopContext = React.createContext();

export default class ShopContextProvider extends React.Component {
  state = {
    selectedCurrency: "usd",
    cartItems: [],
  };

  componentDidMount() {
    const currencyFromLocalStorage = localStorage.getItem("currency") || "usd";
    this.setState({ selectedCurrency: currencyFromLocalStorage });

    const cartItemsFromLocalStorage = localStorage.getItem("cartItems");
    if (cartItemsFromLocalStorage) {
      try {
        const parsedCartItems = JSON.parse(cartItemsFromLocalStorage);
        this.setState({ cartItems: parsedCartItems });
      } catch (error) {
        console.log("error: ", error);
      }
    }
  }

  addItemToCart = (item) => {
    const updatedCartItems = [...this.state.cartItems, item];
    try {
      localStorage.setItem("cartItems", JSON.stringify(updatedCartItems));
    } catch (error) {
      console.log("error: ", error);
    }
    this.setState({ cartItems: updatedCartItems });
  };

  removeItemFromCart = (productId) => {
    const updatedCartItems = this.state.cartItems.filter(
      (item) => item.id !== productId
    );
    this.setState({ cartItems: updatedCartItems });
  };

  updateCartItem = (updatedData) => {
    const updatedCartItems = this.state.cartItems.map((item) => {
      if (item.id === updatedData.id) {
        return updatedData;
      }
      return item;
    });
    try {
      localStorage.setItem("cartItems", JSON.stringify(updatedCartItems));
    } catch (error) {
      console.log("error: ", error);
    }
    this.setState({ cartItems: updatedCartItems });
  };

  selectCurrency = (selectedCurrency) => {
    try {
      localStorage.setItem("currency", selectedCurrency);
    } catch (error) {
      console.log("error: ", error);
    }

    this.setState({ selectedCurrency });
  };

  render() {
    const contextValue = {
      ...this.state,
      addItemToCart: this.addItemToCart,
      removeItemFromCart: this.removeItemFromCart,
      updateCartItem: this.updateCartItem,
      selectCurrency: this.selectCurrency,
    };

    return (
      <ShopContext.Provider value={contextValue}>
        {this.props.children}
      </ShopContext.Provider>
    );
  }
}
