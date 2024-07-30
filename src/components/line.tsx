import { cn } from "@/lib/utils";

export default function Line({ className }: { className?: string }) {
  return (
    <hr className={cn("ml-[10%] mr-[10%] h-1 w-4/5 bg-white", className)} />
  );
}
