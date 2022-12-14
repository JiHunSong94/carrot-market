import Button from "@components/button";
import Layout from "@components/layout";
import useMutation from "@libs/client/useMutation";
import useUser from "@libs/client/useUser";
import { cls } from "@libs/client/utils";
import { Product, User } from "@prisma/client";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import useSWR, { useSWRConfig } from "swr";

interface ProductWithUser extends Product {
  user: User;
}

interface ItemDetailResponse {
  ok: boolean;
  product: ProductWithUser;
  relatedProducts: Product[];
  isLiked: boolean;
}

export default function ItemDetail() {
  const { user, isLoading } = useUser();
  const router = useRouter();
  const [isYou, setIsYou] = useState(false);
  const { mutate } = useSWRConfig();
  const { data, mutate: boundMutate } = useSWR<ItemDetailResponse>(
    router.query.id ? `/api/products/${router.query.id}` : null
  );
  const [toggleFav] = useMutation(`/api/products/${router.query.id}/fav`);
  const onFavClick = () => {
    if (!data) return;
    boundMutate((prev) => prev && { ...prev, isLiked: !prev.isLiked }, false);
    /* mutate(
      "/api/users/me",
      (prev: any) => {
        ok: !prev.ok;
      },
      false
    ); */
    toggleFav({});
  };
  const [moveChatRoom, { data: moveChatData, loading: moveChatLoading }] =
    useMutation(`/api/chats`);
  const onClickChat = () => {
    if (moveChatLoading) return;
    moveChatRoom({ ...data });
  };
  useEffect(() => {
    if (user?.id === data?.product.user.id) {
      setIsYou(true);
    }
    if (moveChatData?.ok) {
      router.push(`/chats/${moveChatData.chatRoomId}`);
    }
  }, [user, data, moveChatData, router]);
  return (
    <Layout canGoBack>
      <div className="px-4 py-10">
        <div className="mb-8">
          <div className="relative pb-80">
            <Image
              src={`https://imagedelivery.net/uaB8OCwMo25DlQ8NyNlAzw/${data?.product.image}/public`}
              className="bg-slate-300 object-cover"
              layout="fill"
              alt="bigItemImage"
            />
          </div>
          <div className="flex cursor-pointer items-center space-x-3 border-t border-b py-3">
            <Image
              width={48}
              height={48}
              src={`https://imagedelivery.net/uaB8OCwMo25DlQ8NyNlAzw/${data?.product.user.avatar}/avatar`}
              className="h-12 w-12 rounded-full bg-slate-300"
              alt="avatarImage"
            />
            <div>
              <p className="fond-medium text-sm text-gray-700">
                {data?.product?.user?.name}
              </p>
              <Link href={`/users/profiles/${data?.product?.user?.id}`}>
                <p className="text-xs font-medium text-gray-500">
                  View profile &rarr;
                </p>
              </Link>
            </div>
          </div>
          <div className="mt-5">
            <h1 className="text-3xl font-bold text-gray-900">
              {data?.product?.name}
            </h1>
            <p className="mt-3 block text-3xl text-gray-900">
              ${data?.product?.price}
            </p>
            <p className="my-6 text-base text-gray-700">
              {data?.product?.description}
            </p>
            {isYou ? null : (
              <div className="flex items-center justify-between space-x-2">
                {moveChatLoading ? (
                  <Button large text="Loading..." />
                ) : (
                  <Button onClick={onClickChat} large text="Talk to seller" />
                )}
                <button
                  onClick={onFavClick}
                  className={cls(
                    "flex items-center justify-center rounded-md p-3 hover:bg-gray-100",
                    data?.isLiked
                      ? "text-red-400  hover:text-red-500"
                      : "text-gray-400  hover:text-gray-500"
                  )}
                >
                  {data?.isLiked ? (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      className="h-6 w-6"
                    >
                      <path d="M11.645 20.91l-.007-.003-.022-.012a15.247 15.247 0 01-.383-.218 25.18 25.18 0 01-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0112 5.052 5.5 5.5 0 0116.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 01-4.244 3.17 15.247 15.247 0 01-.383.219l-.022.012-.007.004-.003.001a.752.752 0 01-.704 0l-.003-.001z" />
                    </svg>
                  ) : (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth="1.5"
                      stroke="currentColor"
                      className="h-6 w-6"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z"
                      />
                    </svg>
                  )}
                </button>
              </div>
            )}
          </div>
        </div>
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Similar items</h2>
          <div className="grid grid-cols-2 gap-4">
            {data?.relatedProducts?.map((product) => (
              <div key={product.id}>
                <div className="mb-4 h-56 w-full bg-slate-300" />
                <h3 className="-mb-1 text-gray-700">{product.name}</h3>
                <span className="text-sm font-medium text-gray-900">
                  ${product.price}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
}
