import React, { Component } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router";

import CloseModal from "./CloseModal/CloseModal";
import CloseModalProvider from "./CloseModal/CloseModalContext";
import IntroModal from "./IntroModal/IntroModal";
import Panel from "./Panel/Panel";
import ProgressBar from "./ProgressBar/ProgressBar";
import Viewbox from "./Viewbox/Viewbox";

import "./Player.scss";

class Player extends Component {
  state = {
    currentSlideId: 0,
    disablePrev: true,
    disableNext: false,
    introShown: true,
  };

  nextSlide = () => {
    const slidesNumber = this.props.chosenScript.slides.length;
    const block = this.state.currentSlideId === slidesNumber - 2;

    if (block) {
      this.setState((prev) => ({
        currentSlideId: prev.currentSlideId + 1,
        disableNext: true,
        disablePrev: false,
      }));
    } else {
      this.setState((prev) => ({
        currentSlideId: prev.currentSlideId + 1,
        disablePrev: false,
      }));
    }
  };

  prevSlide = () => {
    const block = this.state.currentSlideId === 1;

    if (block) {
      this.setState((prev) => ({
        currentSlideId: prev.currentSlideId - 1,
        disablePrev: true,
        disableNext: false,
      }));
    } else {
      this.setState((prev) => ({
        currentSlideId: prev.currentSlideId - 1,
        disableNext: false,
      }));
    }
  };

  introHide = () => {
    this.setState({
      introShown: false,
    });
  };

  render() {
    const { currentSlideId, disablePrev, disableNext, introShown } = this.state;
    const { chosenScript } = this.props;

    if (chosenScript === null) {
      return <Redirect to="/user" />;
    }

    const currentSlide = chosenScript.slides[currentSlideId];

    return (
      <CloseModalProvider>
        <main className="player">
          <Viewbox />
          <Panel
            slide={currentSlide}
            prevSlide={this.prevSlide}
            nextSlide={this.nextSlide}
            disablePrev={disablePrev}
            disableNext={disableNext}
          />
          <ProgressBar
            current={currentSlideId}
            total={chosenScript.slides.length}
            intro={introShown}
          />
          <CloseModal />
          <IntroModal
            script={chosenScript}
            introShown={introShown}
            introHide={this.introHide}
          />
        </main>
      </CloseModalProvider>
    );
  }
}

const mapStateToProps = ({ loading, error, chosenScript }) => {
  return { loading, error, chosenScript };
};

export default connect(mapStateToProps)(Player);
