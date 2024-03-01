import { ArrowRight } from "lucide-react";
import Link from "next/link";

export default function Home() {
  return (
    <main className="">
      <Link
        href="/dashboard"
        className="flex items-center justify-center space-x-2"
      >
        <span>Try it</span>
        <ArrowRight size={18} />
      </Link>
    </main>
  );
}
