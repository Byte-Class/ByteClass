import Image from "next/image";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { auth, signOut } from "auth";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";

import BreadCrumbs from "@/components/breadcrumbs";

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
            <AvatarImage alt="Your image " src={session.user?.image ?? ""} />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>

          <div className="mr-auto flex flex-col gap-2 font-bold">
            <p>
              Good Morning {session.user?.name?.split(" ")[0]}, your next class
              is Calculus
            </p>
            <BreadCrumbs />
          </div>
          <form
            action={async () => {
              "use server";
              await signOut({ redirectTo: "/" });
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
