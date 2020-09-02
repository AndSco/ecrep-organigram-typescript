import React, { createContext, useState } from "react";

interface iError {
  error: string;
  addError: (e: string) => void;
  clearError: () => void;
}

const startingValue: iError = {
  error: "",
  addError: (e: string) => {},
  clearError: () => {}
};

export const ErrorContext = createContext(startingValue);

export const ErrorContextProvider: React.FC = ({ children }) => {
  const [error, setError] = useState<string>("");

  const addError = (error: string) => setError(error);
  const clearError = () => setError("");

  const valuesToPass: iError = {
    error,
    addError,
    clearError
  };

  return (
    <ErrorContext.Provider value={{ ...valuesToPass }}>
      {children}
    </ErrorContext.Provider>
  );
};
