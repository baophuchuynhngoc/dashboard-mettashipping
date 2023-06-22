"use client";
import Logo from "./Logo";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

interface NavLink {
  id: number;
  url: string;
  newTab: boolean;
  text: string;
}

function NavLink({ url, text }: NavLink) {
  const path = usePathname();

  return (
    <li className="flex">
      <Link
        href={url}
        className={`flex items-center mx-4 mb-4 lg:-mb-1  hover:text-primary-blue ${
          path ===  `/en${url?.length === 1 ? "": url}` && " font-semibold text-primary-blue"
        }`}
      >
        {text}
      </Link>
    </li>
  );
}

export default function Navbar({
  links,
  logoUrl,
}: {
  links: Array<NavLink>;
  logoUrl: string | null;
}) {
  const [isOpen, setIsOpen] = useState(false);

  const handleOpenMenu = () => {
    setIsOpen(!isOpen);
  };
  return (
    <div className="p-4">
      <div className="container flex justify-between h-16 mx-auto px-0 sm:px-6">
        <Logo src={logoUrl} />

        <div className="items-center flex-shrink-0 hidden lg:flex justify-between">
          <ul className="items-stretch hidden lg:flex text-ex font-medium	">
            {links.map((item: NavLink) => (
              <NavLink key={item.id} {...item} />
            ))}
          </ul>
        </div>

        <button className="p-4 lg:hidden" onClick={handleOpenMenu}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            className="w-6 h-6 "
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M4 6h16M4 12h16M4 18h16"
            ></path>
          </svg>
        </button>
      </div>
      {isOpen && (
        <div className="bg-white h-[100vh] z-10 mt-4 transition-all	">
          <ul className="grid text-ex font-medium	">
            {links.map((item: NavLink) => (
              <NavLink key={item.id} {...item} />
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
