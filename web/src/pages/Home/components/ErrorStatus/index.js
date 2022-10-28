import PropTypes from 'prop-types';

import { Container } from './styles';

import Button from '../../../../components/Button';

import sad from '../../../../assets/images/icons/sad.svg';

export default function ErrorStatus({ onTryAgain }) {
  return (
    <Container>
      <img src={sad} alt="Cara triste" />
      <div className="details">
        <span>Ocorreu um erro ao obter os seus contatos!</span>
        <Button onClick={onTryAgain}>Tentar novamente</Button>
      </div>
    </Container>
  );
}

ErrorStatus.propTypes = {
  onTryAgain: PropTypes.func.isRequired,
}
