import styled, { keyframes, css } from 'styled-components';

const fadeIn = keyframes`
  from { opacity: 0; }
  to { opacity: 1; }
`;

const fadeOut = keyframes`
  from { opacity: 1; }
  to { opacity: 0; }
`;

const scaleIn = keyframes`
  from { transform: scale(0); }
  to { transform: scale(1); }
`;

const scaleOut = keyframes`
  from { transform: scale(1); }
  to { transform: scale(0); }
`;

export const Overlay = styled.div`
  background: rgba(0, 0, 0, 0.7);
  position: fixed;
  width: 100%;
  height: 100%;
  left: 0;
  top: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  animation: ${fadeIn} 0.5s forwards;
  ${({ isLeaving }) =>
    isLeaving &&
    css`
      animation: ${fadeOut} 0.5s forwards;
    `}
`;

export const Container = styled.div`
  max-width: 450px;
  width: 100%;
  background: #fff;
  border-radius: 4px;
  padding: 24px;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.4);
  animation: ${scaleIn} 0.5s forwards;
  ${({ isLeaving }) =>
    isLeaving &&
    css`
      animation: ${scaleOut} 0.5s forwards;
    `}

  > h1 {
    font-size: 22px;
    color: ${({ theme, danger }) =>
      danger ? theme.colors.danger.main : theme.colors.gray[900]};
  }

  .modal-body {
    margin-top: 32px;
  }
`;

export const Footer = styled.footer`
  margin-top: 32px;
  display: flex;
  align-items: center;
  justify-content: flex-end;

  .cancel-button {
    background: transparent;
    border: none;
    font-size: 16px;
    margin-right: 16px;
    color: ${({ theme }) => theme.colors.gray[200]};

    &[disabled] {
      cursor: not-allowed;
    }
  }
`;
