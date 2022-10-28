import styled from "styled-components";

export const Container = styled.div`
  margin-top: 16px;
  display: flex;
  align-items: center;

  .details {
    margin-left: 24px;

    button {
      width: 181px;
      margin-top: 8px;
    }

    span {
      font-weight: 700;
      font-size: 18px;
      line-height: 28px;
      color: ${({ theme }) => theme.colors.danger.main};
      display: block;
    }
  }
`;
