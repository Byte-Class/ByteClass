import Image from "next/image";

import SplashBottom from "@/components/splash-bottom";

export default function Splash() {
  return (
    <header className="w-4/5 ml-[10%] mr-[10%] h-[calc(100lvh-9rem)]">
      <div className="flex items-center justify-center gap-4 w-full h-[calc(100%-6rem)]">
        <div className="w-[45%]">
          <h1 className="text-6xl font-bold">ByteClass</h1>
          <p className="text-xl">
            ByteClass a drag and drop replacement for all google classroom task
            and student management. Byteclass offers a variety of student
            management tools and advanced task and assignment management
            features.
          </p>
        </div>
        <div className="w-[55%]">
          <Image
            src="/splash.svg"
            width={1500}
            height={1500}
            alt="Picture of the author"
          />
        </div>
      </div>
      <SplashBottom />
    </header>
  );
}
