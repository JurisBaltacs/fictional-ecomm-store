import React from "react";
import "./Attribute.css";

class Attribute extends React.Component {
  render() {
    const selected = this.props.selected ? " selected" : "";

    return (
      <div
        onClick={this.props.onClick}
        className={"AttributeItems" + selected}
        style={{ backgroundColor: this.props.color }}
      >
        {this.props.data}
      </div>
    );
  }
}

export default Attribute;
