import { memo } from "react";

import { useAccountDashboard } from "_/api/account-dashboard";

const AccountProjects = memo(() => {
  const { data } = useAccountDashboard();

  if (!data) return null;

  if (data.type === "error") return <>{data.type}</>;

  const { projects, teams } = data;

  return (
    <>
      <pre>{JSON.stringify(projects, null, 4)}</pre>
      <pre>{JSON.stringify(teams, null, 4)}</pre>
    </>
  );
});

export default AccountProjects;
