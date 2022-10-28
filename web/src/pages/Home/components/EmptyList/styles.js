import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  margin-top: 16px;

  p {
    text-align: center;
    color: ${({ theme }) => theme.colors.gray[200]};
    margin-top: 16px;
    padding: 0px 15px;

    strong {
      color: ${({ theme }) => theme.colors.primary.main};
    }
  }
`;
