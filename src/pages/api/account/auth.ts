import { NextApiHandler } from "next";

import { AccountAuthResponse } from "_/types";

import { AUTH_COOKIE, getAccountFromAuthHash } from "_/utils/auth-hash";
import { clearCookie } from "_/utils/cookies";

const route: NextApiHandler<AccountAuthResponse> = async (req, res) => {
  try {
    await getAccountFromAuthHash(req);

    return res.json({ type: "success" });
  } catch (error) {
    clearCookie(res, AUTH_COOKIE);
    if (typeof error === "string") {
      return res.json({ type: "error", messages: [error], interceptable: false });
    } else {
      console.error("/account/auth", error);
      return res.json({ type: "error", messages: ["Server error!"] });
    }
  }
};

export default route;
