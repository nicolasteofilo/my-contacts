import styled from 'styled-components';

export default styled.select`
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

  &:focus {
    border-color: ${({ theme }) => theme.colors.primary.main};
  }
`;
