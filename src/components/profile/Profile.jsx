import React from "react";
import "./Profile.scss";

import Header from "../common/Header/Header";
import Icon from "../common/Icon/Icon";
import Store from "../../store";

const Profile = () => {
  Store.loadingFinished();

  return (
    <>
      <Header />
      <main className="profile">
        <div className="container profile__container">
          <div className="profile__header-wrapper">
            <button
              type="button"
              className="button button--icon-only button--simple profile__back-button"
            >
              <Icon id="angle-left" width="24" />
            </button>
            <h2 className="profile__header">Настройки профиля</h2>
          </div>
          <section className="profile__section">
            <h3 className="profile__section-header">Личные данные</h3>
            <div className="profile__section-row">
              <button type="button" className="profile__image-button">
                <img src="" alt="" />
              </button>

              <div className="profile__input">
                <label htmlFor="profile-first-name">Имя</label>
                <input type="text" id="profile-first-name" placeholder="Иван" />
              </div>
              <div className="profile__input">
                <label htmlFor="profile-second-name">Фамилия</label>
                <input
                  type="text"
                  id="profile-second-name"
                  placeholder="Эдуктов"
                />
              </div>
            </div>
          </section>

          <section className="profile__section profile__section--password">
            <h3 className="profile__section-header">Обновление пароля</h3>
            <div className="profile__section-row">
              <div className="profile__input">
                <label htmlFor="profile-old-password">Старый пароль</label>
                <input type="text" id="profile-old-password" />
              </div>
              <div className="profile__input">
                <label htmlFor="profile-new-password">Новый пароль</label>
                <input type="text" id="profile-new-password" />
              </div>
              <div className="profile__input">
                <label htmlFor="profile-repeat-password">
                  Повторите новый пароль
                </label>
                <input type="text" id="profile-repeat-password" />
              </div>
            </div>
          </section>

          <section className="profile__section">
            <h3 className="profile__section-header">Подключенные устройства</h3>
            <ul className="profile__device-list">
              <li className="profile__device">
                <Icon id="device" width="32" />
                <h4 className="profile__device-name">Имя устройства</h4>
                <button className="profile__device-disable">
                  Отключить устройство
                </button>
                <p className="profile__device-used">
                  Последний вход: 1 ноября 2021, 21:25
                </p>
              </li>
              <li className="profile__device">
                <Icon id="device" width="32" />
                <h4 className="profile__device-name">Имя устройства</h4>
                <button className="profile__device-disable">
                  Отключить устройство
                </button>
                <p className="profile__device-used">
                  Последний вход: 1 ноября 2021, 21:25
                </p>
              </li>
              <li className="profile__device">
                <Icon id="device" width="32" />
                <h4 className="profile__device-name">Имя устройства</h4>
                <button className="profile__device-disable">
                  Отключить устройство
                </button>
                <p className="profile__device-used">
                  Последний вход: 1 ноября 2021, 21:25
                </p>
              </li>
            </ul>
          </section>
          <button type="button" className="button profile__save-button">
            Сохранить и выйти
          </button>
        </div>
      </main>
    </>
  );
};

export default Profile;
