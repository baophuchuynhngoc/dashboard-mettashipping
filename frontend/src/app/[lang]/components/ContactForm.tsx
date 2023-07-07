"use client";
import Image from "next/image";
import { getStrapiMedia, getStrapiURL } from "../utils/api-helpers";
import HighlightedText from "./HighlightedText";
import Link from "next/link";
import { useCallback, useState } from "react";
const initialData = {
  email: "",
  company: "",
  message: "",
};

export default function ContactForm({ data }: any) {
  const [dataContact, setDataContact] = useState(initialData);
  const backgroundImageUrl = getStrapiMedia(
    data?.imgBackground?.data?.attributes?.url
  );
  const pictureUrl = getStrapiMedia(data?.picture?.data?.attributes?.url);
  const phoneUrl = getStrapiMedia("/uploads/Phone_77d4d0de51.png");
  const envelopUrl = getStrapiMedia("/uploads/Envelope_ba41de3cec.png");
  const token = process.env.NEXT_PUBLIC_STRAPI_FORM_SUBMISSION_TOKEN;

  const changeInput = (e: any) => {
    const { value, name } = e.target;
    setDataContact({ ...dataContact, [name]: value });
  };

  const handleSendMail = useCallback(
    async (data: any, subject: string, text: string) => {
      return await fetch("/api/send-email", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ data, subject, text }),
      });
    },
    []
  );
  async function handleSubmit(e: any) {
    const { email, company, message } = dataContact;
    const emailTemplate = `
    Hi!

    I'm from ${company} 

    ${message}
    
    Looking forward to hearing from you.
    Thanks!
    `;
    const res = await fetch(getStrapiURL() + "/api/testimonials", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        data: { email, company, message },
      }),
    });
    handleSendMail(
      dataContact,
      "MettaShipping: You have a new message",
      emailTemplate
    );
  }
  return (
    <section className="container grid lg:grid-cols-3 py-20 gap-10">
      <div
        className="bg-no-repeat bg-center bg-cover rounded-[20px] relative"
        style={{ backgroundImage: `url(${backgroundImageUrl})` }}
      >
        <HighlightedText
          text={data.title}
          tag="h1"
          className="lg:text-h2 text-h4 text-white font-bold leading-[54px] pl-[35px] py-12 lg:py-0 text-center lg:text-left lg:absolute lg:bottom-10"
        />
      </div>
      <div className="flex flex-col">
        <form onSubmit={handleSubmit}>
          <p className="font-light mb-2">Company Name</p>
          <input
            type="text"
            name="company"
            className="bg-[#FAFBFE] border w-full p-3 rounded-[8px] mb-4"
            onChange={changeInput}
          />
          <p className="font-light mb-2">Email</p>
          <input
            type="text"
            name="email"
            className="bg-[#FAFBFE] border w-full p-3 rounded-[8px] mb-4"
            onChange={changeInput}
          />
          <p className="font-light mb-2">Contact List</p>
          <select className="bg-[#FAFBFE] border w-full p-3 rounded-[8px] mb-4">
            <option value="Import">Import</option>
            <option value="Export">Export</option>
          </select>
          <p className="font-light mb-2">Message</p>
          <textarea
            className="bg-[#FAFBFE] border w-full p-3 rounded-[8px] mb-4"
            name="message"
            onChange={changeInput}
          />
          <button
            className="bg-primary-blue rounded-[39px] text-white font-bold py-2 px-[33px]"
            onClick={handleSubmit}
          >
            Submit
          </button>
        </form>
      </div>
      <div className="flex flex-col gap-11">
        <HighlightedText
          text={data.description}
          tag="p"
          className=" text-p font-light leading-[24px] text-justify"
        />
        <div className="flex flex-row items-center gap-6">
          <img src={phoneUrl || ""} alt="phone" width={40} height={40} />
          <div>
            {data?.information?.map((item: any, index: number) => {
              return (
                <Link href={`tel:${item?.phone}`} key={index}>
                  <HighlightedText
                    text={item.phone}
                    tag="p"
                    className=" text-p text-primary-blue font-bold leading-[24px]"
                  />
                </Link>
              );
            })}
            {data?.information?.map((item: any) => {
              console.log(item.phone);
              return <></>;
            })}
          </div>
        </div>
        <div className="flex flex-row items-center gap-6">
          <img src={envelopUrl || ""} alt="phone" width={40} height={40} />
          <div>
            {data?.information.map((item: any, index: number) => {
              return (
                <Link href={`mailto:${item?.email}`} key={index}>
                  <HighlightedText
                    text={item?.email}
                    tag="p"
                    className=" text-p text-primary-blue font-bold leading-[24px]"
                  />
                </Link>
              );
            })}
          </div>
        </div>
        <img
          src={pictureUrl || ""}
          alt="mapwithpin"
          width={337}
          height={190}
          className="w-full"
        />
      </div>
    </section>
  );
}
