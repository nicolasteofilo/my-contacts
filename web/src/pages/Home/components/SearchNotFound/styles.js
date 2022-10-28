import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: center;
  margin-top: 16px;

  p {
    margin-left: 24px;
    color: ${({ theme }) => theme.colors.gray[200]};
    word-break: break-word;
  }
`;
