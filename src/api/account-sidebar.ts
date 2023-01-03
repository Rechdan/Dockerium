import swr from "swr";

import { AccountSidebarResponse } from "_/types";

import api from "_/api";

const accountSidebar = () => api.get<AccountSidebarResponse>("/account/sidebar").then((r) => r.data);

export const useAccountSidebar = () => swr("/account/sidebar", () => accountSidebar());

export default accountSidebar;
