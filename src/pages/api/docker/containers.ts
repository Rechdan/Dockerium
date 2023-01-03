import { NextApiHandler } from "next";

const action = async () => {
  try {
    return {};
  } catch (error) {
    return { error: true };
  }
};

export default (async (_req, res) => res.json(await action())) as NextApiHandler;
