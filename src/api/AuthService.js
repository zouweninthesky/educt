export default class AuthService {
  data = {
    ok: true,
    token: "QWERTYUIOP123!@#$",
    error: "Неверный логин/пароль",
  };

  async SignIn(login, passwordHash) {
    const response = await fetch("https://educt.ru/api/token/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: login,
        password: passwordHash,
      }),
    });

    console.log("sanek s sobakoj");

    return await response.json();
  }

  async SignOut() {
    // const response = await fetch("https://educt.ru/api/scripts/", {
    // method: "DELETE",
    // });
    // return await response.json();
  }
}
