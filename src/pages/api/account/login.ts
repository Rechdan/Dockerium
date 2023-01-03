import { NextApiHandler } from "next";

import argon2 from "argon2";

import { AccountLoginResponse } from "_/types";

import db from "_/db";

import { AUTH_COOKIE, generateAuthHash } from "_/utils/auth-hash";
import { setCookie } from "_/utils/cookies";

import { accountLoginValidator, ValidationError } from "_/validators";

const route: NextApiHandler<AccountLoginResponse> = async (req, res) => {
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
              isAdmin: true,
              email,
              password: await argon2.hash(password),
              name: "Administrator",
            },
          });
        }

        setCookie(res, AUTH_COOKIE, hash);

        return res.json({ type: "success" });
      }

      return res.json({ type: "error", messages: ["Email or password is invalid!"] });
    }

    return res.json({ type: "error", messages: ["Invalid method!"] });
  } catch (error) {
    if (error instanceof ValidationError) {
      return res.json({ type: "error", messages: error.errors });
    } else if (typeof error === "string") {
      return res.json({ type: "error", messages: [error] });
    } else {
      console.error("/account/login", error);
      return res.json({ type: "error", messages: ["Server error!"] });
    }
  }
};

export default route;
