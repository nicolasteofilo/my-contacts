/* eslint-disable react/no-unescaped-entities */
import PropTypes from 'prop-types';

import magnifierQuestion from '../../../../assets/images/icons/magnifier-question.svg';

import { Container } from './styles';

export default function SearchNotFound({ searchTerm }) {
  return (
    <Container>
      <img src={magnifierQuestion} alt="lupa" />
      <p>
        Nenhum resultado foi encontrado para <strong>"{searchTerm}"</strong>
      </p>
    </Container>
  );
}

SearchNotFound.propTypes = {
  searchTerm: PropTypes.string.isRequired,
};
