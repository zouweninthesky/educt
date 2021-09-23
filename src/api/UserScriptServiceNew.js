export default class UserScriptsServiceNew {
  async getUserScripts() {
    const response = await fetch("https://educt.ru/api/scripts/", {
      method: "GET",
    });

    return await response.json();
  }
}
