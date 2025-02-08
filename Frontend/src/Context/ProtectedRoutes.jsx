import { Navigate, useLocation } from 'react-router-dom';
import { useUser } from './UserContext';

export const ProtectedRoute = ({ children }) => {
  const { user } = useUser();
  const location = useLocation();

  if (!user) {
    // Redirect to login while saving the attempted url
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
};
