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
    body: { product },
  } = req;

  if (req.method === "POST") {
    const alreadyExist = await client.chatRoom.findFirst({
      where: {
        productId: product.id,
        buyerId: user?.id,
        sellerId: product.user.id,
      },
      select: {
        id: true,
      },
    });
    if (alreadyExist) {
      res.json({ ok: true, chatRoomId: alreadyExist.id });
    }
    if (!alreadyExist) {
      const chatRoom = await client.chatRoom.create({
        data: {
          product: {
            connect: {
              id: product.id,
            },
          },
          buyer: {
            connect: {
              id: user?.id,
            },
          },
          seller: {
            connect: {
              id: user?.id,
            },
          },
        },
      });
      res.json({ ok: true, chatRoomId: chatRoom.id });
    }
  }
  if (req.method === "GET") {
    const chatRooms = await client.chatRoom.findMany({
      where: {
        buyerId: user!.id,
      },
    });
    res.json({ ok: true, chatRooms });
  }
}

export default withApiSession(
  withHandler({
    methods: ["GET", "POST"],
    handler,
  })
);
