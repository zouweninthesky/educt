import Auth from "../store/auth";
import { UNATHORIZED } from "../utils/constants/errorCodes";

const request = async (url, config, responseNotNeeded) => {
  let response = await fetch(url, config);
  if (response.status === UNATHORIZED) {
    await Auth.RefreshToken();
    response = await fetch(url, config);
  }

  if (responseNotNeeded) {
    return;
  }
  const data = await response.json();
  return data;
};

export default request;
