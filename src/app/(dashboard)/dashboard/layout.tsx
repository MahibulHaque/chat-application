import FriendRequestSidebarOption from "@/components/FriendRequestSidebarOption";
import { Icons } from "@/components/Icons";
import SidebarChatList from "@/components/SidebarChatList";
import SignOutButton from "@/components/SignoutButton";
import { getFriendsByUserId } from "@/helpers/get-friends-by-user-id";
import { fetchRedis } from "@/helpers/redis";
import { authOptions } from "@/lib/auth";
import { User, getServerSession } from "next-auth";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ReactNode } from "react";
import { AiOutlineUserAdd } from "react-icons/ai";

interface LayoutProps {
  children: ReactNode;
}

interface SidebarOption {
  id: number;
  name: string;
  href: string;
  Icon: React.ReactNode;
}
const sidebarOptions: SidebarOption[] = [
  {
    id: 1,
    name: "Add friend",
    href: "/dashboard/add",
    Icon: <AiOutlineUserAdd />,
  },
];

const Layout = async ({ children }: LayoutProps) => {
  const session = await getServerSession(authOptions);
  if (!session) {
    notFound();
  }
  const friends = await getFriendsByUserId(session.user.id);
  const unseenRequestCount = (
    (await fetchRedis(
      "smembers",
      `user:${session.user.id}:incoming_friend_requests`
    )) as User[]
  ).length;

  return (
    <div className='w-full flex h-screen'>
      <div className='flex h-full w-full max-w-xs grow flex-col gap-y-5 overflow-y-auto border-r border-gray bg-background px-6'>
        <Link href='/dashboard' className='flex h-16 shrink-0 items-center'>
          <Icons.Logo className='h-8 w-auto text-accent-foreground' />
        </Link>

        {friends.length > 0 ? (
          <div className='text-xs font-semibold leading-6 text-accent-foreground'>
            Your Chats
          </div>
        ) : null}
        <nav className='flex flex-1 flex-col'>
          <ul role='list' className='flex flex-1 flex-col gap-y-7'>
            <li>
              <SidebarChatList friends={friends} sessionId={session.user.id} />
            </li>
            <li>
              <div className='text-xs font-semibold leading-6 text-accent-foreground'>
                Overview
              </div>
              <ul role='list' className='-mx-2 mt-2 space-y-1'>
                {sidebarOptions.map((sidebarOption) => {
                  return (
                    <li key={sidebarOption.id}>
                      <Link
                        href={sidebarOption.href}
                        className='text-gray-400 hover:text-secondary-foreground hover:bg-secondary group flex items-center gap-3 rounded-md p-2 text-sm leading-6 font-semibold'
                      >
                        <span className='text-gray-400 border-secondary group-hover:border-secondary-foreground group-hover:secondary-foreground flex h-8 w-8 text-lg shrink-0 items-center justify-center rounded-lg border text-[0.625rem] font-medium bg-secondary'>
                          {sidebarOption.Icon}
                        </span>

                        <span className='truncate'>{sidebarOption.name}</span>
                      </Link>
                    </li>
                  );
                })}
                <li>
                  <FriendRequestSidebarOption
                    sessionId={session.user.id}
                    intialUnseenRequestCount={unseenRequestCount}
                  />
                </li>
              </ul>
            </li>
            <li className='-mx-6 mt-auto flex items-center overflow-x-hidden px-2 pb-2'>
              <div className='flex flex-1 items-center gap-x-4 py-3 text-sm font-semibold leading-6'>
                <div className='relative h-8 w-8 bg-background'>
                  <Image
                    fill
                    referrerPolicy='no-referrer'
                    className='rounded-full'
                    src={session.user.image || ""}
                    alt='Your profile picture'
                  />
                </div>
                <span className='sr-only'>Your Profile</span>
                <div className='flex flex-col'>
                  <span aria-hidden='true'>{session.user.name}</span>
                  <span
                    className='text-xs text-zinc-400 truncate'
                    aria-hidden='true'
                  >
                    {session.user.email}
                  </span>
                </div>
              </div>
              <SignOutButton className='h-full aspect-square' />
            </li>
          </ul>
        </nav>
      </div>

      <aside className='max-h-screen container w-full'>
        {children}
      </aside>
    </div>
  );
};

export default Layout;
