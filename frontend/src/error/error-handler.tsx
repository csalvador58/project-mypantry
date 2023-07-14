import { FC, ReactNode, lazy, useContext, useEffect } from 'react';
import toast from 'react-hot-toast';
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

  useEffect(() => {
    if (error) {
      // Log Error
      ErrorLogger(error);
      if (error.message.includes('jwt expired')) {
        toast.error('Login token expired, please re-login.');
        // authContext.signOut();
      }
    }
  }, [error]);

  return error ? <Error401Page /> : <>{children}</>;
};

export default ErrorHandler;
