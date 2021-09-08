import React, { useContext, useState } from "react";

const CloseModalContext = React.createContext();

export const useCloseModal = () => {
  return useContext(CloseModalContext);
};

const CloseModalProvider = ({ children }) => {
  const [closeModal, setCloseModal] = useState(false);

  const toggle = () => setCloseModal((prev) => !prev);

  return (
    <CloseModalContext.Provider value={[closeModal, toggle]}>
      {children}
    </CloseModalContext.Provider>
  );
};

export default CloseModalProvider;
