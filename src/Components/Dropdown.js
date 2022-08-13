import React, { useState } from "react";

const Dropdown = () => {
  const [selected, setSelected] = useState("");

  const currencyArray = ["$ USD", "£ GBP", "A$ AUD", "¥ JPY", "₽ RUB"];

  const handleChange = (e) => {
    setSelected(e.target.value);
  };

  return (
    <select name="selectList" id="selectList" onChange={handleChange}>
      {currencyArray.map((currency, index) => (
        <option key={index} value={currency}>
          {currency}
        </option>
      ))}
    </select>
  );
};

export default Dropdown;
