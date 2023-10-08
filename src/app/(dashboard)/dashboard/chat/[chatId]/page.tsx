import { getServerSession } from "next-auth";
import { notFound } from "next/navigation";
import React from "react";

interface PageProps {
  params: {
    chatId: string;
  };
}

const page = async ({ params }: PageProps) => {
  const { chatId } = params;
  const session = await getServerSession();

  if (!session) {
    notFound();
  }

  const { user } = session;

  const [userId1, userId2] = chatId.split("--");
  if (user.id !== userId1 && user.id !== userId2) {
    notFound()
  }
  return <div>{chatId}</div>;
};

export default page;
