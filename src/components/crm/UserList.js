

import React from 'react';
import User from './User';

import { connect } from 'react-redux';

import '../../styles/components/pages/securedPage/users array/_userList.scss';

const UserList = (props) => {
    // Check if registeredUsers is defined before mapping over it
    const users = props.registeredUsers || [];

    return (
        <div className="user-list">
            {users.map(user => (<User key={user.id} {...user} />))}
        </div>
    );
};

const mapStateToProps = (state) => {
    return {
        registeredUsers: state.registeredUsers // Assuming registeredUsers is in your Redux state
    }
}

export default connect(mapStateToProps)(UserList);;