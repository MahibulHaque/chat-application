import { fetchRedis } from "@/helpers/redis";
import { userRegistrationValidator } from "@/lib/validations/userRegistration";
import { z } from "zod";
import { v4 as uuidv4 } from "uuid";
import bcrypt from "bcryptjs";
import { db } from "@/lib/database";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const { email, password, username } = userRegistrationValidator.parse(body);

    const existingUserId = (await fetchRedis(
      "get",
      `user:email:${email}`
    )) as string;
    if (existingUserId) {
      return new Response("An user with this email already exists", {
        status: 400,
      });
    }

    const uniqueUserId = uuidv4();
    const hashedPassword = await bcrypt.hash(password, 10);

    const userObject = {
      name: username,
      email: email,
      password: hashedPassword,
      emailVerified: null,
      image: "",
      id: uniqueUserId,
    };
    const redisPipeline = db.pipeline()


    redisPipeline.set(`user:email:${email}`, uniqueUserId);
    redisPipeline.set(`user:${uniqueUserId}`, JSON.stringify(userObject));

    await redisPipeline.exec()

    return new Response("User registration successful", { status: 201 });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return new Response("Invalid request payload", { status: 422 });
    }
    return new Response("Invalid request", { status: 400 });
  }
}
