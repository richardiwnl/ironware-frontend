import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { PersistGate } from 'redux-persist/integration/react';
import figlet from 'figlet';
import standard from 'figlet/importable-fonts/Standard';

import IHeader from './components/Header';
import './styles/rsuite.css';
import Routes from './routes';
import store, { persistor } from './store';
import ThemeProvider from './components/ThemeProvider';

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

  // const theme = useSelector(state => state.theme.theme);

  // console.log(theme);

  return (
    <Provider store={store}>
      <ThemeProvider>
        <PersistGate persistor={persistor}>
          <BrowserRouter>
            <IHeader />
            <Routes />
          </BrowserRouter>
        </PersistGate>
      </ThemeProvider>
    </Provider>
  );
}

export default App;
