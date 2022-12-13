import Link from "next/link";
import Layout from "@components/layout";
import useSWR from "swr";
import { ChatRoom } from "@prisma/client";

interface ChatResponse {
  ok: boolean;
  chatRooms: ChatRoom[];
}

export default function Chats() {
  const { data } = useSWR<ChatResponse>("/api/chats");
  return (
    <Layout hasTabBar>
      <div className="divide-y-[1px]">
        {data?.chatRooms.map((chatRoom) => (
          <Link href={`/chats/${chatRoom.id}`} key={chatRoom.id}>
            <div className=" mb-3 flex cursor-pointer items-center space-x-3 px-4  py-3">
              <div className="h-12 w-12 rounded-full bg-slate-300" />
              <div>
                <p className="text-gray-700">Steve Jebs</p>
                <p className="text-sm  text-gray-500">
                  See you tommorrow in the corner at 2pm!
                </p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </Layout>
  );
}
