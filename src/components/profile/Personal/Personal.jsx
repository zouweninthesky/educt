import React, { useRef } from "react";
import { observer } from "mobx-react-lite";

import ProfileStore from "../../../store/profile";

import { AVATARS_URL } from "../../../utils/constants/links";

const Personal = observer(() => {
  const fileInput = useRef(null);

  const profileImage = () => {
    // К сожалению, формат изображения, нужный для загрузки, не подходит для превью
    // if (ProfileStore.newAvatar) {
    //   console.log("here I am");
    //   return `url(${ProfileStore.newAvatar})`;
    // }
    if (ProfileStore.avatarUid)
      return `url(${AVATARS_URL}${ProfileStore.avatarUid})`;

    return "";
  };

  return (
    <section className="profile__section">
      <h3 className="profile__section-header">Личные данные</h3>
      <div className="profile__section-row">
        <button
          type="button"
          className="profile__image-button"
          onClick={() => {
            fileInput.current.click();
          }}
        >
          <div
            style={{
              backgroundImage: profileImage(),
            }}
            className="profile__image"
            alt="Ваш аватар"
          />
        </button>
        <input
          type="file"
          name=""
          id=""
          ref={fileInput}
          accept="image/*"
          className="visually-hidden"
          onChange={async (e) => {
            e.preventDefault();
            const reader = new FileReader();
            reader.readAsArrayBuffer(e.target.files[0]);
            reader.onload = () => {
              ProfileStore.saveAvatar(reader.result, e.target.files[0].name);
            };
          }}
        />
        <div className="profile__input">
          <label htmlFor="profile-first-name">Имя</label>
          <input
            type="text"
            id="profile-first-name"
            value={ProfileStore.firstName}
            placeholder="Укажите своё имя"
            onChange={(e) => {
              ProfileStore.changeFirstName(e.target.value);
            }}
          />
        </div>
        <div className="profile__input">
          <label htmlFor="profile-second-name">Фамилия</label>
          <input
            type="text"
            id="profile-second-name"
            value={ProfileStore.lastName}
            placeholder="Укажите свою фамилию"
            onChange={(e) => {
              ProfileStore.changeLastName(e.target.value);
            }}
          />
        </div>
      </div>
    </section>
  );
});

export default Personal;
