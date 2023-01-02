import { NextApiHandler, NextApiRequest, NextApiResponse } from "next";

import argon2 from "argon2";

import { AccountLoginResponse } from "_/types";

import db from "_/db";

import { AUTH_COOKIE, generateAuthHash } from "_/utils/auth-hash";
import { setCookie } from "_/utils/cookies";

import { accountLoginValidator, ValidationError } from "_/validators";

const action = async (req: NextApiRequest, res: NextApiResponse<AccountLoginResponse>): Promise<AccountLoginResponse> => {
  try {
    if (req.method === "POST") {
      const { email, password } = await accountLoginValidator.validate(req.body, { abortEarly: false });

      let account = await db.account.findFirst({ where: { email } });
      let isFirstAccount = false;

      if ((account && (await argon2.verify(account.password, password))) || (isFirstAccount = (await db.account.count()) < 1)) {
        const hash = generateAuthHash(email, req);

        if (isFirstAccount) {
          account = await db.account.create({
            data: {
              email,
              password: await argon2.hash(password),
            },
          });
        }

        setCookie(res, AUTH_COOKIE, hash);

        return { type: "success" };
      }

      return { type: "error", messages: ["Email or password is invalid!"] };
    }

    return { type: "error", messages: ["Invalid method!"] };
  } catch (error) {
    if (error instanceof ValidationError) {
      return { type: "error", messages: error.errors };
    } else {
      console.error("/account/login", error);
      return { type: "error", messages: ["Server error!"] };
    }
  }
};

const route: NextApiHandler = async (req, res) => res.json(await action(req, res));

export default route;
