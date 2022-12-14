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
    query: { id },
    session: { user },
  } = req;
  const chatRoom = await client.chatRoom.findFirst({
    where: {
      OR: [{ buyerId: user?.id }, { sellerId: user?.id }],
    },
    include: {
      chatMessages: {
        select: {
          id: true,
          message: true,
          createdAt: true,
          user: { select: { id: true, avatar: true } },
        },
      },
      product: {
        select: {
          id: true,
          name: true,
          price: true,
          image: true,
        },
      },
      buyer: {
        select: {
          id: true,
          avatar: true,
          name: true,
        },
      },
      seller: {
        select: {
          id: true,
          avatar: true,
          name: true,
        },
      },
    },
  });
  res.json({ ok: true, chatRoom });
}

export default withApiSession(
  withHandler({
    methods: ["GET"],
    handler,
  })
);
