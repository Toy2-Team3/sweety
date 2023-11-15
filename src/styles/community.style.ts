import styled from "styled-components";

export const CommunityButtonWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: right;
  gap: 1rem;

  ${(props) => props.theme.response.mobile} {
    width: 100%;
  }
`;
