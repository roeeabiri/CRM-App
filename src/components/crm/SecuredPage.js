import React from 'react';
import { connect } from 'react-redux';
import UserList from './UserList';
import DeviceListComponent from '../CRM/DeviceListComponent';

const SecuredPage = ({ token }) => (
    <div>
        {/* <span>{token}</span>  */}
        <UserList />
        <DeviceListComponent />
    </div>
);

const mapStateToProps = (state) => ({
    token: state.auth.token, // Access token from Redux store
});

export default connect(mapStateToProps)(SecuredPage);
