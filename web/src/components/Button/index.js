import styled from 'styled-components';

export default styled.button`
  width: 100%;
  height: 52px;
  border: none;
  font-weight: bold;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.4);
  border-radius: 4px;
  color: #fff;
  font-size: 16px;
  transition: background 0.2s ease-in;
  background: ${({ theme }) => theme.colors.primary.main};

  &:hover {
    background: ${({ theme }) => theme.colors.primary.light};
  }

  &:active {
    background: ${({ theme }) => theme.colors.primary.dark};
  }

  &[disabled] {
    background: #ccc;
    cursor: default;
  }
`;
