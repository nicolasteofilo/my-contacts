/* eslint-disable react/jsx-props-no-spreading */
import PropTypes from 'prop-types';
import Spinner from '../Spinner';
import { StyledButton } from './styles';

export default function Button({ 
  children,
  type = 'button',
  disabled = false,
  isLoading = false,
  ...rest
}) {
  return (
    <StyledButton type={type} disabled={disabled || isLoading} {...rest}>
      {!isLoading && children} {isLoading && <Spinner size={16} />}
    </StyledButton>
  );
}

Button.propTypes = {
  type: PropTypes.string,
  disabled: PropTypes.bool,
  children: PropTypes.node.isRequired,
  isLoading: PropTypes.bool,
};
