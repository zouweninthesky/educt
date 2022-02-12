import Auth from "../store/auth";
import { UNATHORIZED } from "../utils/constants/errorCodes";

const request = async (url, config, responseNotNeeded) => {
  let response = await fetch(url, config);
  if (response.status === UNATHORIZED) {
    await Auth.RefreshToken();
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
  // console.log(response);

  const data = await response.json();
  console.log(data);
  return data;
};

export default request;
