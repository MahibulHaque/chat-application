"use client";
import { pusherClient } from "@/lib/pusher";
import { toPusherKey } from "@/lib/utils";
import Link from "next/link";
import { FC, useEffect, useState } from "react";
import { AiOutlineUser } from "react-icons/ai";

interface FriendRequestSidebarOptionsProps {
  intialUnseenRequestCount: number;
  sessionId: string;
}

const FriendRequestSidebarOption: FC<FriendRequestSidebarOptionsProps> = ({
  intialUnseenRequestCount,
  sessionId,
}) => {
  const [unseenRequestCount, setUnseenRequestCount] = useState<number>(
    intialUnseenRequestCount
  );

  useEffect(() => {
    pusherClient.subscribe(
      toPusherKey(`user:${sessionId}:incoming_friend_requests`)
    );
    pusherClient.subscribe(toPusherKey(`user:${sessionId}:friends`));

    const friendRequestHandler = () => {
      setUnseenRequestCount((prev) => prev + 1);
    };

    const addedFriendHandler = () => {
      setUnseenRequestCount((prev) => prev - 1);
    };

    pusherClient.bind("incoming_friend_requests", friendRequestHandler);
    pusherClient.bind("new_friend", addedFriendHandler);

    return () => {
      pusherClient.unsubscribe(
        toPusherKey(`user:${sessionId}:incoming_friend_requests`)
      );
      pusherClient.unsubscribe(toPusherKey(`user:${sessionId}:friends`));

      pusherClient.unbind("new_friend", addedFriendHandler);
      pusherClient.unbind("incoming_friend_requests", friendRequestHandler);
    };
  }, [sessionId]);

  return (
    <Link
      href='/dashboard/requests'
      className='text-gray-400 hover:text-accent-foreground hover:bg-secondary group flex items-center gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold'
    >
      <div className='text-gray-400 border-secondary group-hover:border-secondary-foreground group-hover:text-accent-foreground flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border text-[0.625rem] font-medium bg-secondary'>
        <AiOutlineUser className='h-5 w-5' />
      </div>
      <p className='truncate'>Friend requests</p>

      {unseenRequestCount > 0 ? (
        <div className='rounded-full w-5 h-5 text-xs flex justify-center items-center text-white bg-primary'>
          {unseenRequestCount}
        </div>
      ) : null}
    </Link>
  );
};

export default FriendRequestSidebarOption;
