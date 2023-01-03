import { memo, useMemo } from "react";

import styled from "styled-components";

import AccountProjects from "_/components/dash/account-projects";
import { useDash } from "_/components/dash/context";

const StyledContainer = styled.div`
  flex: 1 1 auto;
  flex-flow: column;
  display: flex;
`;

const StyledBody = styled.div`
  flex: 0 0 auto;
  padding: 3rem 1rem;
  flex-flow: column;
  margin: 0 auto;
  display: flex;
  width: 80%;
  gap: 3rem;
`;

const Content = memo(() => {
  const dash = useDash();

  const innerContent = useMemo(() => {
    switch (dash.page) {
      case "home":
        return (
          <>
            <AccountProjects />
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
