import React from "react";
import "./Slider.css";
import LeftArrow from "../../Assets/LeftArrow";
import RightArrow from "../../Assets/RightArrow";

const slideStyles = {
  width: "200px",
  height: "288px",
  backgroundSize: "contain",
  // backgroundPosition: "center",
  backgroundRepeat: "no-repeat",
};

class Slider extends React.Component {
  constructor(props) {
    super(props);
    this.state = { currentIndex: 0 };
  }

  goToPrevious = () => {
    const { slides } = this.props;
    const isFirstSlide = this.state.currentIndex === 0;
    const newIndex = isFirstSlide
      ? slides.length - 1
      : this.state.currentIndex - 1;
    this.setState({ currentIndex: newIndex });
  };
  goToNext = () => {
    const { slides } = this.props;
    const isLastSlide = this.state.currentIndex === slides.length - 1;
    const newIndex = isLastSlide ? 0 : this.state.currentIndex + 1;
    this.setState({ currentIndex: newIndex });
  };

  render() {
    const { slides } = this.props;
    const goToPrevious = this.goToPrevious;
    const goToNext = this.goToNext;

    const stockStatus = this.props.stockStatus;

    const slideStylesWidthBackground = {
      ...slideStyles,
      backgroundImage: `url(${slides[this.state.currentIndex]})`,
      opacity: stockStatus ? 1 : 0.5,
    };

    return (
      <div className="sliderStyles">
        {slides.length > 1 ? (
          <div>
            <div onClick={goToPrevious} className="leftArrowStyles">
              <LeftArrow />
            </div>
            <div onClick={goToNext} className="rightArrowStyles">
              <RightArrow />
            </div>
          </div>
        ) : null}

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
