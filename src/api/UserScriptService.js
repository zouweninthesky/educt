export default class UserScriptsService {
  async getUserScripts() {
    const response = await fetch("https://educt.ru/api/scripts/", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${window.localStorage.getItem("token")}`,
      },
    });

    const data = await response.json();
    return data;
  }

  async getScript(id) {
    const response = await fetch(`https://educt.ru/api/scripts/${id}/`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${window.localStorage.getItem("token")}`,
      },
    });

    const data = await response.json();

    return data;
  }

  async deleteScript(id) {
    await fetch(`https://educt.ru/api/scripts/${id}/`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${window.localStorage.getItem("token")}`,
      },
    });
  }
}
