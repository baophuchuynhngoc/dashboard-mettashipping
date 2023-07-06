"use client";
import Image from "next/image";
import { getStrapiMedia, getStrapiURL } from "../utils/api-helpers";
import HighlightedText from "./HighlightedText";
import { useCallback, useState } from "react";
const initialData = {
  company: "",
  email: "",
  phone: "",
  typeOfCommodity: "",
  pieceCount: "",
  weight: "",
  volume: "",
  date: "",
  origin: "",
  destination: "",
};
export default function RequestARate({ data }: any) {
  const [dataRate, setDataRate] = useState(initialData);
  const backgroundImageUrl = getStrapiMedia(
    data?.imgBackground?.data?.attributes?.url
  );
  const imageUrl = getStrapiMedia(data?.picture?.data?.attributes?.url);
  const iconUrl = getStrapiMedia(data?.icon?.data?.attributes?.url);
  const token = process.env.NEXT_PUBLIC_STRAPI_FORM_SUBMISSION_TOKEN;

  const changeInput = (e: any) => {
    const { value, name } = e.target;
    setDataRate({ ...dataRate, [name]: value });
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
    const {
      company,
      email,
      phone,
      typeOfCommodity,
      pieceCount,
      weight,
      volume,
      date,
      origin,
      destination,
    } = dataRate;
    const emailTemplate = `
    Hi!

    I'm from ${company} 

    I send you a request for a rate with the following information

    Email to receive your estimate: ${email}
    Number to contact: ${phone}
    What type of commodity: ${typeOfCommodity}
    Piece count: ${pieceCount}
    Weight: ${weight}
    Volume: ${volume}
    Cargo’s ready date: ${date}
    Origin: ${origin}
    Destination: ${destination}
    
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
        data: {
          company,
          email,
          phone,
          typeOfCommodity,
          pieceCount,
          weight,
          volume,
          date,
          origin,
          destination,
        },
      }),
    });
    handleSendMail(
      dataRate,
      "MettaShipping: You have a new message",
      emailTemplate
    );
  }
  return (
    <section
      className="container grid lg:grid-cols-3 gap-[20px] bg-no-repeat bg-center m:py-12 lg:py-24"
      style={{ backgroundImage: `url(${backgroundImageUrl})` }}
    >
      <form className="col-span-2 grid lg:grid-cols-2 gap-[20px]" onSubmit={handleSubmit}>
        <div>
          <p className="font-light mb-2">Company Name</p>
          <input
            onChange={changeInput}
            type="text"
            name="company"
            className="bg-[#FAFBFE] border w-full p-3 rounded-[8px] mb-4"
          />
          <p className="font-light mb-2">Email to receive your estimate *</p>
          <input
            onChange={changeInput}
            type="text"
            name="email"
            className="bg-[#FAFBFE] border w-full p-3 rounded-[8px] mb-4"
          />
          <p className="font-light mb-2">Number to contact *</p>
          <input
            onChange={changeInput}
            type="text"
            name="phone"
            className="bg-[#FAFBFE] border w-full p-3 rounded-[8px] mb-4"
          />
          <p className="font-light mb-2">What would you like a quote for? *</p>
          <select className="bg-[#FAFBFE] border w-full p-3 rounded-[8px] mb-4">
            <option value="Import">Import</option>
            <option value="Export">Export</option>
          </select>
          <p className="font-light mb-2">What type of commodity</p>
          <input
            onChange={changeInput}
            type="text"
            name="typeOfCommondity"
            className="bg-[#FAFBFE] border w-full p-3 rounded-[8px] mb-4"
          />
        </div>
        <div>
          <p className="font-light mb-2">Piece count</p>
          <input
            onChange={changeInput}
            type="text"
            name="pieceCount"
            className="bg-[#FAFBFE] border w-full p-3 rounded-[8px] mb-4"
          />
          <p className="font-light mb-2">Weight</p>
          <input
            onChange={changeInput}
            type="text"
            name="weight"
            className="bg-[#FAFBFE] border w-full p-3 rounded-[8px] mb-4"
          />
          <p className="font-light mb-2">Volume</p>
          <input
            onChange={changeInput}
            type="text"
            name="volume"
            className="bg-[#FAFBFE] border w-full p-3 rounded-[8px] mb-4"
          />
          <p className="font-light mb-2">Cargo’s ready date</p>
          <input
            onChange={changeInput}
            type="text"
            name="date"
            className="bg-[#FAFBFE] border w-full p-3 rounded-[8px] mb-4"
          />
          <p className="font-light mb-2">Origin *</p>
          <input
            onChange={changeInput}
            type="text"
            name="origin"
            className="bg-[#FAFBFE] border w-full p-3 rounded-[8px] mb-4"
          />
          <p className="font-light mb-2">Destination *</p>
          <input
            onChange={changeInput}
            type="text"
            name="destination"
            className="bg-[#FAFBFE] border w-full p-3 rounded-[8px] mb-4"
          />
          <button className="bg-primary-blue rounded-[39px] text-white font-bold py-2 px-[33px]" onClick={handleSubmit}>
            Submit
          </button>
        </div>
      </form>
      <div
        className="bg-no-repeat bg-center bg-cover rounded-[20px] relative"
        style={{ backgroundImage: `url(${imageUrl})` }}
      >
        <HighlightedText
          text={data.title}
          tag="h1"
          className="lg:text-3xl text-xl text-white font-bold leading-[54px] pl-[35px] pt-[48px]"
        />
        <div className="hidden lg:block">
          <img
            src={iconUrl || ""}
            alt="icon"
            width={102}
            height={102}
            className="object-cover  absolute -bottom-[40px] left-0 rounded-1/2"
          />
        </div>
      </div>
    </section>
  );
}
