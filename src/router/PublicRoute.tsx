import { useLocation, Navigate } from 'react-router-dom';
import useAuth from '../context/authContext';
import { ROUTES } from './constants';

function PublicRoute({ children }: { children: JSX.Element }) {
  let { user } = useAuth();
  let location = useLocation();

  if (user) {
    // Redirect them to the /login page, but save the current location they were
    // trying to go to when they were redirected. This allows us to send them
    // along to that page after they login, which is a nicer user experience
    // than dropping them off on the home page.
    return <Navigate to={ROUTES.home} state={{ from: location }} replace />;
  }

  return children;
}

export default PublicRoute;
