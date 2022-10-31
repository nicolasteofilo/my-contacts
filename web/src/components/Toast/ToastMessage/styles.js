import styled, { css, keyframes } from 'styled-components';

const messageIn = keyframes`
  0% { opacity: 0; transform: translateY(100px); }
  100% { opacity: 1; transform: translateY(0px); }
`;

const containerVariants = {
  default: css`
    background: ${({ theme }) => theme.colors.primary.main};
  `,
  success: css`
    background: ${({ theme }) => theme.colors.success.main};
  `,
  danger: css`
    background: ${({ theme }) => theme.colors.danger.main};
  `,
};

export const Container = styled.div`
  padding: 16px 32px;
  color: white;
  border-radius: 4px;
  box-shadow: 0px 20px 20px -16px rgba(0, 0, 0, 0.25);
  display: flex;
  align-items: center;
  justify-content: center;
  border: none;
  cursor: pointer;
  transition: all 2s;
  animation: ${messageIn} 0.5s forwards;

  & + & {
    margin-top: 12px;
  }

  img {
    margin-right: 8px;
  }

  ${({ type }) => containerVariants[type] || containerVariants.default};
`;
