import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import CategoryView from "../Components/CategoryItems";
import "./RouterComponent.css";
import ProductDetails from "../Screens/ProductDetailsScreen";
import Dropdown from "../Components/Dropdown";
import ShoppingCart from "../Screens/ShoppingCartScreen";
import Logo from "../Assets/a-logo.png";
import Cart from "../Assets/empty-cart.png";
import ScreenOverlay from "../Components/Overlay/ScreenOverlay";
import CartOverlay from "../Components/Overlay/CartOverlay";
import CategoryNavigation from "../Screens/CategoryScreen";
import { ShopContext } from "../Contexts/ShopContextProvider";

class RouterComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = { show: false };
  }
  render() {
    return (
      <div className="topLevel">
        <Router>
          {this.state.show ? (
            <div>
              <ScreenOverlay onClick={() => this.setState({ show: false })} />
              <CartOverlay />
            </div>
          ) : null}

          <div className="topNavContainer">
            <CategoryNavigation />
            <div className="topItems">
              <img className="logo" src={Logo} />
            </div>
            <div className="topItems">
              <div className="wrapper">
                <Dropdown />
                <button
                  className="topNavCart"
                  onClick={() => this.setState({ show: true })}
                >
                  <img src={Cart} />
                  <div className="topNavCartCircle">
                    {this.context.cartItems.length}
                  </div>
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
