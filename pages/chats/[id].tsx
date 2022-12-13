import Layout from "@components/layout";
import Message from "@components/message";
import useMutation from "@libs/client/useMutation";
import useUser from "@libs/client/useUser";
import { ChatRoom, Product, User } from "@prisma/client";
import { useRouter } from "next/router";
import { useEffect, useRef } from "react";
import { useForm } from "react-hook-form";
import useSWR from "swr";

interface ChatMessage {
  id: number;
  message: string;
  createdAt: Date;
  user: {
    id: number;
    avatar?: string;
  };
}

interface ChatRoomWithMessage extends ChatRoom {
  buyer: User;
  seller: User;
  product: Product;
  chatMessages: ChatMessage[];
}

interface ChatRoomResponse {
  ok: boolean;
  chatRoom: ChatRoomWithMessage;
}

interface MessageForm {
  message: string;
}

export default function ChatDetail() {
  const { user } = useUser();
  const router = useRouter();
  const scrollRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    scrollRef?.current?.scrollIntoView();
  });
  const { register, handleSubmit, reset } = useForm<MessageForm>();
  const { data, mutate } = useSWR<ChatRoomResponse>(
    router.query.id ? `/api/chats/${router.query.id}` : null
  );
  const [sendMessage, { data: messageData, loading }] = useMutation(
    `/api/chats/${router.query.id}/messages`
  );
  const onValid = (form: MessageForm) => {
    if (loading) return;
    sendMessage(form);
    mutate(
      (prev) =>
        prev && {
          ...prev,
          chatRoom: {
            ...prev.chatRoom,
            chatMessages: [
              ...prev.chatRoom.chatMessages,
              {
                id: Date.now(),
                createdAt: Date.now(),
                message: form.message,
                user: { ...user },
              },
            ],
          } as any,
        },
      false
    );
    reset();
  };
  return (
    <Layout
      canGoBack
      title={
        user?.id === data?.chatRoom.sellerId
          ? data?.chatRoom.buyer.name
          : user?.id === data?.chatRoom.buyerId
          ? data?.chatRoom.seller.name
          : ""
      }
    >
      <div className="h-[85vh] space-y-4 overflow-y-scroll px-4 pt-2">
        {data?.chatRoom.chatMessages.map((message, index) => (
          <div key={index} ref={scrollRef}>
            <Message
              message={message.message}
              reversed={data.chatRoom.buyerId === user?.id}
            />
          </div>
        ))}
        <div>
          <form
            onSubmit={handleSubmit(onValid)}
            className="fixed inset-x-0 bottom-0  bg-white py-2"
          >
            <div className="relative mx-auto flex w-full  max-w-md items-center">
              <input
                {...register("message", { required: true })}
                type="text"
                className="w-full rounded-full border-gray-300 pr-12 shadow-sm focus:border-orange-500 focus:outline-none focus:ring-orange-500"
              />
              <div className="absolute inset-y-0 right-0 flex py-1.5 pr-1.5">
                <button className="flex items-center rounded-full bg-orange-500 px-3 text-sm text-white hover:bg-orange-600 focus:ring-2 focus:ring-orange-500 focus:ring-offset-2">
                  &rarr;
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </Layout>
  );
}
