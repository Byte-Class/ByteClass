import Image from "next/image";

import { Button } from "@/components/ui/button";

export default function Navbar() {
  return (
    <nav className="w-[calc(100% - 4rem)] ml-8 mr-8 mt-8 h-28 flex items-center justify-between">
      <Image
        src="/logos/byte.png"
        width={100}
        height={100}
        alt="Picture of the author"
        className="mr-4"
      />

      <Button className="font-bold w-32 h-12">Sign In</Button>
    </nav>
  );
}
