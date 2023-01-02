import { NextApiRequest } from "next";

import jwt from "jsonwebtoken";

import db from "_/db";

export const AUTH_COOKIE = "auth";

export const generateAuthHash = (email: string, req: NextApiRequest) => {
  const { remoteAddress } = req.socket;

  if (!remoteAddress) throw "No Remote Address!";

  return jwt.sign(
    {
      email,
    },
    remoteAddress,
    {
      expiresIn: 60 * 60 * 24,
    }
  );
};

export const getAccountFromAuthHash = async (req: NextApiRequest) => {
  const { remoteAddress } = req.socket;

  if (!remoteAddress) throw "No Remote Address!";

  const token = req.cookies["auth"];

  if (typeof token !== "string") throw "Invalid token!";

  const decoded = jwt.verify(token, remoteAddress);

  if (typeof decoded === "string") throw "Invalid JWT!";

  const { email } = decoded;

  const account = await db.account.findFirst({ where: { email: { equals: email } } });

  if (!account) throw "Email not found!";

  return account;
};
