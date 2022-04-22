import { Route, Redirect } from 'react-router-dom';
import { useAuth } from '../context/AuthContext/AuthContext';
import { ROUTES } from '.';
/*
  This component checks if there is a user already login
  If there is one then it allows the user to continue to the route
  If not it redirects to the login page
*/
function AppRoute({ children, ...restProps }) {
  const { user } = useAuth();

  if (!user) {
    return <Redirect to={ROUTES.login} />;
  }

  return <Route {...restProps}>{children}</Route>;
}

export default AppRoute;
