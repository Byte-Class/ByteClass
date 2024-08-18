import NextAuth, { type DefaultSession } from "next-auth";
import { DefaultJWT, JWT } from "next-auth/jwt";

declare module "next-auth" {
  interface Session {
    accessToken: string;
    refreshToken: string;
    sessionToken: string;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    user: { name?: string; picture?: string; email?: string } | AdapterUser;
    id: string;
    access_token: string;
    refresh_token: string;
  }
}
