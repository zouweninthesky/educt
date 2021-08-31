import React, { useState } from "react";
import { Link } from "react-router-dom";

import sprite from '../../../assets/img/sprite.svg';

import './IntroModal.scss';

const IntroModal = ({script}) => {
	const [intro, setIntro] = useState(true);

	const hideIntro = () => {
		setIntro(false);
	};

	if (!intro) {
		return <></>
	}

	return (
		<>
			<div className="modal-intro">
				<h2 className="modal-intro__title">{script.title}</h2>
				<p className="modal-intro__info">5 слайдов/1 минута</p>
				<div className="modal-intro__button-wrapper">
					<button className="modal-intro__button" onClick={hideIntro}>
						<svg width="40" height="40">
							<use href={sprite + "#icon-play"}></use>
						</svg>
					</button>
					<button className="modal-intro__button">
						<svg width="40" height="40">
							<use href={sprite + "#icon-graph-bar"}></use>
						</svg>
					</button>
					<Link to="/user" className="modal-intro__button">
						<svg width="40" height="40">
							<use href={sprite + "#icon-arrow-left"}></use>
						</svg>
					</Link>
				</div>
				<button className="modal-intro__download-button" type="button">Скачать сценарий в PDF</button>
			</div>
			<div className="overlay"></div>
		</>
	);
};

export default IntroModal;