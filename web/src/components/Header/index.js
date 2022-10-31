import PropTypes from 'prop-types';

import ToogleTheme from '../ToogleTheme';

import logo from '../../assets/images/logo.svg';
import whiteLogo from '../../assets/images/white-logo.svg';

import { Container } from './styles';

export default function Header({ onChangeTheme, theme }) {
  return (
    <Container>
      {theme === 'dark' ? (
        <img src={whiteLogo} alt="MyContacts" />
        ) : (
        <img src={logo} alt="MyContacts" />
      )}
      <ToogleTheme onChangeTheme={onChangeTheme} theme={theme} />
    </Container>
  );
}

Header.propTypes = {
  onChangeTheme: PropTypes.func.isRequired,
  theme: PropTypes.string.isRequired,
};
