import logo from '../../assets/images/logo.svg';

import { Container, InputSearchContainer } from './styles';

export default function Header() {
  return (
    <Container>
      <img src={logo} alt="MyContacts" width="201" />

      <InputSearchContainer>
        <input type="text" placeholder="Pesquisar contato..." />
      </InputSearchContainer>
    </Container>
  );
}
