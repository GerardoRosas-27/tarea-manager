import React from "react";
import { AlertProps } from "../types/task";



const Alert: React.FC<AlertProps> = ({
  message,
  type,
  onClose,
  onConfirm,
  onCancel,
  actionType = "notification",
}) => {
  const alertStyles = {
    success: "alert-success bg-green-100 text-green-700 border-green-400",
    error: "alert-error bg-red-100 text-red-700 border-red-400",
    info: "alert-info bg-blue-100 text-blue-700 border-blue-400",
  };

  const iconPaths = {
    success: "M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z",
    error: "M6 18L18 6M6 6l12 12",
    info: "M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z",
  };

  return (
    <div
      role="alert"
      className={`alert p-4 border rounded-md flex items-center space-x-2 ${alertStyles[type]}`}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-6 w-6 shrink-0 stroke-current"
        fill="none"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d={iconPaths[type]}
        />
      </svg>
      <span>{message}</span>
      <div className="ml-auto flex space-x-2">
        {actionType === "confirm" && (
          <>
            <button
              onClick={onCancel}
              className="btn btn-sm btn-gray"
            >
              Cancelar
            </button>
            <button
              onClick={onConfirm}
              className="btn btn-sm btn-error"
            >
              Aceptar
            </button>
          </>
        )}
        {actionType === "notification" && onClose && (
          <button
            onClick={onClose}
            className="btn btn-sm btn-outline"
          >
            Cerrar
          </button>
        )}
      </div>
    </div>
  );
};

export default Alert;
