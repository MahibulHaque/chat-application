import AddFriendButton from "@/components/AddFriendButton";

const page = () => {
  return (
    <main className='pt-8 mt-8 md:mt-0'>
      <h1 className='font-bold text-3xl mb-8 md:text-5xl'> Add a friend</h1>
      <AddFriendButton />
    </main>
  );
};

export default page;
