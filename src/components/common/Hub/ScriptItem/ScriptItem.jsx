import React from "react";
import { Link } from "react-router-dom";

import sprite from '../../../../assets/img/sprite.svg';

import './ScriptItem.css';

const ScriptItem = props => {
	return (
		<li className="script-item" id={props.id.toString()}>
			<button className="script-item__button" type="button" onClick={props.onClick.bind(null, props.id)}>
				<span>{props.title}</span>
			</button>
			<Link className="script-item__icon-button" to="/player/:id/show" onClick={props.onClick.bind(null, props.id)}>
				<svg width="20" height="20">
					<use href={sprite + "#icon-play"}/>
				</svg>				
			</Link>
			<button className="script-item__icon-button" type="button">
				<svg width="20" height="20">
					<use href={sprite + "#icon-graph-bar"}/>
				</svg>
			</button>	
		</li>
	);
};

export default ScriptItem;

// onClick={() => props.onClick(props.id)}