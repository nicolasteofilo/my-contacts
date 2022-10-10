import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';

import Spinner from '../Spinner';

import { Overlay } from './styles';

export default function Loader({ isLoading }) {
  if (isLoading) {
    return ReactDOM.createPortal(
      <Overlay>
        <Spinner size={90} />
      </Overlay>,
      document.getElementById('loader-root')
    );
  }
  return null;
}

Loader.propTypes = {
  isLoading: PropTypes.bool.isRequired,
};
