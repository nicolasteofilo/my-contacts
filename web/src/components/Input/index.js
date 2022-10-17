import styled, { css } from 'styled-components';

export default styled.input`
  width: 100%;
  border: none;
  outline: none;
  border: 2px solid #fff;
  backgroud: #fff;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.4);
  height: 54px;
  border-radius: 4px;
  padding: 0 16px;
  font-size: 16px;
  font-family: 'Sora', sans-serif;
  transition: border-color 0.2s ease-in;
  appearance: none;

  &:focus {
    border-color: ${({ theme }) => theme.colors.primary.main};
  }

  ${({ theme, error }) =>
    error &&
    css`
      color: ${theme.colors.danger.main};
      border-color: ${theme.colors.danger.main} !important;
    `}

  &[disabled] {
    background-color: ${({ theme }) => theme.colors.gray[100]};
    border-color: ${({ theme }) => theme.colors.gray[200]};
  }
`;
