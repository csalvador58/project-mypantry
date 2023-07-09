import { ErrorInfo } from "react";
import { AppError } from "./error-classes";

// export const ErrorLogger = async (error: AppError): Promise<void> => {
export const ErrorLogger = (error: AppError, errorInfo?: ErrorInfo): void => {
  const logData = {
    timestamp: new Date().toISOString(),
    type: error.name,
    message: error.message,
    stackTrace: error.stack,
    errorInfo,
  };

  console.log(logData);

  //      // Send the log data to the server via an API call
  //   const response = await fetch('/api/logs', {
  //     method: 'POST',
  //     headers: {
  //       'Content-Type': 'application/json',
  //     },
  //     body: JSON.stringify(logData),
  //   });

  //   // Handle the response from the server
  //   if (!response.ok) {
  //     throw new Error('Failed to send error log to the server');
  //   }
};
