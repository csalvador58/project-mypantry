import { ErrorInfo} from "react";
import { AppError } from "./error-classes";


export const ErrorLogger = (error: AppError, errorInfo?: ErrorInfo) => {
  const logData = {
    timestamp: new Date().toISOString(),
    type: error.name,
    message: error.message,
    stackTrace: error.stack,
    errorInfo,
  };

  console.log(logData);

};