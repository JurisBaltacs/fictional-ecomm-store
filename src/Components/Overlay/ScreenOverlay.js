import React from "react";
import "./ScreenOverlay.css";

export default class ScreenOverlay extends React.Component {
  render() {
    return <div className="screenOverlay" onClick={this.props.onClick}></div>;
  }
}
