import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Auth from '../pages/Auth';
import Main from '../pages/Main';
import { ROUTES } from '.';
import RequireAuth from './RequireAuth';
import PublicRoute from './PublicRoute';

function router() {
  return (
    <Routes>
      <Route
        path={ROUTES.main}
        element={
          <RequireAuth>
            <Main />
          </RequireAuth>
        }
      />
      <Route
        path={ROUTES.login}
        element={
          <PublicRoute>
            <Auth />
          </PublicRoute>
        }
      />
    </Routes>
  );
}

export default router;
