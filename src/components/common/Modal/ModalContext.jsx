import React, { useContext, useState } from "react";

const ModalContext = React.createContext();

export const useModal = () => {
  return useContext(ModalContext);
};

const ModalProvider = ({ children }) => {
  const [modalId, setModalIdDispatcher] = useState(null);

  const setModalId = (newValue = null) => setModalIdDispatcher(newValue);

  return (
    <ModalContext.Provider value={[modalId, setModalId]}>
      {children}
    </ModalContext.Provider>
  );
};

export default ModalProvider;
