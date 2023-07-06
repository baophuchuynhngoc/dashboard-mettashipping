"use client";
import { usePathname } from "next/navigation";
import Link from "next/link";
import Logo from "./Logo";
import { CgWebsite } from "react-icons/cg";
import { FaDiscord } from "react-icons/fa";
import {
  AiFillInstagram,
  AiFillTwitterCircle,
  AiFillYoutube,
} from "react-icons/ai";
import Image from "next/image";
import { getStrapiMedia, getStrapiURL } from "../utils/api-helpers";
import { useState } from "react";
import { toast } from "react-toastify";
interface FooterLink {
  id: number;
  url: string;
  newTab: boolean;
  text: string;
  social?: string;
  socialIcon: any;
}

interface CategoryLink {
  id: string;
  attributes: {
    name: string;
    slug: string;
  };
}

function FooterLink({ url, text }: FooterLink) {
  const path = usePathname();
  return (
    <li className="flex  justify-center lg:justify-start mb-4 lg:mb-0">
      <Link
        href={url}
        className={`flex items-center mx-4 -mb-1 hover:text-primary-blue }`}
      >
        {text}
      </Link>
    </li>
  );
}

function CategoryLink({ attributes }: CategoryLink) {
  return (
    <li className="flex">
      <Link href={`/blog/${attributes.slug}`} className="">
        {attributes.name}
      </Link>
    </li>
  );
}

function RenderSocialIcon({ social }: { social: string | undefined }) {
  switch (social) {
    case "WEBSITE":
      return <CgWebsite />;
    case "TWITTER":
      return <AiFillTwitterCircle />;
    case "YOUTUBE":
      return <AiFillYoutube />;
    case "DISCORD":
      return <FaDiscord />;
    default:
      return null;
  }
}

export default function Footer({
  logoUrl,
  menuLinks,
  categoryLinks,
  legalLinks,
  socialLinks,
}: {
  logoUrl: string | null;
  menuLinks: Array<FooterLink>;
  categoryLinks: Array<CategoryLink>;
  legalLinks: Array<FooterLink>;
  socialLinks: Array<FooterLink>;
}) {
  const [email, setEmail] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const token = process.env.NEXT_PUBLIC_STRAPI_FORM_SUBMISSION_TOKEN;

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  async function handleSubmit(e:any) {
    e.preventDefault();
    if (email === "") {
      setErrorMessage("Email cannot be blank.");
      return;
    }

    if (!emailRegex.test(email)) {
      setErrorMessage("Invalid email format.");
      return;
    }

    const res = await fetch(getStrapiURL() + "/api/lead-form-submissions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ data: { email } }),
    });

    if (!res.ok) {
      setErrorMessage("Email failed to submit.");
      return;
    }
    setErrorMessage("");
    setSuccessMessage("Email successfully submitted!");
    toast["success"]("Thanks for subscribing to us");
    setEmail("");
  }
  return (
    <footer className="py-6">
      <div className="container px-6 mx-auto space-y-6 divide-y divide-gray-400 md:space-y-12 divide-opacity-50">
        <div className="grid grid-cols-12">
          <div className="pb-6 col-span-12 lg:col-span-6 md:pb-0  md:block lg:justify-start">
            <div className="flex justify-center lg:block lg:justify-start">
              <Logo src={logoUrl} />
            </div>
            <div className="flex justify-center lg:justify-start pt-4 space-x-3 lg:pt-0 lg:col-end-13">
              {socialLinks.map((link: FooterLink) => {
                return (
                  <a
                    key={link.id}
                    rel="noopener noreferrer"
                    href={link.url}
                    title={link.text}
                    target={link.newTab ? "_blank" : "_self"}
                    className="flex items-center justify-center w-10 h-10 rounded-full object-cover"
                  >
                    <img
                      src={`${process.env.NEXT_PUBLIC_STRAPI_API_URL}${link.socialIcon?.data?.attributes.url}`}
                      width={30}
                      height={30}
                      alt="social-icon"
                    />
                  </a>
                );
              })}
            </div>
          </div>

          <div className="col-span-12 lg:col-span-6 my-auto">
            <ul className="items-stretch justify-center lg:flex text-ex font-medium mb-[33px] whitespace-nowrap">
              {menuLinks.map((link: FooterLink) => (
                <FooterLink key={link.id} {...link} />
              ))}
            </ul>
            <form className="block lg:flex items-center text-center justify-center lg:justify-end">
              <p className="font-light mb-4 lg:mb-0 mr-[28px] ">
                Follow our news
              </p>
              <input
                type="email"
                placeholder={errorMessage || "Address e-mail"}
                onChange={(e) => setEmail(e.target.value)}
                value={email}
                className="bg-[#F5F5F5] w-2/5 p-3 rounded-[5px]"
              />
              <button className="p-3 font-medium rounded-[5px] text-white text-ex bg-primary-blue mx-4 lg:mx-[35px]" onClick={handleSubmit}>
                Submit
              </button>
            </form>
          </div>
        </div>
        <div className="grid justify-center pt-6 font-light">
          © 2023 Metta Shipping - Site web by Mettadepth.
        </div>
      </div>
    </footer>
  );
}
