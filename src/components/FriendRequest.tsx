"use client";
import axios from "axios";
import { useRouter } from "next/navigation";
import { FC, useState } from "react";
import { AiOutlineCheck, AiOutlineClose } from "react-icons/ai";
import { BiUserPlus } from "react-icons/bi";
interface FriendRequestsProps {
  incomingFriendRequests: IncomingFriendRequest[];
  sessionId: string;
}
const FriendRequests: FC<FriendRequestsProps> = ({
  incomingFriendRequests,
  sessionId,
}) => {
  const router = useRouter();
  const [friendRequests, setFriendRequests] = useState<IncomingFriendRequest[]>(
    incomingFriendRequests
  );

  const acceptFriend = async (senderId: string) => {
    await axios.post("/api/friends/accept", { id: senderId });

    setFriendRequests((prev) =>
      prev.filter((request) => request.senderId !== senderId)
    );

    router.refresh();
  };

  const denyFriend = async (senderId: string) => {
    await axios.post("/api/friends/deny", { id: senderId });

    setFriendRequests((prev) =>
      prev.filter((request) => request.senderId !== senderId)
    );

    router.refresh();
  };
  return (
    <>
      {friendRequests.length === 0 ? (
        <p className='text-sm text-zinc-500'>
          You have no incoming friend requests.
        </p>
      ) : (
        friendRequests.map((friendRequest) => (
          <div key={friendRequest.senderId} className='flex gap-4 items-center'>
            <BiUserPlus className='h-6 w-6' />
            <p className='font-medium text-lg'>{friendRequest.senderEmail}</p>
            <button
              aria-label='accept friend request'
              className='w-6 h-6 bg-primary hover:bg-primary/90 grid place-items-center rounded-full transition hover:shadow-md'
              onClick={() => acceptFriend(friendRequest.senderId)}
            >
              <AiOutlineCheck className='font-semibold text-white w-3/4 h-3/4' />
            </button>
            <button
              aria-label='deny friend request'
              className='w-6 h-6 bg-red-600 hover:bg-red-700 grid place-items-center rounded-full transition hover:shadow-md'
              onClick={() => denyFriend(friendRequest.senderId)}
            >
              <AiOutlineClose className='font-semibold text-white w-3/4 h-3/4' />
            </button>
          </div>
        ))
      )}
    </>
  );
};

export default FriendRequests;