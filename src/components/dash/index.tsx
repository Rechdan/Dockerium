import { memo } from "react";

import Auth from "_/components/dash/auth";
import DashProvider from "_/components/dash/context";

export type DashProps =
  | {
      page: "home";
    }
  | {
      page: "account-profile";
    };

const Dash = memo((props: DashProps) => (
  <DashProvider {...props}>
    <Auth />
  </DashProvider>
));

export default Dash;
