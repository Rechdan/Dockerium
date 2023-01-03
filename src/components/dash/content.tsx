import { memo, useMemo } from "react";

import styled from "styled-components";

import { useDash } from "_/components/dash/context";
import HomeProjects from "_/components/dash/home-projects";

const StyledContainer = styled.div`
  flex: 1 1 auto;
  flex-flow: column;
  display: flex;
`;

const StyledBody = styled.div`
  flex: 0 0 auto;
  padding: 3rem 1rem;
  min-height: 100vh;
  flex-flow: column;
  position: sticky;
  margin: 0 auto;
  display: flex;
  width: 80%;
  gap: 3rem;
  left: 0;
  top: 0;
`;

const Content = memo(() => {
  const dash = useDash();

  const innerContent = useMemo(() => {
    switch (dash.page) {
      case "home":
        return (
          <>
            <HomeProjects />
          </>
        );

      case "account-projects-new":
        return (
          <>
            <h1>New Project!</h1>
          </>
        );

      default:
        return null;
    }
  }, [dash.page]);

  return (
    <StyledContainer>
      <StyledBody>{innerContent}</StyledBody>
    </StyledContainer>
  );
});

export default Content;
