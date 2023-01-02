import { NextApiHandler, NextApiRequest, NextApiResponse } from "next";

import { AccountAuthResponse } from "_/types";

import { AUTH_COOKIE, getAccountFromAuthHash } from "_/utils/auth-hash";
import { clearCookie } from "_/utils/cookies";

const action = async (req: NextApiRequest, res: NextApiResponse): Promise<AccountAuthResponse> => {
  try {
    await getAccountFromAuthHash(req);

    return { type: "success" };
  } catch (error) {
    clearCookie(res, AUTH_COOKIE);
    return { type: "error", messages: ["Server error!"] };
  }
};

const route: NextApiHandler = async (req, res) => res.json(await action(req, res));

export default route;
