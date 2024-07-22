import Image from "next/image";

export default function SplashBottom() {
  return (
    <div className="font-bold p-2 w-full flex justify-between items-center border-solid border-t-2 border-b-2 border-white">
      <p className="text-base ml-4">Built to work alongside Google Classroom</p>
      <Image
        src="/logos/classroom.svg"
        width={50}
        height={50}
        alt="Picture of the author"
        className="mr-4"
      />
    </div>
  );
}
