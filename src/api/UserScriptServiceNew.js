export default class UserScriptsServiceNew {
  async getUserScripts() {
    const response = await fetch("https://educt.ru/api/scripts/", {
      method: "GET",
    });

    const body = response.json();
    console.log(response);
    console.log(body);
  }
}
