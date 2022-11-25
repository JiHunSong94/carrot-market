import { NextApiRequest, NextApiResponse } from "next";
import withhHandler, { ResponseType } from "@libs/server/withHandler";
import { withIronSessionApiRoute } from "iron-session/next";
import client from "@libs/server/client";

async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseType>
) {
  const { token } = req.body;
  const exists = await client.token.findUnique({
    where: { payload: token },
  });
  if (!exists) res.status(404).end();
  req.session.user = {
    id: exists?.userId,
  };
  await req.session.save();
  res.status(200).end();
}

export default withIronSessionApiRoute(withhHandler("POST", handler), {
  cookieName: "carrotsession",
  password:
    "2413544357648712364871632131asdfasdgarqweqew13rw53qhw45532rwtrhq45q3rfqr",
});
