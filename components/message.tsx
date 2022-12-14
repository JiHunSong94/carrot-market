import { cls } from "@libs/client/utils";

interface MessageProps {
  message: string;
  reversed?: boolean;
  avatarUrl?: string;
}

export default function Message({
  message,
  reversed,
  avatarUrl,
}: MessageProps) {
  return (
    <div
      className={cls(
        "flex items-start space-x-2",
        reversed ? "flex-row-reverse space-x-reverse" : ""
      )}
    >
      <div className="h-8 w-8 rounded-full bg-slate-400" />
      <div
        className={cls(
          "w-1/2 rounded-lg border border-gray-300 p-2 text-sm",
          reversed ? "bg-orange-500 text-white" : "text-gray-700"
        )}
      >
        <p>{message}</p>
      </div>
    </div>
  );
}
