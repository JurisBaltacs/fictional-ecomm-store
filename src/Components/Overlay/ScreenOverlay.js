import React from "react";
import "./ScreenOverlay.css";

export default class ScreenOverlay extends React.Component {
  render() {
    return (
      <div
        className="screenOverlay"
        onClick={this.props.onClick}
        style={{
          backgroundColor: this.props.transparent ? "transparent" : "#393748",
        }}
      ></div>
    );
  }
}
