import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from '../components/general pages/Header';
import HomePage from '../components/general pages/HomePage';
import LogIn from '../components/authentication/auth pages/Login';
import SignUp from '../components/authentication/auth pages/SignUp';
import SecuredPage from '../components/crm/SecuredPage';
import ProtectSecurePage from '../components/authentication/ProtectSecurePage';
import NotFoundPage from '../components/general pages/NotFoundPage';

const AppRouter = () => (
  <Router>
    <div>
      <Header />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LogIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/secure" element={<ProtectSecurePage> <SecuredPage /> </ProtectSecurePage>} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </div>
  </Router>
);

export default AppRouter;