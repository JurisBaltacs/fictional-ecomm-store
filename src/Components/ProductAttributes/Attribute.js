import React from "react";
import "./Attribute.css";

class Attribute extends React.Component {
  attributeStyle = () => {
    let selected;
    if (this.props.selected && this.props.isColorAttribute) {
      selected = " selectedColorAttribute";
    } else if (this.props.selected && !this.props.isColorAttribute) {
      selected = " selectedAlphanumeric";
    } else {
      selected = "";
    }
    return selected;
  };

  render() {
    const selected = this.attributeStyle();

    const isCartOverlayItem = this.props.isCartOverlayItem;
    return (
      <div
        onClick={isCartOverlayItem ? () => {} : this.props.onClick}
        className={"AttributeItems" + selected}
        style={{ backgroundColor: this.props.color }}
      >
        {this.props.data}
      </div>
    );
  }
}

export default Attribute;
