"use client";

import React, { createContext, useState, useContext } from "react";
import Alert from "../components/Alert";

interface AlertContextProps {
  showAlert: (
    message: string,
    type: "success" | "error" | "info",
    actionType?: "confirm" | "notification",
    onConfirm?: () => void,
    onCancel?: () => void
  ) => void;
  hideAlert: () => void; // Función para ocultar la alerta
}

const AlertContext = createContext<AlertContextProps | undefined>(undefined);

export const AlertProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [message, setMessage] = useState("");
  const [type, setType] = useState<"success" | "error" | "info">("info");
  const [actionType, setActionType] = useState<"confirm" | "notification">("notification");
  const [onConfirm, setOnConfirm] = useState<(() => void) | undefined>(undefined);
  const [onCancel, setOnCancel] = useState<(() => void) | undefined>(undefined);

  const showAlert = (
    message: string,
    type: "success" | "error" | "info",
    actionType: "confirm" | "notification" = "notification",
    onConfirm?: () => void,
    onCancel?: () => void
  ) => {
    setMessage(message);
    setType(type);
    setActionType(actionType);
    setOnConfirm(() => onConfirm);
    setOnCancel(() => onCancel);
    setIsVisible(true);
  };

  const hideAlert = () => {
    setIsVisible(false); // Oculta la alerta
    setMessage("");
    setOnConfirm(undefined);
    setOnCancel(undefined);
  };

  return (
    <AlertContext.Provider value={{ showAlert, hideAlert }}>
      {children}
      {isVisible && (
        <div className="fixed top-4 left-1/2 transform -translate-x-1/2 z-50">
          <Alert
            message={message}
            type={type}
            actionType={actionType}
            onConfirm={() => {
              if (onConfirm) onConfirm();
              hideAlert();
            }}
            onCancel={() => {
              if (onCancel) onCancel();
              hideAlert(); // Llama a hideAlert() para cerrar la alerta
            }}
            onClose={hideAlert}
          />
        </div>
      )}
    </AlertContext.Provider>
  );
};

export const useAlert = (): AlertContextProps => {
  const context = useContext(AlertContext);
  if (!context) {
    throw new Error("useAlert debe usarse dentro de un AlertProvider");
  }
  return context;
};
