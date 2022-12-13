import { NextApiRequest, NextApiResponse } from "next";
import withHandler, { ResponseType } from "@libs/server/withHandler";
import { withIronSessionApiRoute } from "iron-session/next";
import client from "@libs/server/client";
import { withApiSession } from "@libs/server/withSession";

async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseType>
) {
  const {
    session: { user },
    query: { id },
    body: { message },
  } = req;
  const newMessage = await client.chatMessage.create({
    data: {
      message,
      user: {
        connect: {
          id: user?.id,
        },
      },
      chatRoom: {
        connect: {
          id: Number(id),
        },
      },
    },
  });
  res.json({ ok: true, message: newMessage });
}

export default withApiSession(
  withHandler({
    methods: ["POST"],
    handler,
  })
);
