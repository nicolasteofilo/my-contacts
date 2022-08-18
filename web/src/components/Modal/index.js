import { Overlay, Container, Footer } from './styles';

import Button from '../Button';

export default function Modal() {
  return (
    <Overlay>
      <Container>
        <h1>Modal title</h1>
        <p>Description of modal</p>
        <Footer>
          <button type="button" className="cancel-button">
            Cancelar
          </button>
          <Button type="button">Deletar</Button>
        </Footer>
      </Container>
    </Overlay>
  );
}
