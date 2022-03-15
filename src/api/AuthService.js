import Auth from "../store/auth";
import { MAIN_URL } from "../utils/constants/links";

const headers = {
  "Content-Type": "application/json",
};

class AuthService {
  async signIn(login, passwordHash) {
    const response = await fetch(`${MAIN_URL}token/`, {
      method: "POST",
      headers,
      body: JSON.stringify({
        email: login,
        password: passwordHash,
      }),
    });

    console.log(response);

    return response;
  }

  async refreshToken() {
    const response = await fetch(`${MAIN_URL}token/refresh/`, {
      method: "POST",
      headers,
      body: JSON.stringify({
        refresh: Auth.refresh,
      }),
    });

    return await response.json();
  }
}

export default new AuthService();
