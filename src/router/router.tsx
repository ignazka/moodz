import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Auth from '../pages/Auth';
import Home from '../pages/Home';
import Settings from '../pages/Settings';
import { ROUTES } from '.';
import RequireAuth from './RequireAuth';
import PublicRoute from './PublicRoute';

function router(props: any) {
  return (
    <Routes>
      <Route
        path={ROUTES.home}
        element={
          <RequireAuth>
            <Home
              handleSettingsChange={props.handleSettingsChange}
              settings={props.settings}
              handleSubmit={props.handleSubmit}
            />
          </RequireAuth>
        }
      />

      <Route
        path={ROUTES.settings}
        element={
          <RequireAuth>
            <Settings
              handleSettingsChange={props.handleSettingsChange}
              settings={props.settings}
            />
          </RequireAuth>
        }
      />
      <Route
        path={ROUTES.signup}
        element={
          <PublicRoute>
            <Auth isLogin={false} />
          </PublicRoute>
        }
      />
      <Route
        path={ROUTES.login}
        element={
          <PublicRoute>
            <Auth isLogin />
          </PublicRoute>
        }
      />
    </Routes>
  );
}

export default router;
