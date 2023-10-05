import { NextAuthOptions, User } from "next-auth";
import { UpstashRedisAdapter } from "@next-auth/upstash-redis-adapter";
import { db } from "./database";
import { z } from "zod";
import bcrypt from "bcryptjs";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import GithubProvider from "next-auth/providers/github";
import { fetchRedis } from "@/helpers/redis";
import { userSignInValidator } from "./validations/userSignin";

class OAuthCredentialsProvider {
  private readonly providerName: string;
  private readonly clientIdEnvName: string;
  private readonly clientSecretEnvName: string;

  constructor(
    providerName: string,
    clientIdEnvName: string,
    clientSecretEnvName: string
  ) {
    this.providerName = providerName;
    this.clientIdEnvName = clientIdEnvName;
    this.clientSecretEnvName = clientSecretEnvName;
  }

  getProviderName(): string {
    return this.providerName;
  }

  getCredentials(): { clientId: string; clientSecret: string } {
    const clientId = process.env[this.clientIdEnvName];
    const clientSecret = process.env[this.clientSecretEnvName];

    if (!clientId || clientId.length === 0) {
      throw new Error(`Missing ${this.providerName} client ID`);
    }
    if (!clientSecret || clientSecret.length === 0) {
      throw new Error(`Missing ${this.providerName} client secret`);
    }

    return { clientId, clientSecret };
  }
}

const googleCredentials = new OAuthCredentialsProvider(
  "Google",
  "GOOGLE_CLIENT_ID",
  "GOOGLE_CLIENT_SECRET"
);
const githubCredentials = new OAuthCredentialsProvider(
  "Github",
  "GITHUB_CLIENT_ID",
  "GITHUB_CLIENT_SECRET"
);

export const authOptions: NextAuthOptions = {
  adapter: UpstashRedisAdapter(db),
  session: {
    strategy: "jwt",
  },
  pages: {
    signIn: "/login",
  },
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {},

      async authorize(credentials) {
        try {
          const { email, password } = userSignInValidator.parse(credentials);
          const userId = (await fetchRedis(
            "get",
            `user:email:${email}`
          )) as string;
          if (!userId) {
            return null;
          }

          const user = JSON.parse(await fetchRedis("get", `user:${userId}`));

          const passwordsMatch = await bcrypt.compare(password, user.password);

          if (!passwordsMatch) {
            return null;
          }

          if (user) {
            return user;
          } else {
            return null;
          }
        } catch (error) {
          if (error instanceof z.ZodError) {
            return new Response("Invalid request payload", { status: 422 });
          }
          console.error(error);
        }
      },
    }),
    GoogleProvider({
      clientId: googleCredentials.getCredentials().clientId,
      clientSecret: googleCredentials.getCredentials().clientSecret,
    }),
    GithubProvider({
      clientId: githubCredentials.getCredentials().clientId,
      clientSecret: githubCredentials.getCredentials().clientSecret,
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      const dbUserResult = (await fetchRedis("get", `user:${token.id}`)) as
        | string
        | null;

      if (!dbUserResult) {
        if (user) {
          token.id = user!.id;
        }

        return token;
      }

      const dbUser = JSON.parse(dbUserResult) as User;

      return {
        id: dbUser.id,
        name: dbUser.name,
        email: dbUser.email,
        picture: dbUser.image,
      };
    },
    async session({ session, token }) {
      if (token) {
        session.user.id = token.id;
        session.user.name = token.name;
        session.user.email = token.email;
        session.user.image = token.picture;
      }

      return session;
    },
    redirect() {
      return "/dashboard";
    },
  },
};
