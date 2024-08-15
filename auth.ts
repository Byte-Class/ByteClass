import jwt from "jsonwebtoken";
import NextAuth from "next-auth";
import Google from "next-auth/providers/google";
import { DrizzleAdapter } from "@auth/drizzle-adapter";
import type { JWT, JWTDecodeParams } from "next-auth/jwt";

import { db } from "@/drizzle/db";
import { eq } from "drizzle-orm";
import { accounts, users } from "@/drizzle/schema";

const SCOPES = [
  // General Email and Profile Scopes
  "profile",
  "email",
  "openid",
  // Courses Scope
  "https://www.googleapis.com/auth/classroom.courses",
  "https://www.googleapis.com/auth/classroom.coursework.students.readonly",
  "https://www.googleapis.com/auth/classroom.coursework.me.readonly",
  "https://www.googleapis.com/auth/classroom.coursework.me",
];

export const { handlers, signIn, signOut, auth } = NextAuth({
  adapter: DrizzleAdapter(db),
  providers: [
    Google({
      clientId: process.env.AUTH_GOOGLE_ID,
      clientSecret: process.env.AUTH_GOOGLE_SECRET,
      authorization: {
        params: {
          access_type: "offline",
          prompt: "consent",
          scope: SCOPES.join(" "),
        },
      },
    }),
  ],
  pages: {
    signIn: "/signin",
    error: "/auth/error",
    newUser: "/onboarding",
  },
  session: {
    strategy: "jwt",
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.user = user;
      }

      return token;
    },
    async session({ session, token }) {
      if (token) {
        session.user = token.user;
        session.id = token.id;
      }

      const res = (
        await db
          .select({
            refreshToken: accounts.refresh_token,
            accessToken: accounts.access_token,
          })
          .from(accounts)
          .where(eq(accounts.userId, session.id))
      )[0];

      const picture = (
        await db
          .select({
            picture: users.image,
          })
          .from(users)
          .where(eq(users.id, session.id))
      )[0];

      // check if access token or refresh token are null, if so we just return the session
      if (res.accessToken === null || res.refreshToken === null) {
        return session;
      }

      if (picture.picture === null) {
        return session;
      }

      session.user.picture = picture.picture;
      session.access_token = res.accessToken;
      session.refresh_token = res.refreshToken;

      return session;
    },
  },
  secret: process.env.ACCESS_TOKEN_SECRET,
  jwt: {
    encode: async ({ token }) => {
      if (!token) {
        return "";
      }

      const data = await db
        .select({
          id: users.id,
        })
        .from(users)
        .where(eq(users.email, token.user.email));

      const newToken = jwt.sign(
        {
          id: data[0].id,
          user: {
            name: token.user.name,
            email: token.user.email,
            picture: token.user.picture,
          },
        },
        process.env.ACCESS_TOKEN_SECRET,
        {
          expiresIn: 7 * 24 * 60 * 60, // 7 days
        },
      );

      return newToken;
    },
    decode: async ({ token }: JWTDecodeParams): Promise<JWT | null> => {
      const decodedToken = jwt.verify(
        token as string,
        process.env.ACCESS_TOKEN_SECRET,
      ) as JWT;
      return decodedToken;
    },
  },
});
