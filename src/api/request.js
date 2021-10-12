import Auth from "../store/auth";
import { UNATHORIZED } from "../utils/constants/errorCodes";

const request = async (url, config) => {
  let response = await fetch(url, config);
  if (response.status === UNATHORIZED) {
    await Auth.RefreshToken();
    response = await fetch(url, config);
  }

  const data = await response.json();
  return data;
};

export default request;
