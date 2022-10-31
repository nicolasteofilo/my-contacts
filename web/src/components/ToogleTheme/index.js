import PropTypes from 'prop-types';

import { TbMoonStars } from 'react-icons/tb';
import { BiSun } from 'react-icons/bi';

import { Container } from './styles';

export default function ToogleTheme({ onChangeTheme, theme }) {
  function handleToogleTheme() {
    if (theme === 'light') onChangeTheme('dark');
    if (theme === 'dark') onChangeTheme('light');
  }

  function iconToBeRendered() {
    if (theme === 'light') return <TbMoonStars size={30} />;
    if (theme === 'dark') return <BiSun size={35} color="#FFF" />;
    return null;
  }

  return (
    <Container onClick={handleToogleTheme}>
      {iconToBeRendered()}
    </Container>
  );
}

ToogleTheme.propTypes = {
  onChangeTheme: PropTypes.func.isRequired,
  theme: PropTypes.string.isRequired,
};
