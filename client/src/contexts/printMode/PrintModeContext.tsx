import React, { createContext, useState } from "react";

interface iPrintContext {
  isInPrintMode: boolean;
  enterPrintMode: () => void;
  exitPrintMode: () => void;
}

const startingValue: iPrintContext = {
  isInPrintMode: false,
  enterPrintMode: () => {},
  exitPrintMode: () => {}
};

export const PrintModeContext = createContext(startingValue);

export const PrintModeContextProvider: React.FC = ({ children }) => {
  const [isInPrintMode, setIsInPrintMode] = useState<boolean>(false);

  const enterPrintMode = () => setIsInPrintMode(true);
  const exitPrintMode = () => setIsInPrintMode(false);

  const valuesToPass: iPrintContext = {
    isInPrintMode,
    enterPrintMode,
    exitPrintMode
  };

  return (
    <PrintModeContext.Provider value={{ ...valuesToPass }}>
      {children}
    </PrintModeContext.Provider>
  );
};
