import { memo } from "react";

import { useAccountAuth } from "_/api/account-auth";
import Main from "_/components/dash/main";
import SignIn from "_/components/dash/sign-in";

const Auth = memo(() => {
  const accountAuth = useAccountAuth();

  if (!accountAuth.data) return null;

  const authenticated = accountAuth.data.type === "success";

  if (!authenticated) {
    return <SignIn />;
  }

  return <Main />;
});

export default Auth;
