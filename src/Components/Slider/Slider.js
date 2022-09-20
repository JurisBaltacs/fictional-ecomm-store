import React from "react";
import "./Slider.css";

const slideStyles = {
  width: "200px",
  height: "288px",
  backgroundSize: "contain",
  backgroundPosition: "center",
  backgroundRepeat: "no-repeat",
};

class Slider extends React.Component {
  constructor(props) {
    super(props);
    this.state = { currentIndex: 0 };
  }
  render() {
    const { slides } = this.props;
    const goToPrevious = () => {
      const isFirstSlide = this.state.currentIndex === 0;
      const newIndex = isFirstSlide
        ? slides.length - 1
        : this.state.currentIndex - 1;
      this.setState({ currentIndex: newIndex });
    };
    const goToNext = () => {
      const isLastSlide = this.state.currentIndex === slides.length - 1;
      const newIndex = isLastSlide ? 0 : this.state.currentIndex + 1;
      this.setState({ currentIndex: newIndex });
    };

    const stockStatus = this.props.stockStatus;

    const slideStylesWidthBackground = {
      ...slideStyles,
      backgroundImage: `url(${slides[this.state.currentIndex]})`,
      opacity: stockStatus ? 1 : 0.5,
    };
    return (
      <div className="sliderStyles">
        <div>
          <div onClick={goToPrevious} className="leftArrowStyles">
            ❰
          </div>
          <div onClick={goToNext} className="rightArrowStyles">
            ❱
          </div>
        </div>
        <div
          style={{
            opacity: stockStatus ? 0 : 1,
          }}
          className="outOfStock"
        >
          Out of stock
        </div>
        <div style={slideStylesWidthBackground}></div>
      </div>
    );
  }
}

export default Slider;
