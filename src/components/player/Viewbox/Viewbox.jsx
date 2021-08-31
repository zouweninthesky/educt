import React from "react";

import './Viewbox.css';

const Viewbox = () => {
	return (
		<section className="viewbox">
			<h2 className="visually-hidden">Текущий слайд</h2>
			<div className="viewbox__wrapper">
				<img className="viewbox__image" alt="Текущий слайд"/>
			</div>
		</section>
	)
};

export default Viewbox;