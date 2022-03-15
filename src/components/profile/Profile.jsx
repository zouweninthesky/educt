import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { observer } from "mobx-react-lite";
import "./Profile.scss";

import Header from "../common/Header/Header";
import Icon from "../common/Icon/Icon";
import NoSaveProfileModal from "./modals/NoSaveProfile";
import Overlay from "../common/Modal/Overlay";
import Personal from "./Personal/Personal";

import Store from "../../store";
import ProfileStore from "../../store/profile";
import { useModal } from "../common/Modal/ModalContext";

import { MIN_PASSWORD_LENGTH } from "../../utils/constants/magicNumbers";
import { PASSWORD_REG_EXP } from "../../utils/constants/textStrings";
import { MODAL_NO_SAVE_PROFILE_ID } from "../../utils/constants/modals";

const Profile = observer(() => {
  const [oldPass, setOldPass] = useState("");
  const [newPass, setNewPass] = useState("");
  const [repeatNewPass, setRepeatNewPass] = useState("");
  const [passwordStatus, setPasswordStatus] = useState("not-changed");
  const [, setModalID] = useModal();

  useEffect(() => {
    (async () => {
      if (ProfileStore.id === "") await ProfileStore.getUser();
    })();
  }, []);

  const backButton = () => {
    if (passwordStatus !== "not-changed" || ProfileStore.personalChanged)
      return (
        <button
          type="button"
          className="button button--icon-only button--simple profile__back-button"
          onClick={() => setModalID(MODAL_NO_SAVE_PROFILE_ID)}
        >
          <Icon id="arrow-left" width="24" />
        </button>
      );
    return (
      <Link
        to="/user"
        className="button button--icon-only button--simple profile__back-button"
        onClick={() => {
          ProfileStore.resetStore();
          Store.loadingStarted();
        }}
      >
        <Icon id="angle-left" width="24" />
      </Link>
    );
  };

  useEffect(() => {
    if (oldPass !== "" && newPass !== "") {
      if (newPass.length >= MIN_PASSWORD_LENGTH) {
        if (PASSWORD_REG_EXP.test(newPass)) {
          if (newPass !== oldPass) {
            if (newPass === repeatNewPass) {
              setPasswordStatus("acceptable");
            } else setPasswordStatus("wrong-repeat");
          } else setPasswordStatus("old-password");
        } else setPasswordStatus("wrong-format");
      } else setPasswordStatus("too-short");
    } else setPasswordStatus("not-changed");
  }, [oldPass, newPass, repeatNewPass]);

  const showErrorMessage = () => {
    let errorMessage;
    switch (passwordStatus) {
      case "too-short":
        errorMessage = "Пароль должен быть длиннее";
        break;

      case "wrong-format":
        errorMessage =
          "В пароле должна быть минимум одна заглавная буква, одна маленькая буква и минимум одна цифра";
        break;

      case "old-password":
        errorMessage = "Новый пароль должен отличаться от старого";
        break;

      case "wrong-repeat":
        errorMessage = "Пожалуйста, повторите пароль";
        break;

      case "acceptable":
        errorMessage = "";
        break;

      default:
        errorMessage = "";
        break;
    }

    return errorMessage;
  };

  return (
    <>
      <Header />
      <main className="profile">
        <div className="container profile__container">
          <div className="profile__header-wrapper">
            {backButton()}
            <h2 className="profile__header">Настройки профиля</h2>
          </div>
          <Personal />
          <section className="profile__section profile__section--password">
            <h3 className="profile__section-header">Обновление пароля</h3>
            <div className="profile__section-row">
              <div className="profile__input">
                <label htmlFor="profile-old-password">Старый пароль</label>
                <input
                  type="password"
                  id="profile-old-password"
                  value={oldPass}
                  placeholder="*****"
                  onChange={(e) => {
                    setOldPass(e.target.value);
                  }}
                />
              </div>
              <div className="profile__input">
                <label htmlFor="profile-new-password">Новый пароль</label>
                <input
                  type="password"
                  id="profile-new-password"
                  value={newPass}
                  placeholder="*******"
                  onChange={(e) => {
                    setNewPass(e.target.value);
                  }}
                />
              </div>
              <div className="profile__input">
                <label htmlFor="profile-repeat-password">
                  Повторите новый пароль
                </label>
                <input
                  type="password"
                  id="profile-repeat-password"
                  value={repeatNewPass}
                  placeholder="*******"
                  onChange={(e) => {
                    setRepeatNewPass(e.target.value);
                  }}
                />
              </div>
            </div>
            <p>{showErrorMessage()}</p>
          </section>

          {/* <section className="profile__section">
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
          </section> */}
          <button
            type="button"
            className="button profile__save-button"
            disabled={!ProfileStore.personalChanged}
            onClick={() => {
              ProfileStore.uploadProfile();
            }}
          >
            Сохранить данные
          </button>
          <button
            type="button"
            className="button profile__save-button"
            disabled={passwordStatus !== "acceptable"}
            onClick={() => {
              const success = ProfileStore.uploadPassword(
                oldPass,
                newPass,
                repeatNewPass
              );
              if (success) {
                setOldPass("");
                setNewPass("");
                setRepeatNewPass("");
              }
            }}
          >
            Сохранить пароль
          </button>
        </div>
        <NoSaveProfileModal />
        <Overlay />
      </main>
    </>
  );
});

export default Profile;
