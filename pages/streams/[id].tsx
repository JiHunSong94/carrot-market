import Layout from "@components/layout";
import Message from "@components/message";
import useMutation from "@libs/client/useMutation";
import useUser from "@libs/client/useUser";
import { Stream } from "@prisma/client";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import useSWR from "swr";

interface StreamMessage {
  id: number;
  message: string;
  user: {
    avatar?: string;
    id: number;
  };
}

interface StreamWithMessages extends Stream {
  messages: StreamMessage[];
}

interface StreamResponse {
  ok: boolean;
  stream: StreamWithMessages;
}

interface MessageForm {
  message: string;
}

export default function StreamDetail() {
  const router = useRouter();
  const { user } = useUser();
  const { register, handleSubmit, reset } = useForm<MessageForm>();
  const { data, mutate } = useSWR<StreamResponse>(
    router.query.id ? `/api/streams/${router.query.id}` : null,
    {
      refreshInterval: 1000,
    }
  );
  const [sendMessage, { loading, data: sendMessageData }] = useMutation(
    `/api/streams/${router.query.id}/messages`
  );
  const onValid = (form: MessageForm) => {
    if (loading) return;
    reset();
    mutate(
      (prev) =>
        prev &&
        ({
          ...prev,
          stream: {
            ...prev.stream,
            messages: [
              ...prev.stream.messages,
              { id: Date.now(), message: form.message, user: { ...user } },
            ],
          },
        } as any),
      false
    );
    //sendMessage(form);
  };

  return (
    <Layout canGoBack>
      <div className="space-y-4 px-4 py-10">
        <div className="aspect-video w-full rounded-sm bg-slate-300" />
        <div>
          <h1 className="text-3xl font-bold text-gray-900">
            {data?.stream?.name}
          </h1>
          <span className="mt-3 block text-2xl text-gray-900">
            {data?.stream?.price}
          </span>
          <p className="my-6 text-gray-700">{data?.stream?.description}</p>
        </div>
        <h2 className="text-2xl font-bold text-gray-900">Live Chat</h2>
        <div className="h-[50vh] space-y-4 overflow-y-scroll px-4 py-10 pb-16">
          {data?.stream.messages.map((message) => (
            <Message
              key={message.id}
              message={message.message}
              reversed={message.user.id === user?.id}
            />
          ))}
        </div>
        <form
          onSubmit={handleSubmit(onValid)}
          className="fixed inset-x-0 bottom-0 bg-white py-2"
        >
          <div className="relative mx-auto flex w-full max-w-md items-center">
            <input
              {...register("message", { required: true })}
              type="text"
              className="w-full rounded-full border-gray-300 shadow-sm focus:border-orange-500 focus:outline-none focus:ring-orange-500"
            />
            <div className="absolute inset-y-0 right-0 flex py-1.5 pr-1.5">
              <button className="hover:bg-oranger-600 flex cursor-pointer items-center rounded-full bg-orange-500 px-3  text-sm text-white focus:ring-2 focus:ring-orange-500 focus:ring-offset-2">
                &rarr;
              </button>
            </div>
          </div>
        </form>
      </div>
    </Layout>
  );
}
