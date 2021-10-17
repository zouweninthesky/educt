import { MAIN_URL } from "../utils/constants/links";

class LikesService {
  async getLikes() {
    const url = `${MAIN_URL}likes/`;
    const config = {
      method: "GET",
    };

    const response = await fetch(url, config);

    return await response.json();
  }

  async addLike() {
    const url = `${MAIN_URL}likes/`;
    const config = {
      method: "POST",
    };

    const response = await fetch(url, config);

    return await response.json();
  }
}

export default new LikesService();
