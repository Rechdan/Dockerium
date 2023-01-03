import { NextApiHandler } from "next";

import { AccountDashboardResponse } from "_/types";

import db from "_/db";

import { getAccountFromAuthHash } from "_/utils/auth-hash";

const route: NextApiHandler<AccountDashboardResponse> = async (req, res) => {
  try {
    const account = await getAccountFromAuthHash(req);

    const projects = await db.project.findMany({
      select: {
        id: true,
        name: true,
        accounts: { select: { account: { select: { id: true, name: true } } } },
      },
      where: {
        accounts: { some: { accountId: { equals: account.id } } },
      },
    });

    const teams = await db.team.findMany({
      select: {
        id: true,
        name: true,
        members: {
          select: { account: { select: { id: true, name: true } } },
        },
        projects: {
          select: { project: { select: { id: true, name: true } } },
        },
      },
      where: {
        members: { some: { accountId: { equals: account.id } } },
      },
    });

    return res.json({ type: "success", teams, projects });
  } catch (error) {
    if (typeof error === "string") {
      return res.json({ type: "error", messages: [error] });
    } else {
      console.error("/account/dashboard", error);
      return res.json({ type: "error", messages: ["Server error!"] });
    }
  }
};

export default route;
