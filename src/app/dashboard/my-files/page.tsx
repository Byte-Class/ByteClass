import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "My Files | ByteClass",
};

export default async function MyFiles() {
  return <main className="w-full">My Files</main>;
}
