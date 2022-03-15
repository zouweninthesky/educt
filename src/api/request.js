import Auth from "../store/auth";
import { UNATHORIZED } from "../utils/constants/errorCodes";

const request = async (url, config, responseNotNeeded, parseNotNeeded) => {
  let response = await fetch(url, config);
  if (response.status === UNATHORIZED) {
    await Auth.refreshToken();
    const newConfig = {
      ...config,
      headers: {
        ...config.headers,
        Authorization: `Bearer ${Auth.token}`,
      },
    };

    response = await fetch(url, newConfig);
  }

  if (responseNotNeeded) {
    return;
  }

  if (parseNotNeeded) {
    return response;
  }
  // console.log(response);

  const data = await response.json();
  // console.log(data);
  return data;
};

export default request;
