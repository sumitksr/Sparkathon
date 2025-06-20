import React, { createContext, useContext, useState } from "react";

const EcoModeContext = createContext();

export const EcoModeProvider = ({ children }) => {
  const [ecoMode, setEcoMode] = useState(false);
  const toggleEcoMode = () => setEcoMode((prev) => !prev);
  return (
    <EcoModeContext.Provider value={{ ecoMode, toggleEcoMode }}>
      {children}
    </EcoModeContext.Provider>
  );
};

export const useEcoMode = () => useContext(EcoModeContext); 