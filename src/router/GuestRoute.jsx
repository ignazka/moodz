import { Route, Redirect } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { ROUTES } from './constants';
/*
  This component checks if there is a user already login
  If there is no user, then it allows the user to continue to the route
  If not it redirects to the main screen
*/

function GuestRoute({ children, ...restProps }) {
  const { user } = useAuth();

  if (user) {
    return <Redirect to={ROUTES.main} />;
  }

  return <Route {...restProps}>{children}</Route>;
}

export default GuestRoute;
