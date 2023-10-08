import { Skeleton } from "@/components/ui/skeleton";
import { FC } from "react";

interface loadingProps {}

const loading: FC<loadingProps> = ({}) => {
  return (
    <div className='w-full flex flex-col gap-4 mx-6 my-6'>
      <Skeleton className='mb-4 h-[40px] w-[500px]' />
      <Skeleton className='h-[30px] w-[350px]' />
      <Skeleton className='h-[30px] w-[350px]' />
      <Skeleton className='h-[30px] w-[350px]' />
    </div>
  );
};

export default loading;
