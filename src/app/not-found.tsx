import Link from "next/link";

import Navbar from "@/components/navbar/navbar";
import { Button } from "@/components/ui/button";

export default function NotFount() {
  return (
    <>
      <Navbar />
      <main>
        <div>
          <h1>404 Not Found</h1>
          <h2>It seems like you are looking for a page that does not exist</h2>

          <Link href={"/"}>
            <Button>Take me home</Button>
          </Link>
        </div>
      </main>
    </>
  );
}
