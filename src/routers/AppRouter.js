import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from '../components/general pages/Header';
import HomePage from '../components/general pages/HomePage';
import LogIn from '../components/authentication/Login';
import SignUp from '../components/authentication/SignUp';
import SecuredPage from '../components/crm/SecuredPage';

const AppRouter = () => (
  <Router>
    <div>
      <Header />
      <Routes>
        <Route path="/" element={<HomePage />} exact />
        <Route path="/login" element={<LogIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/secure" element={<SecuredPage />} />
      </Routes>
    </div>
  </Router>
);

export default AppRouter;