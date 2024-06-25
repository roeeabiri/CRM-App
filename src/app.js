import React from 'react';
import { createRoot } from 'react-dom/client'; // Import createRoot from react-dom/client
import AppRouter from './AppRouter';
import 'normalize.css/normalize.css';
import './styles/styles.scss';
import { Provider } from 'react-redux';
import storeFunction from './configureStore';
import reportWebVitals from './reportWebVitals';

const store = storeFunction();

// Update the state to localStorage whenever it changes
store.subscribe(() => {
  try {
    const serializedState = JSON.stringify(store.getState().registeredUsers);
    localStorage.setItem('registeredUsers', serializedState);
    console.log(store.getState().registeredUsers);
  } catch (err) {
    console.error('Error saving state to localStorage:', err);
  }
});

const provider = (
  <Provider store={store}>
    <React.StrictMode>
      <AppRouter />
    </React.StrictMode>
  </Provider>
);

const root = createRoot(document.getElementById('app')); // Create root using createRoot from react-dom/client
root.render(provider); // Render your app using createRoot

reportWebVitals();