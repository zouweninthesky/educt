import React from "react";

import "./Viewbox.scss";

const Viewbox = ({ mod }) => {
  const mainClass = mod ? `viewbox viewbox--${mod}` : "viewbox";

  return (
    <section className={mainClass}>
      <h2 className="visually-hidden">Текущий слайд</h2>
      <div className="viewbox__wrapper">
        <img className="viewbox__image" alt="Текущий слайд" />
      </div>
    </section>
  );
};

export default Viewbox;
