import { chatHrefConstructor, cn } from "@/lib/utils";
import Image from "next/image";
import { FC } from "react";
import { ToastT, toast } from "sonner";

interface UnseenChatToastProps {
  t: ToastT["id"];
  sessionId: string;
  senderId: string;
  senderImg: string;
  senderName: string;
  senderMessage: string;
}

const UnseenChatToast: FC<UnseenChatToastProps> = ({
  t,
  senderId,
  sessionId,
  senderImg,
  senderName,
  senderMessage,
}) => {
  return (
    <div
      className={cn(
        "max-w-md w-[90vw] bg-accent shadow-lg rounded-lg pointer-events-auto flex ring-1 ring-ring ring-opacity-5"
      )}
    >
      <a
        onClick={() => toast.dismiss(t)}
        href={`/dashboard/chat/${chatHrefConstructor(sessionId, senderId)}`}
        className='flex-1 w-0 p-4'
      >
        <div className='flex items-start'>
          <div className='flex-shrink-0 pt-0.5'>
            <div className='relative h-10 w-10'>
              <Image
                fill
                referrerPolicy='no-referrer'
                className='rounded-full'
                src={senderImg}
                alt={`${senderName} profile picture`}
              />
            </div>
          </div>

          <div className='ml-3 flex-1'>
            <p className='text-sm font-medium text-accent-foreground'>
              {senderName}
            </p>
            <p className='mt-1 text-sm text-accent-foreground truncate'>
              {senderMessage}
            </p>
          </div>
        </div>
      </a>

      <div className='flex border-l border-border'>
        <button
          onClick={() => toast.dismiss(t)}
          className='w-full border border-transparent rounded-none rounded-r-lg p-4 flex items-center justify-center text-sm font-medium text-primary-foreground/90 hover:text-primary-foreground focus:outline-none focus:ring-2 focus:ring-ring'
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default UnseenChatToast;
