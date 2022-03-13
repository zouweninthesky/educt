import Auth from "../store/auth";
import request from "./request";
import { STORAGE_REQUEST_URL } from "../utils/constants/links";
import { toJS } from "mobx";

const headers = {
  Authorization: `Bearer ${Auth.token}`,
};

class ImageService {
  // Нужен для замены картинок, в данном случае при загрузке масок
  async getImageUpdateLinks(imagesObjects, isAvatar) {
    const url = isAvatar
      ? `${STORAGE_REQUEST_URL}url/?type=avatar`
      : `${STORAGE_REQUEST_URL}url/`;
    const config = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        images: imagesObjects.map((el) => el.imageUID),
      }),
    };

    return await request(url, config);
  }

  async getImageUploadLinks(numberOfLinks, isAvatar) {
    const url = isAvatar
      ? `${STORAGE_REQUEST_URL}url/?count=${numberOfLinks}&type=avatar`
      : `${STORAGE_REQUEST_URL}url/?count=${numberOfLinks}`;
    const config = {
      method: "GET",
      headers,
    };
    return await request(url, config);
  }

  async uploadImagesStorage(imageBin, url) {
    const config = {
      method: "PUT",
      headers: {
        "Content-Type": "image/jpg",
      },
      body: imageBin,
    };

    return await request(url, config, false, true);
  }
}

export default new ImageService();
