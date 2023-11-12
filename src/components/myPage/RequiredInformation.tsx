import styled from "styled-components";

export default function RequiredInformation() {


  return (
    <RequiredInformationWrap>
      필수 정보 div
    </RequiredInformationWrap>
  )
}

const RequiredInformationWrap = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
`;