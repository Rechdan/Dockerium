import swr from "swr";

import { AccountAuthResponse } from "_/types";

import api from "_/api";

const accountAuth = () => api.get<AccountAuthResponse>("/account/auth").then((r) => r.data);

export const useAccountAuth = () => swr("/account/auth", () => accountAuth());

export default accountAuth;
