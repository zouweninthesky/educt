import React from "react";
import { NavLink } from "react-router-dom";

import MainLogo from '../../../assets/img/content/main-logo.svg';

import sprite from '../../../assets/img/sprite.svg';

import './Header.css';

const Header = () => {
	return (
		<header className="hub-header container">
			<a href="/" className="hub-header__logo">
				<img src={MainLogo} alt="Главный логотип eDuct"/>
				<span className="visually-hidden">educt</span>
			</a>
			<div className="hub-header__tab-wrapper">
				<NavLink to="/user" className="hub-header__tab button" activeClassName="hub-header__tab--active">
					<svg width="22" height="22">
						<use href={sprite + "#icon-apps"}/>
					</svg>
					Сценарии
				</NavLink>
				<NavLink to="/author" className="hub-header__tab button" activeClassName="hub-header__tab--active">
					<svg width="22" height="22">
						<use href={sprite + "#icon-puzzle-piece"}/>
					</svg>
					Конструктор
				</NavLink>
			</div>
			<a href="/" className="hub-header__profile-link">
				{/* <img src="#" width="46" height="46" alt="Изображение пользователя"></img> */}
				<span className="visually-hidden">Пользователь</span>
			</a>
		</header>
	);
};

export default Header;