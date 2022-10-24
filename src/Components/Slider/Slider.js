import React from "react";
import LeftArrow from "../../Assets/LeftArrow";
import RightArrow from "../../Assets/RightArrow";
import "./Slider.css";

class ImageSlider extends React.Component {
  constructor(props) {
    super(props);
    this.state = { currentIndex: 0 };
  }

  goToNext = () => {
    const { slides } = this.props;
    const isLastSlide = this.state.currentIndex === slides.length - 1;
    const newIndex = isLastSlide ? 0 : this.state.currentIndex + 1;
    this.setState({ currentIndex: newIndex });
  };

  goToPrevious = () => {
    const { slides } = this.props;
    const isFirstSlide = this.state.currentIndex === 0;
    const newIndex = isFirstSlide
      ? slides.length - 1
      : this.state.currentIndex - 1;
    this.setState({ currentIndex: newIndex });
  };

  render() {
    const { slides } = this.props;

    const goToPrevious = this.goToPrevious;
    const goToNext = this.goToNext;

    return (
      <div className="sliderStyles">
        {slides.length > 1 ? (
          <div className="arrows">
            <div onClick={goToPrevious}>
              <LeftArrow />
            </div>
            <div onClick={goToNext}>
              <RightArrow />
            </div>
          </div>
        ) : null}
        {slides.map((slide, index) => {
          return (
            <div key={index}>
              {index === this.state.currentIndex && (
                <img src={slide} className="image" />
              )}
            </div>
          );
        })}
      </div>
    );
  }
}

export default ImageSlider;
