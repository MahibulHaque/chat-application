"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import axios, { AxiosError } from "axios";
import { addFriendValidator } from "@/lib/validations/add-friend";
import { useState } from "react";
import { ApiError } from "next/dist/server/api-utils";

const formSchema = z.object({
  email: z.string().email({ message: "Provide valid email" }),
});

export function AddFriendButton() {
  const [showSuccessState, setShowSuccessState] = useState<boolean>(false);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
    },
  });
  const addFriend = async (email: string) => {
    try {
      const validatedEmail = addFriendValidator.parse({ email });
      await axios.post("/api/friends/add", {
        email: validatedEmail,
      });

      setShowSuccessState(true);
      form.resetField("email");
    } catch (error) {
      if (error instanceof z.ZodError) {
        form.setError("email", { message: error.message });
      }
      if (error instanceof AxiosError) {
        form.setError("email", { message: error.response?.data });
      }
      if (error instanceof ApiError) {
        form.setError("email", { message: error.message as string });
      }
      form.setError("email", { message: "Something went wrong" });
    }
  };
  function onSubmit(values: z.infer<typeof formSchema>) {
    addFriend(values.email);
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className='space-y-4 max-w-sm flex flex-col gap-2'
      >
        <div className='flex items-end justify-evenly'>
          <FormField
            control={form.control}
            name='email'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Add a friend by Email</FormLabel>
                <FormControl>
                  <Input placeholder='m@example.com' {...field} type='email' />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type='submit'>Submit</Button>
        </div>

        {showSuccessState ? (
          <p className='mt-1 ml-8 text-sm text-green-600'>
            Friend request sent successfully.
          </p>
        ) : null}
      </form>
    </Form>
  );
}
