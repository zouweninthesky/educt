import React from "react";

import TempSlide from "../../../static/img/test/test.jpg";
import Icon from "../Icon/Icon";
import "./Viewbox.scss";

const Viewbox = ({ mod }) => {
  const mainClass = mod ? `viewbox viewbox--${mod}` : "viewbox";

  return (
    <section className={mainClass}>
      <h2 className="visually-hidden">Текущий слайд</h2>
      <div className="viewbox__wrapper">
        <img className="viewbox__image" alt="Текущий слайд" src={TempSlide} />
        <div className="viewbox__field-wrapper">
          <button className="viewbox__field" type="button"></button>
          <span className="viewbox__field-type">
            <Icon id="mouse-left" width="42" height="42" />
          </span>
        </div>
        <div className="viewbox__mask">
          <button
            type="button"
            className="viewbox__mask-remove button button--icon-only"
          >
            <Icon id="cancel" width="22" />
          </button>
        </div>
      </div>
    </section>
  );
};

export default Viewbox;