import Button from "@components/button";
import Input from "@components/input";
import Layout from "@components/layout";
import TextArea from "@components/textarea";
import useMutation from "@libs/client/useMutation";
import { Stream } from "@prisma/client";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { useForm } from "react-hook-form";

interface CreateForm {
  name: string;
  price: string;
  description: string;
}

interface CreateResponse {
  ok: boolean;
  stream: Stream;
}

export default function Create() {
  const router = useRouter();
  const { register, handleSubmit } = useForm<CreateForm>();
  const onValid = (form: CreateForm) => {
    if (loading) return;
    createStream(form);
  };
  const [createStream, { data, loading }] =
    useMutation<CreateResponse>(`/api/streams`);
  useEffect(() => {
    if (data && data.ok) {
      router.push(`/streams/${data.stream.id}`);
    }
  }, [data, router]);
  return (
    <Layout canGoBack title="Go Live">
      <form onSubmit={handleSubmit(onValid)} className="space-y-4 py-10 px-4">
        <Input
          register={register("name", { required: true })}
          label="Name"
          name="name"
          type="text"
          required
        />
        <Input
          register={register("price", { required: true, valueAsNumber: true })}
          label="Price"
          name="price"
          kind="price"
          type="text"
          required
        />
        <TextArea
          register={register("description", { required: true })}
          label="Description"
          name="description"
        />
        <Button text={loading ? "Loading..." : "Go live"} />
      </form>
    </Layout>
  );
}
