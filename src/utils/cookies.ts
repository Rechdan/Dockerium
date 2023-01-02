import { NextApiResponse } from "next";

import { CookieSerializeOptions, serialize } from "cookie";

export const setCookie = (res: NextApiResponse, name: string, value: unknown, options: CookieSerializeOptions = {}) => {
  const stringValue = typeof value === "object" ? "j:" + JSON.stringify(value) : String(value);

  if (typeof options.maxAge === "number") {
    options.expires = new Date(Date.now() + options.maxAge * 1000);
  }

  res.setHeader("Set-Cookie", serialize(name, stringValue, options));
};

export const clearCookie = (res: NextApiResponse, name: string) => {
  setCookie(res, name, null, { maxAge: -1 });
};
