import { memo } from "react";

import styled from "styled-components";

import Sidebar from "_/components/dash/sidebar";

const StyledContainer = styled.div`
  min-height: 100vh;
  flex-flow: row;
  display: flex;
  width: 100%;
`;

const Main = memo(() => (
  <StyledContainer>
    <Sidebar />
  </StyledContainer>
));

export default Main;
