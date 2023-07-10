import React, { ErrorInfo, ReactNode, lazy } from 'react';
import { ErrorLogger } from './error-logger';
import { AuthContext } from 'src/contexts/auth/jwt';
import { useLocation, useNavigate } from 'react-router-dom';
import { paths } from 'src/paths';
import toast from 'react-hot-toast';
const JwtLoginPage = lazy(() => import('src/pages/auth/jwt/login'));

interface ErrorBoundaryProps {
  children: ReactNode;
  fallback?: ReactNode;
}

interface ErrorBoundaryState {
  error: Error | null;
  hasError: boolean;
  redirectPage?: React.JSX.Element | null;
}

class ErrorBoundary extends React.Component<
  ErrorBoundaryProps,
  ErrorBoundaryState
> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false, error: null, redirectPage: null};
  }

  static contextType = AuthContext;

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { error, hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
    ErrorLogger(error, errorInfo);
    const authContext = this.context as React.ContextType<typeof AuthContext>;
    if (error.message.includes('jwt expired')) {
      toast.error('Login token expired, please re-login.');
      this.setState({ redirectPage: <JwtLoginPage /> });
      console.log('signout!');
      authContext.signOut();
    }
  }

  render() {
    if (this.state.hasError && this.state.redirectPage) {
      return this.state.redirectPage;
    } else if(this.state.hasError) {
      return this.props.fallback;
    }
    return this.props.children;
  }
}

export default ErrorBoundary;
