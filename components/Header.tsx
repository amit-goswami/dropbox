import Image from "next/image";
import Link from "next/link";
import React from "react";
import { SignInButton, SignedOut, UserButton } from "@clerk/nextjs";

function Header() {
  return (
    <header className="flex items-center justify-between p-2">
      <Link href="/" className="flex items-center space-x-2">
        <div className="w-fit">
          <Image
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/7/78/Dropbox_Icon.svg/2202px-Dropbox_Icon.svg.png"
            alt="Drop Box Logo"
            className="object-contain"
            width={40}
            height={40}
          />
        </div>
        <h1 className="font-bold text-xl">Drop Box</h1>
      </Link>
      <div className="px-5 flex space-x-2 items-center">
        <UserButton afterSignOutUrl="/" />
        <SignedOut>
          <SignInButton afterSignInUrl="/dashboard" mode="modal" />
        </SignedOut>
      </div>
    </header>
  );
}

export default Header;
