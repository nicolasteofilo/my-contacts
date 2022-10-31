import { useState, useMemo } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';

import Routes from '../../Routes';

import GlobalStyles from '../../assets/styles/global';
import themes from '../../assets/styles/themes';

import Header from '../Header';
import ToastContainer from '../Toast/ToastContainer';

import { Container } from './styles';

function App() {
  const [theme, setTheme] = useState('light');
  const currentTheme = useMemo(() => themes[theme], [theme]);

  function handleChangeTheme(themeName) {
    setTheme(themeName);
  }

  return (
    <BrowserRouter>
      <ThemeProvider theme={currentTheme}>
        <GlobalStyles />
        <ToastContainer />
        <Container>
          <Header onChangeTheme={handleChangeTheme} theme={theme} />
          <Routes />
        </Container>
      </ThemeProvider>
    </BrowserRouter>
  );
}

export default App;
