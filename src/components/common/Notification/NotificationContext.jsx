import React, { useContext, useState } from "react";

const NotificationContext = React.createContext();

export const useNotification = () => {
  return useContext(NotificationContext);
};

const NotificationProvider = ({ children }) => {
  const [modalId, setNotificationIdDispatcher] = useState(null);

  const setNotificationId = (newValue = null) =>
    setNotificationIdDispatcher(newValue);

  return (
    <NotificationContext.Provider value={[modalId, setNotificationId]}>
      {children}
    </NotificationContext.Provider>
  );
};

export default NotificationProvider;
