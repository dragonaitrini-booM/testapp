import React from 'react';

type AlertType = 'success' | 'error' | 'info';

interface AlertProps {
  message: string;
  type: AlertType;
  onClose?: () => void;
}

const Alert = ({ message, type, onClose }: AlertProps) => {
  const alertTypeClasses = {
    success: 'bg-green-100 border-green-400 text-green-700',
    error: 'bg-red-100 border-red-400 text-red-700',
    info: 'bg-blue-100 border-blue-400 text-blue-700',
  }[type];

  return (
    <div
      className={`border px-4 py-3 rounded relative flex items-center justify-between ${alertTypeClasses}`}
      role="alert"
    >
      <span className="block sm:inline">{message}</span>
      {onClose && (
        <button
          onClick={onClose}
          className="ml-4 p-1 rounded-full hover:bg-black/10 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-current"
          aria-label="Close"
        >
          <span className="text-2xl leading-none">&times;</span>
        </button>
      )}
    </div>
  );
};

export default Alert;
