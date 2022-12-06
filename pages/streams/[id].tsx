import Layout from "@components/layout";
import Message from "@components/message";
import useMutation from "@libs/client/useMutation";
import { Stream } from "@prisma/client";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import useSWR from "swr";

interface StreamResponse {
  ok: boolean;
  stream: Stream;
}

interface MessageForm {
  message: string;
}

export default function StreamDetail() {
  const router = useRouter();
  const { register, handleSubmit, reset } = useForm<MessageForm>();
  const { data } = useSWR<StreamResponse>(
    router.query.id ? `/api/streams/${router.query.id}` : null
  );
  const [sendMessage, { loading, data: sendMessageData }] = useMutation(
    `/api/streams/${router.query.id}/messages`
  );
  const onValid = (form: MessageForm) => {
    if (loading) return;
    reset();
    sendMessage(form);
  };
  return (
    <Layout canGoBack>
      <div className="space-y-4 px-4 py-10">
        <div className="aspect-video w-full rounded-sm bg-slate-300" />
        <div>
          <h1 className="text-3xl font-bold text-gray-900">
            {data?.stream.name}
          </h1>
          <span className="mt-3 block text-2xl text-gray-900">
            {data?.stream.price}
          </span>
          <p className="my-6 text-gray-700">{data?.stream.description}</p>
        </div>
        <div className="mt-10 h-[50vh] space-y-4 overflow-y-scroll px-4 pb-16">
          <Message message="Hi how much are you selling them for?" />
          <Message message="I want ￦20,000" reversed />
          <Message message="Hi how much are you selling them for?" />
          <Message message="I want ￦20,000" reversed />
          <Message message="Hi how much are you selling them for?" />
          <Message message="I want ￦20,000" reversed />
          <Message message="Hi how much are you selling them for?" />
          <Message message="I want ￦20,000" reversed />
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
