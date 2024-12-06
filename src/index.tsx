import React from 'react';
import ReactDOM from 'react-dom/client';
import { store } from './app/store/store';
import { Provider } from 'react-redux';
import { fetchUsers } from './app/store/features/users/userSlice';
import './index.css';
import App from './App';

store.dispatch(fetchUsers())

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);
