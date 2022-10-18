import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import CategoryView from "../Components/CategoryItems";
import "./RouterComponent.css";
import ProductDetails from "../Screens/ProductDetailsScreen";
import DropdownCustom from "../Components/DropdownCustom";
import ShoppingCart from "../Screens/ShoppingCartScreen";
import Logo from "../Assets/a-logo";
import EmptyCart from "../Assets/EmptyCart";
import ScreenOverlay from "../Components/Overlay/ScreenOverlay";
import CartOverlay from "../Components/Overlay/CartOverlay";
import CategoryNavigation from "../Screens/CategoryScreen";
import { ShopContext } from "../Contexts/ShopContextProvider";

class RouterComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = { show: false };
  }

  findQuantity = () => {
    let cartItems = this.context.cartItems;
    let totalQuantity = 0;

    cartItems.forEach((item) => {
      totalQuantity = totalQuantity + item.quantity;
    });
    return { totalQuantity };
  };

  render() {
    const { totalQuantity } = this.findQuantity();
    return (
      <div className="topLevel">
        <Router>
          {this.state.show ? (
            <div>
              <ScreenOverlay onClick={() => this.setState({ show: false })} />
              <CartOverlay
                onViewBagButtonClick={() => this.setState({ show: false })}
              />
            </div>
          ) : null}

          <div className="topNavContainer">
            <CategoryNavigation />
            <div className="logo">
              <Logo />
            </div>

            <div className="topItems">
              <div className="wrapper">
                <DropdownCustom />
                <button
                  className="topNavCart"
                  onClick={() => this.setState({ show: true })}
                >
                  <EmptyCart />
                  <div className="topNavCartCircle"> {totalQuantity}</div>
                </button>
              </div>
            </div>
          </div>
          <Routes>
            <Route path="/" element={<CategoryView />}></Route>
            <Route
              path="/category/:categoryName/"
              element={<CategoryView />}
            ></Route>
            <Route
              path="/category/:categoryName/:id"
              element={<ProductDetails />}
            ></Route>
            <Route path="/shoppingcart" element={<ShoppingCart />}></Route>
          </Routes>
        </Router>
      </div>
    );
  }
}
RouterComponent.contextType = ShopContext;
export default RouterComponent;
