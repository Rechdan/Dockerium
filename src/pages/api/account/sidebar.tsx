import { NextApiHandler } from "next";

import { AccountSidebarResponse } from "_/types";

import db from "_/db";

import { getAccountFromAuthHash } from "_/utils/auth-hash";

const route: NextApiHandler<AccountSidebarResponse> = async (req, res) => {
  try {
    const { id, isAdmin, name, created } = await getAccountFromAuthHash(req);

    const projects = await db.project.findMany({
      where: {
        accounts: { every: { accountId: { equals: id } } },
      },
    });

    const teams = await db.team.findMany({
      where: {
        members: { every: { accountId: { equals: id } } },
      },
    });

    return res.json({ type: "success", account: { id, isAdmin, name, created }, projects, teams });
  } catch (error) {
    if (typeof error === "string") {
      return res.json({ type: "error", messages: [error] });
    } else {
      console.error("/account/sidebar", error);
      return res.json({ type: "error", messages: ["Server error!"] });
    }
  }
};

export default route;
