import React from 'react';
import { connect } from 'react-redux';
import { Navigate } from 'react-router-dom';

const ProtectSecurePage = ({ children, isLoggedIn }) => { // using children allows to wrap any component (or even multiple components) that need protection, better than "WrappedComponent"
    if (!isLoggedIn) {
        // Redirect unauthenticated users to the login page, and prevent them from manually typing http://localhost:8080/secure in the search bar
        alert('Log in to have access to this page!');
        return <Navigate to="/login" />;
    }
    // Render the protected component(s) if user is logged in
    return children;
};

const mapStateToProps = (state) => ({
    isLoggedIn: state.auth.isLoggedIn,
    token: state.auth.token,
});

export default connect(mapStateToProps)(ProtectSecurePage);