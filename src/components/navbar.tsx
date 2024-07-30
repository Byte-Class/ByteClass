const greetingTime = require("greeting-time");

import Image from "next/image";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { auth, signOut } from "auth";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";

export default async function Navbar() {
  const session = await auth();

  return (
    <>
      {!session ? (
        <nav className="w-[calc(100% - 4rem)] ml-8 mr-8 mt-8 flex h-28 items-center justify-between">
          <Link href={"/"}>
            <Image
              src="/logos/byte.png"
              width={100}
              height={100}
              alt="Picture of the author"
              className="mr-4"
            />
          </Link>

          <Link href={"/signin"}>
            <Button className="h-12 w-32 font-bold">Sign In</Button>
          </Link>
        </nav>
      ) : (
        <nav className="flex h-28 items-center justify-between bg-lightBlack p-8">
          <Avatar className="mr-6">
            {/* @ts-ignore */}
            <AvatarImage src={session.user?.image} alt="@shadcn" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>

          <div className="mr-auto text-xl font-bold">
            <p>
              {greetingTime(new Date())} {session.user?.name?.split(" ")[0]}
            </p>
            <p>Your next class is Calculus</p>
          </div>
          <form
            action={async () => {
              "use server";
              await signOut();
            }}
          >
            <Button className="h-12 w-32 font-bold" type="submit">
              Sign Out
            </Button>
          </form>
        </nav>
      )}
    </>
  );
}
