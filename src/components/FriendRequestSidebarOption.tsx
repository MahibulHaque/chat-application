import Link from "next/link";
import { FC } from "react";

interface FriendRequestSidebarOptionsProps {}

const FriendRequestSidebarOption: FC<
  FriendRequestSidebarOptionsProps
> = ({}) => {
  return (
    <Link
      href='/dashboard/requests'
      className='text-accent hover:text-accent-foreground hover:bg-secondary group flex items-center gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold'
    >
      <div className='text-gray-400 border-primary group-hover:border-primary group-hover:text-accent-foreground flex h-6 w-6 shrink-0 items-center justify-center rounded-lg border text-[0.625rem] font-medium bg-secondary'>
        {/* <User className='h-4 w-4' /> */}
      </div>
      <p className='truncate'>Friend requests</p>

      {/* {unseenRequestCount > 0 ? (
        <div className='rounded-full w-5 h-5 text-xs flex justify-center items-center text-white bg-indigo-600'>
          {unseenRequestCount}
        </div>
      ) : null} */}
    </Link>
  );
};

export default FriendRequestSidebarOption;
