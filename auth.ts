import NextAuth from "next-auth";
import Google from "next-auth/providers/google";

import { ROLE_TYPES } from "@/core/types/roles";

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
  },
  callbacks: {
    async jwt({ token, account }) {
      if (account) {
        token.access_token = account.access_token;
      }
      return token;
    },
    async session({ session, token }) {
      // @ts-ignore
      session.access_token = token.access_token;
      //@ts-ignore
      session.role = ROLE_TYPES.USER;
      return session;
    },
  },
});
