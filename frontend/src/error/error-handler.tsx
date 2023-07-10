import { FC, ReactNode, lazy, useContext, useEffect } from 'react';
import { AuthContext } from 'src/contexts/auth/jwt/auth-context';
import { ErrorLogger } from 'src/error/error-logger';
const Error401Page = lazy(() => import('src/pages/401'));

interface ErrorHandlerProps {
  children: ReactNode;
  error: Error | null;
}

// export const ErrorHandler = async (error: AppError): Promise<void> => {
const ErrorHandler: FC<ErrorHandlerProps> = ({ error, children }) => {
  const authContext = useContext(AuthContext);
  console.log('ErrorHandler - error');
  console.log(error);

  useEffect(() => {
    if (error) {
      // Log Error
      ErrorLogger(error);
      if (error.message.includes('jwt expired')) {
        alert('Login token expired. Please re-login.');
        // authContext.signOut();
      }
    }
  }, [error]);

  return error ? <Error401Page /> : <>{children}</>;
};

export default ErrorHandler;
