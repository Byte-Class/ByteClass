import Image from "next/image";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="ml-[10%] mr-[10%] flex h-52 w-4/5 items-center justify-center rounded-2xl bg-lightBlack">
      <Link href={"/"}>
        <Image
          src="/logos/byte.png"
          width={100}
          height={100}
          alt="Picture of the author"
          className="mr-4"
        />
      </Link>
    </footer>
  );
}
