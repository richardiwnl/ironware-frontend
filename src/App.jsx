import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { PersistGate } from 'redux-persist/integration/react';
import { CustomProvider } from 'rsuite';
import IHeader from './components/Header';
import './styles/rsuite.css';

import Routes from './routes';
import store, { persistor } from './store';

function App() {
  return (
    <CustomProvider theme="light">
      <Provider store={store}>
        <PersistGate persistor={persistor}>
          <BrowserRouter>
            <IHeader />
            <Routes />
            <ToastContainer autoClose={3000} className="toast-container" />
          </BrowserRouter>
        </PersistGate>
      </Provider>
    </CustomProvider>
  );
}

export default App;
