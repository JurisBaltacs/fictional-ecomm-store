import React from "react";
import "./DropdownCustom.css";
import { currencyArray, ShopContext } from "../Contexts/ShopContextProvider";
import VectorUp from "../Assets/VectorUp";
import VectorDown from "../Assets/VectorDown";
import ScreenOverlay from "../Components/Overlay/ScreenOverlay";

export default class DropdownCustom extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      selection: [],
    };
  }
  toggle() {
    this.setState((prevState) => {
      return {
        ...prevState,
        open: !prevState.open,
      };
    });
  }

  handleOnClick(item) {
    if (!this.state.selection.some((current) => current.code === item.code)) {
      this.context.selectCurrency(item.code);
      this.toggle(!this.open);
    }
  }

  findCurrencyLabel = () => {
    let selectedCurrencyLabel = "";
    const selectedCurrency = currencyArray.find(
      (currencyOption) => currencyOption.code === this.context.selectedCurrency
    );
    selectedCurrencyLabel = selectedCurrency.label;
    return { selectedCurrencyLabel };
  };

  render() {
    const { selectedCurrencyLabel } = this.findCurrencyLabel();
    return (
      <>
        {this.state.open ? (
          <ScreenOverlay
            transparent={true}
            onClick={() => this.toggle(false)}
          />
        ) : null}
        <div className="dropdownWrapper">
          <div
            role="button"
            onClick={() => {
              this.toggle(!this.open);
            }}
          >
            <div>
              {this.state.open ? (
                <div className="dropdownCurrency">
                  {selectedCurrencyLabel[0]} &nbsp; <VectorDown />
                </div>
              ) : (
                <div className="dropdownCurrency">
                  {selectedCurrencyLabel[0]} &nbsp; <VectorUp />
                </div>
              )}
            </div>
          </div>
          {this.state.open && (
            <ul className="dropdownList">
              {currencyArray.map((item) => (
                <li id="dropdownLi" key={item.id}>
                  <button
                    className="currencySelector"
                    onClick={() => this.handleOnClick(item)}
                  >
                    <span className="currencyLabel">{item.label}</span>
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
      </>
    );
  }
}

DropdownCustom.contextType = ShopContext;
