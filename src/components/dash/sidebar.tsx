import { memo } from "react";

import styled from "styled-components";

import { BORDER_SIDEBAR_TITLE, COLOR_SIDEBAR, PROJECT_NAME, SHADOW_SIDEBAR } from "_/consts";

import { useDash } from "_/components/dash/context";
import Navigation, { NavigationLink, NavigationLinks, NavigationTitle } from "_/components/dash/navigation";

const StyledContainer = styled.div`
  flex: 0 0 auto;
  background-color: ${COLOR_SIDEBAR};
  box-shadow: ${SHADOW_SIDEBAR};
  padding: 3rem 1rem;
  flex-flow: column;
  display: flex;
  width: 22rem;
  gap: 3rem;
`;

const StyledTitle = styled.div`
  border-bottom: ${BORDER_SIDEBAR_TITLE};
  text-align: center;
  font-weight: 900;
  font-size: 2rem;
  margin: 0 auto;
`;

const Sidebar = memo(() => {
  const { page } = useDash();

  return (
    <StyledContainer>
      <StyledTitle>{PROJECT_NAME}</StyledTitle>

      <Navigation>
        <NavigationTitle>Navigation</NavigationTitle>
        <NavigationLinks>
          <NavigationLink href="/" $active={page === "home"}>
            Home Page
          </NavigationLink>
          <NavigationLink href="/account" $active={page === "account-profile"}>
            Account
          </NavigationLink>
        </NavigationLinks>
      </Navigation>

      <Navigation>
        <NavigationTitle>Your Docker</NavigationTitle>
        <NavigationLinks>
          <NavigationLink href="/docker/containers">Containers</NavigationLink>
          <NavigationLink href="/docker/images">Images</NavigationLink>
        </NavigationLinks>
      </Navigation>
    </StyledContainer>
  );
});

export default Sidebar;
