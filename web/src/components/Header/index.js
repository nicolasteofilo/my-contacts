import logo from '../../assets/images/logo.svg';

import { Container } from './styles';

export default function Header() {
  return (
    <Container>
      <img src={logo} alt="MyContacts" width="201" />
    </Container>
  );
}
