import { cls } from "@libs/client/utils";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

interface PaginationProps {
  nowPage: number;
  dataSize: number | undefined;
}
type Direction = "prev" | "next";

export default function Pagination({ nowPage, dataSize }: PaginationProps) {
  const router = useRouter();
  const maxPage = Number((dataSize! / 10).toFixed()) + 1;
  const [showPage, setShowPage] = useState<number[]>([]);
  const arrowClick = (direction: Direction) => {
    if (direction === "prev") {
      router.push(`${router.pathname}?page=${nowPage - 1}`);
    }
    if (direction === "next") {
      router.push(`${router.pathname}?page=${nowPage + 1}`);
    }
  };
  const pageClick = (page: number) => {
    router.push(`${router.pathname}?page=${page}`);
  };

  useEffect(() => {
    if (nowPage !== undefined && nowPage > 3 && nowPage + 3 < maxPage) {
      setShowPage([
        nowPage - 2,
        nowPage - 1,
        nowPage,
        nowPage + 1,
        nowPage + 2,
      ]);
    }
    if (nowPage !== undefined && nowPage <= 3) {
      setShowPage([1, 2, 3, 4, 5]);
    }
    if (nowPage !== undefined && nowPage + 3 >= maxPage && maxPage !== 1) {
      setShowPage([
        maxPage - 4,
        maxPage - 3,
        maxPage - 2,
        maxPage - 1,
        maxPage,
      ]);
    }
  }, [nowPage, maxPage]);
  return (
    <div className="flex h-14 items-center justify-center space-x-1 py-5">
      <div
        onClick={() => arrowClick("prev")}
        className={cls(
          "flex h-10 w-10 cursor-pointer items-center justify-center rounded-md bg-orange-400 text-white hover:bg-orange-500",
          nowPage === 1 ? "hidden" : "block"
        )}
      >
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
            d="M15.75 19.5L8.25 12l7.5-7.5"
          />
        </svg>
      </div>
      <div
        className={cls(
          "flex items-center justify-center",
          nowPage < 4 ? "hidden" : ""
        )}
      >
        <svg
          className="h-4 w-4"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z"
          ></path>
        </svg>
      </div>
      {showPage.map((page) => {
        return (
          <div
            onClick={() => {
              pageClick(page);
            }}
            key={page}
            className={cls(
              "flex h-10 w-14 items-center justify-center rounded-md bg-orange-400 text-white hover:bg-orange-500",
              page === nowPage ? "bg-orange-600" : "cursor-pointer"
            )}
          >
            {page}
          </div>
        );
      })}
      <div
        className={cls(
          "flex items-center justify-center",
          nowPage + 3 > maxPage ? "hidden" : ""
        )}
      >
        <svg
          className="h-4 w-4"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z"
          ></path>
        </svg>
      </div>
      <div
        onClick={() => arrowClick("next")}
        className={cls(
          "flex h-10 w-10 cursor-pointer items-center justify-center rounded-md bg-orange-400 text-white hover:bg-orange-500",
          nowPage === maxPage ? "hidden" : "block"
        )}
      >
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
            d="M8.25 4.5l7.5 7.5-7.5 7.5"
          />
        </svg>
      </div>
    </div>
  );
}
