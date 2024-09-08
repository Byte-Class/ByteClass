import BreadCrumbs from "@/components/breadcrumbs";
import { Button } from "@/components/ui/button";
import { auth, signOut } from "auth";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export default function __TEST__Navbar() {
  const session = auth();

  return (
    <>
      {session && (
        <nav className="flex h-28 items-center justify-between bg-lightBlack p-8">
          <Avatar className="mr-6">
            <AvatarImage alt="Your image " src={""} />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>

          <div className="mr-auto flex flex-col gap-2 font-bold">
            <p>Good Morning {(session as any)?.name?.split(" ")[0]} 👋. 🫵🤓</p>
            <BreadCrumbs />
          </div>
          <form
            action={async () => {
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
