import React from "react";
import Link from "next/link";
import Image from "next/image";

export default function Logo({
  src,
}: {
  src: string | null;
}) {
  return (
    <Link
      href="/"
      aria-label="Back to homepage"
      className="flex items-center p-2"
    >
      {src && <Image src={src} alt="logo" width={204} height={56} />}
    </Link>
  );
}
