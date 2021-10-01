export default class AuthService {

  data = {
    ok: true,
    token: "QWERTYUIOP123!@#$",
    error: "Неверный логин/пароль"
  }

  async SignIn(login, passwordHash) {
    // const response = await fetch("https://educt.ru/api/scripts/", {
    //   method: "POST",
    //   body: {
    //     login,
    //     passwordHash
    //   }
    // });
    //
    // return await response.json();

    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve(this.data);
      }, 400);
    })
  }


  async SignOut() {
    const response = await fetch("https://educt.ru/api/scripts/", {
      method: "DELETE",
    });
    return await response.json();
  }
}