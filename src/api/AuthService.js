import Auth from "../store/auth";
import { MAIN_URL } from "../utils/constants/links";

const headers = {
  "Content-Type": "application/json",
};

class AuthService {
  async SignIn(login, passwordHash) {
    const response = await fetch(`${MAIN_URL}token/`, {
      method: "POST",
      headers,
      body: JSON.stringify({
        email: login,
        password: passwordHash,
      }),
    });

    return await response.json();
  }

  async RefreshToken() {
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
