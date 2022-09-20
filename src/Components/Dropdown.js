import React from "react";
import { currencyArray, ShopContext } from "../Contexts/ShopContextProvider";

export default class Dropdown extends React.Component {
  render() {
    return (
      <div>
        <select
          name="selectList"
          id="selectList"
          value={this.context.selectedCurrency}
          onChange={(e) => this.context.selectCurrency(e.target.value)}
        >
          {currencyArray.map((currencyOption, index) => (
            <option key={index} value={currencyOption.code}>
              {currencyOption.label}
            </option>
          ))}
        </select>
      </div>
    );
  }
}

Dropdown.contextType = ShopContext;
