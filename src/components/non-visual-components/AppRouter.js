import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from '../general-pages/Header';
import HomePage from '../general-pages/HomePage';
import LogIn from '../authentication-pages/Login';
import SignUp from '../authentication-pages/SignUp';
import SecuredPage from '../CRM/SecuredPage';
import ProtectSecurePage from '../authentication-pages/ProtectSecurePage';
import NotFoundPage from '../general-pages/NotFoundPage';
import DeviceListComponent from '../CRM/DeviceListComponent';

const AppRouter = () => (
  <Router>
    <div>
      <Header />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LogIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/secure" element={<ProtectSecurePage> <SecuredPage /> </ProtectSecurePage>} />
        <Route path="/devices" element={<ProtectSecurePage> <DeviceListComponent /> </ProtectSecurePage>} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </div>
  </Router>
);

export default AppRouter;
