export default class UserScriptsServiceNew {
  async getUserScripts() {
    const response = await fetch("https://educt.ru/api/scripts/", {
      method: "GET",
      headers: {
        Authorization: `Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNjMzMzcxNTIwLCJqdGkiOiIwMzFhZGZlNzk3MWI0OWI1YjhmMDQ3MDIyZmI1ZTViMiIsInVzZXJfaWQiOjJ9.HkwXScxAIKbwjY-Ikbm_MHCAXDlm6RVD0ziWsrOBuOo`,
      },
    });

    return await response.json();
  }

  async getScript(id) {
    const response = await fetch(`https://educt.ru/api/scripts/${id}/`, {
      method: "GET",
    });

    return await response.json();
  }
}
