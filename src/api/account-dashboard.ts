import swr from "swr";

import { AccountDashboardResponse } from "_/types";

import api from "_/api";

const accountDashboard = () => api.get<AccountDashboardResponse>("/account/dashboard").then((r) => r.data);

export const useAccountDashboard = () => swr("/account/dashboard", () => accountDashboard());

export default accountDashboard;
