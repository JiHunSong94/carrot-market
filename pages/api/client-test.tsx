import { NextApiRequest, NextApiResponse } from "next";
import client from "../../libs/client";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  client.user.create({
    data: {
      email: "hi",
      name: "hi",
    },
  });
  res.json({
    ok: true,
  });
}
