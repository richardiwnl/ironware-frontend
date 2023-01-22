import figlet from 'figlet';
import standard from 'figlet/importable-fonts/Standard';
import React from 'react';
import { Provider } from 'react-redux';
import { Router } from 'react-router-dom';
import { PersistGate } from 'redux-persist/integration/react';

import ThemeProvider from './components/ThemeProvider';
import Routes from './routes';
import history from './services/history';
import store, { persistor } from './store';
import './styles/rsuite.css';

function App() {
  figlet.parseFont('Standard', standard);

  figlet.text(
    'Ironware',
    {
      font: 'Standard',
    },
    (err, data) => {
      if (err) {
        console.log('Algo deu errado');
        console.dir(err);
        return;
      }
      console.log(
        data,
        '\nFeito com 💗 por: \n- Richard Ferreira\n- Ryan Henrique\n- Pablo Samuel\n- Patrick Amaral'
      );
    }
  );

  return (
    <Provider store={store}>
      <ThemeProvider>
        <PersistGate persistor={persistor}>
          <Router history={history}>
            <Routes />
          </Router>
        </PersistGate>
      </ThemeProvider>
    </Provider>
  );
}

export default App;
