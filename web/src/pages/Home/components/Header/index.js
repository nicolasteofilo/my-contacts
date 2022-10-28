/* eslint-disable react/forbid-prop-types */
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import { Container } from './styles';
import useHeader from './useHeader';

export default function Header({ hasError, qtyOfContacts, qtyOfFilteredContacts }) {
  const { aligment } = useHeader(qtyOfContacts, hasError);

  return (
    <Container justifyContent={aligment}>
      {!!(!hasError && qtyOfContacts) && (
        <strong>
          {qtyOfFilteredContacts}{' '}
          {qtyOfFilteredContacts === 1 ? 'contato' : 'contatos'}
        </strong>
      )}
      <Link to="/new">Novo contato</Link>
    </Container>
  );
}

Header.propTypes = {
  hasError: PropTypes.bool.isRequired,
  qtyOfContacts: PropTypes.number.isRequired,
  qtyOfFilteredContacts: PropTypes.number.isRequired,
}
