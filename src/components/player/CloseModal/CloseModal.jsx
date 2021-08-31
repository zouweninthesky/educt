import React from 'react';
import { Link } from "react-router-dom";

import sprite from '../../../assets/img/sprite.svg';
import { useCloseModal } from './CloseModalContext';

import './CloseModal.scss';

const CloseModal = () => {
	const [closeModal, toggle] = useCloseModal();

	if (!closeModal) {
		return <></>
	}

	return (
		<>
			<div className="modal-close">
				<div className="modal-close__icon-wrapper">
					<svg width="64" height="64">
						<use href={sprite + "#icon-warning"}></use>
					</svg>
				</div>
				<h2 className="modal-close__header">Закрыть сценарий</h2>
				<p className="modal-close__warning-message">Прогресс выполнения не будет сохранен</p>
				<Link to="/user" className="button modal-close__button-close">Закрыть</Link> 
				<button className="button modal-close__button-cancel" type="button" onClick={() => toggle()}>Отмена</button>
			</div>
			<div className="overlay"></div>
		</>
		
	);
};
 
export default CloseModal;