import { NextApiRequest, NextApiResponse } from "next";
import withhHandler, { ResponseType } from "@libs/server/withHandler";
import { withIronSessionApiRoute } from "iron-session/next";
import client from "@libs/server/client";

declare module "iron-session" {
  interface IronSessionData {
    user?: {
      id: number;
    };
  }
}

async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseType>
) {
  console.log(req.session.user);
  const profile = await client.user.findUnique({
    where: { id: req.session.user?.id },
  });

  res.json({ ok: true, profile });
}

export default withIronSessionApiRoute(withhHandler("GET", handler), {
  cookieName: "carrotsession",
  password:
    "2413544357648712364871632131asdfasdgarqweqew13rw53qhw45532rwtrhq45q3rfqr",
});
