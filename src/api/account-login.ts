import { AccountLoginResponse } from "_/types";

import api from "_/api";

const accountLogin = (email: string, password: string) =>
  api
    .post<AccountLoginResponse>("/account/login", {
      email,
      password,
    })
    .then((r) => r.data);

export default accountLogin;
