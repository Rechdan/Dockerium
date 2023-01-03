import Link from "next/link";

import { memo } from "react";

import styled from "styled-components";

import { BORDER_SIDEBAR_TITLE, COLOR_SIDEBAR, COLOR_SIDEBAR_ITEM_LINK, COLOR_SIDEBAR_ITEM_LINK_ACTIVE, PROJECT_NAME, SHADOW_SIDEBAR } from "_/consts";

import { useAccountSidebar } from "_/api/account-sidebar";
import { useDash } from "_/components/dash/context";

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

const StyledNavigation = styled.div`
  flex: 0 0 auto;
  flex-flow: column;
  display: flex;
  gap: 1rem;
`;

const StyledNavigationTitle = styled.div`
  flex: 0 0 auto;
  text-transform: uppercase;
  font-weight: 900;
  text-align: left;
`;

const StyledNavigationLinks = styled.div`
  flex: 0 0 auto;
  flex-flow: column;
  display: flex;
  gap: 2px;
`;

type StyledNavigationLinkProps = {
  $active?: boolean;
};

const StyledNavigationLink = styled(Link)<StyledNavigationLinkProps>`
  flex: 0 0 auto;
  background-color: ${(p) => (p.$active ? COLOR_SIDEBAR_ITEM_LINK_ACTIVE : COLOR_SIDEBAR_ITEM_LINK)};
  font-weight: ${(p) => (p.$active ? 700 : 400)};
  border-radius: 0.5rem;
  padding: 1rem;
  &:has(+ &) {
    border-bottom-right-radius: 0;
    border-bottom-left-radius: 0;
  }
  & + & {
    border-top-right-radius: 0;
    border-top-left-radius: 0;
  }
`;

const Sidebar = memo(() => {
  const { page } = useDash();

  const { data: sidebarData } = useAccountSidebar();

  return (
    <StyledContainer>
      <StyledTitle>{PROJECT_NAME}</StyledTitle>

      <StyledNavigation>
        <StyledNavigationTitle>Navigation</StyledNavigationTitle>
        <StyledNavigationLinks>
          <StyledNavigationLink href="/" $active={page === "home"}>
            Home Page
          </StyledNavigationLink>
          <StyledNavigationLink href="/account" $active={page === "account-profile"}>
            Account
          </StyledNavigationLink>
        </StyledNavigationLinks>
      </StyledNavigation>

      <StyledNavigation>
        <StyledNavigationTitle>Projects</StyledNavigationTitle>
        <StyledNavigationLinks>
          <StyledNavigationLink href="/projects" $active={page === "account-projects"}>
            Your&apos;s projects
          </StyledNavigationLink>
          {sidebarData &&
            sidebarData.type === "success" &&
            sidebarData.projects.map(({ id, name }) => (
              <StyledNavigationLink key={id} href={`/projects/${id}`}>
                {name}
              </StyledNavigationLink>
            ))}
        </StyledNavigationLinks>
      </StyledNavigation>

      <StyledNavigation>
        <StyledNavigationTitle>Teams</StyledNavigationTitle>
        <StyledNavigationLinks>
          <StyledNavigationLink href="/teams" $active={page === "account-teams"}>
            Your&apos;s teams
          </StyledNavigationLink>
          {sidebarData &&
            sidebarData.type === "success" &&
            sidebarData.teams.map(({ id, name }) => (
              <StyledNavigationLink key={id} href={`/teams/${id}`}>
                {name}
              </StyledNavigationLink>
            ))}
        </StyledNavigationLinks>
      </StyledNavigation>

      <StyledNavigation>
        <StyledNavigationTitle>Your Docker</StyledNavigationTitle>
        <StyledNavigationLinks>
          <StyledNavigationLink href="/docker/containers" $active={page === "docker-containers"}>
            Containers
          </StyledNavigationLink>
          <StyledNavigationLink href="/docker/images" $active={page === "docker-images"}>
            Images
          </StyledNavigationLink>
        </StyledNavigationLinks>
      </StyledNavigation>
    </StyledContainer>
  );
});

export default Sidebar;
