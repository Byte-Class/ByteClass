import Image from "next/image";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGoogle } from "@fortawesome/free-brands-svg-icons";
import { signIn } from "auth";

export default function SignIn() {
  return (
    <main
      className="h-lvh w-full bg-cover flex items-center justify-center"
      style={{ backgroundImage: "url('/signin-background.png')" }}
    >
      <form
        action={async () => {
          "use server";
          await signIn("google", { redirectTo: "/" });
        }}
        className="w-[43%] h-[43%] bg-background rounded-2xl p-4 flex items-center justify-between flex-col border-solid border-4 border-[#262626]"
      >
        <Link href="/">
          <Image
            src="/logos/byte.png"
            width={100}
            height={100}
            alt="ByteClass Logo"
            className="mr-4"
          />
        </Link>
        <Button
          type="submit"
          className="w-4/5 font-bold flex items-center justify-start gap-4 rounded-3xl"
        >
          <FontAwesomeIcon icon={faGoogle} /> Continue With Google
        </Button>

        <p className="font-bold mr-auto">
          <span className="text-red-600">*</span> Use your google account linked
          to your Google Classroom
        </p>
      </form>
    </main>
  );
}
