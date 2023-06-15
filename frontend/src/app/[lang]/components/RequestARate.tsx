import Image from "next/image";
import { getStrapiMedia } from "../utils/api-helpers";
import HighlightedText from "./HighlightedText";

export default function RequestARate({ data }: any) {
  const backgroundImageUrl = getStrapiMedia(
    data?.imgBackground?.data?.attributes?.url
  );
  const imageUrl = getStrapiMedia(data?.picture?.data?.attributes?.url);
  const iconUrl = getStrapiMedia(data?.icon?.data?.attributes?.url);
  return (
    <section
      className="container grid lg:grid-cols-3 gap-[20px] bg-no-repeat bg-center m:py-12 lg:py-24"
      style={{ backgroundImage: `url(${backgroundImageUrl})` }}
    >
      <div>
        <p className="font-light mb-2">Company Name</p>
        <input
          type="text"
          className="bg-[#FAFBFE] border w-full p-3 rounded-[8px] mb-4"
        />
        <p className="font-light mb-2">Email to receive your estimate *</p>
        <input
          type="text"
          className="bg-[#FAFBFE] border w-full p-3 rounded-[8px] mb-4"
        />
        <p className="font-light mb-2">Number to contact *</p>
        <input
          type="text"
          className="bg-[#FAFBFE] border w-full p-3 rounded-[8px] mb-4"
        />
        <p className="font-light mb-2">What would you like a quote for? *</p>
        <select className="bg-[#FAFBFE] border w-full p-3 rounded-[8px] mb-4">
          <option value="Import">Import</option>
          <option value="Export">Export</option>
        </select>
        <p className="font-light mb-2">What type of commodity</p>
        <input
          type="text"
          className="bg-[#FAFBFE] border w-full p-3 rounded-[8px] mb-4"
        />
      </div>
      <div>
        <p className="font-light mb-2">Piece count</p>
        <input
          type="text"
          className="bg-[#FAFBFE] border w-full p-3 rounded-[8px] mb-4"
        />
        <p className="font-light mb-2">Weight</p>
        <input
          type="text"
          className="bg-[#FAFBFE] border w-full p-3 rounded-[8px] mb-4"
        />
        <p className="font-light mb-2">Volume</p>
        <input
          type="text"
          className="bg-[#FAFBFE] border w-full p-3 rounded-[8px] mb-4"
        />
        <p className="font-light mb-2">Cargo’s ready date</p>
        <input
          type="text"
          className="bg-[#FAFBFE] border w-full p-3 rounded-[8px] mb-4"
        />
        <p className="font-light mb-2">Origin *</p>
        <input
          type="text"
          className="bg-[#FAFBFE] border w-full p-3 rounded-[8px] mb-4"
        />
        <p className="font-light mb-2">Destination *</p>
        <input
          type="text"
          className="bg-[#FAFBFE] border w-full p-3 rounded-[8px] mb-4"
        />
        <button className="bg-primary-blue rounded-[39px] text-white font-bold py-2 px-[33px]">
          Submit
        </button>
      </div>
      <div
        className="bg-no-repeat bg-center bg-cover rounded-[20px] relative"
        style={{ backgroundImage: `url(${imageUrl})` }}
      >
        <HighlightedText
          text={data.title}
          tag="h1"
          className="lg:text-3xl text-xl text-white font-bold leading-[54px] pl-[35px] pt-[48px]"
        />
        <div className="">
          <Image
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
