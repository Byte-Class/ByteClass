import NextAuth from "next-auth";
import Google from "next-auth/providers/google";
import { DrizzleAdapter } from "@auth/drizzle-adapter";

import { db } from "@/drizzle/db";
import { eq } from "drizzle-orm";
import { accounts } from "@/drizzle/schema";

const SCOPES = [
  // General Email and Profile Scopes
  "profile",
  "email",
  "openid",
  // Courses Scope
  "https://www.googleapis.com/auth/classroom.courses",
  "https://www.googleapis.com/auth/classroom.courses.readonly",
  // Coursework scopes
  "https://www.googleapis.com/auth/classroom.coursework.students.readonly",
  "https://www.googleapis.com/auth/classroom.coursework.me.readonly",
  "https://www.googleapis.com/auth/classroom.coursework.students",
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
          response_type: "code",
          scope: SCOPES.join(" "),
        },
      },
      account(account) {
        account.access_token;
        return account;
      },
    }),
  ],
  pages: {
    signIn: "/signin",
    error: "/auth/error",
    newUser: "/onboarding",
  },
  session: {
    strategy: "database",
  },
});
