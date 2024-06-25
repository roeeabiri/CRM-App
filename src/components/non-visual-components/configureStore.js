import { configureStore } from '@reduxjs/toolkit';

import usersReducer from '../../reducers/users';
import authReducer from '../../reducers/auth';

const storeFunction = () => {
    // Initialize store with loaded state or default state
    const store = configureStore({
        reducer: {
            registeredUsers: usersReducer,
            auth: authReducer,
        }
    });

    return store;
}

export default storeFunction;
