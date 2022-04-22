import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Auth from '../pages/Auth';
import Main from '../pages/Main';
import { ROUTES } from '.';
import { AppRoute, GuestRoute } from '.';

function router() {
  return (
    <Switch>
      <GuestRoute path={ROUTES.login}>
        <Auth isLogin={false} />
      </GuestRoute>
      <GuestRoute path={ROUTES.signup}>
        <Auth isLogin={true} />
      </GuestRoute>
      <AppRoute exact path={ROUTES.main}>
        <Main />
      </AppRoute>
    </Switch>
  );
}

export default router;
