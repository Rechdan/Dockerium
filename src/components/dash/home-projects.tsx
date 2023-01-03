import Link from "next/link";

import { memo } from "react";

import styled from "styled-components";

import { useAccountDashboard } from "_/api/account-dashboard";

const StyledContainer = styled.div`
  flex: 0 0 auto;
  grid-template-columns: repeat(auto-fill, minmax(16rem, 1fr));
  display: grid;
  gap: 1rem;
`;

const StyledProjectBox = styled.div``;

const StyledNewProject = styled.div`
  grid-area: auto / 4;
  justify-content: center;
  align-items: center;
  flex-flow: column;
  display: flex;
`;

const StyledNewProjectButton = styled(Link)`
  flex: 0 0 auto;
`;

const HomeProjects = memo(() => {
  const { data } = useAccountDashboard();

  if (!data || data.type === "error") return null;

  const { projects } = data;

  return (
    <StyledContainer>
      {projects.map(({ id, name, accounts }) => (
        <StyledProjectBox key={id}>
          <p>{name}</p>
          <ul>
            {accounts.map(({ account }) => (
              <li key={account.id}>{account.name}</li>
            ))}
          </ul>
        </StyledProjectBox>
      ))}
      <StyledNewProject>
        <StyledNewProjectButton href="/projects/new">Add new Project</StyledNewProjectButton>
      </StyledNewProject>
    </StyledContainer>
  );
});

export default HomeProjects;
