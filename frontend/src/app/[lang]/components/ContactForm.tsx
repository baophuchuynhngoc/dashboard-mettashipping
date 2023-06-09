import Image from "next/image";
import { getStrapiMedia } from "../utils/api-helpers";
import HighlightedText from "./HighlightedText";
import Link from "next/link";

export default function ContactForm({ data }: any) {
  const backgroundImageUrl = getStrapiMedia(
    data?.imgBackground?.data?.attributes?.url
  );
  const pictureUrl = getStrapiMedia(data?.picture?.data?.attributes?.url);
  const phoneUrl = getStrapiMedia("/uploads/Phone.png");
  const envelopUrl = getStrapiMedia("/uploads/Envelope.png");
  return (
    <section className="container grid lg:grid-cols-3 py-20 gap-10">
      <div
        className="bg-no-repeat bg-center bg-cover rounded-[20px]"
        style={{ backgroundImage: `url(${backgroundImageUrl})` }}
      >
        <HighlightedText
          text={data.title}
          tag="h1"
          className="lg:text-h2 text-h4 text-white font-bold leading-[54px] pl-[35px] pt-[250px]"
        />
      </div>
      <div className="flex flex-col">
        <form>
          <p className="font-light mb-2">Company Name</p>
          <input
            type="text"
            className="bg-[#FAFBFE] border w-full p-3 rounded-[8px] mb-4"
          />
          <p className="font-light mb-2">Email</p>
          <input
            type="text"
            className="bg-[#FAFBFE] border w-full p-3 rounded-[8px] mb-4"
          />
          <p className="font-light mb-2">Contact List</p>
          <select className="bg-[#FAFBFE] border w-full p-3 rounded-[8px] mb-4">
            <option value="Import">Import</option>
            <option value="Export">Export</option>
          </select>
          <p className="font-light mb-2">Message</p>
          <textarea className="bg-[#FAFBFE] border w-full p-3 rounded-[8px] mb-4" />
          <button className="bg-primary-blue rounded-[39px] text-white font-bold py-2 px-[33px]">Submit</button>
        </form>
      </div>
      <div className="flex flex-col gap-11">
        <HighlightedText
          text={data.description}
          tag="p"
          className=" text-p font-light leading-[24px]"
        />
        <div className="flex flex-row items-center gap-6">
          <Image src={phoneUrl || ""} alt="phone" width={40} height={40} />
          <Link href={`mailto:${data.phone}`}>
            <HighlightedText
              text={data.phone}
              tag="p"
              className=" text-p text-primary-blue font-bold leading-[24px]"
            />
          </Link>
        </div>
        <div className="flex flex-row items-center gap-6">
          <Image src={envelopUrl || ""} alt="phone" width={40} height={40} />
          <Link href={`mailto:${data.email}`}>
            <HighlightedText
              text={data.email}
              tag="p"
              className=" text-p text-primary-blue font-bold leading-[24px]"
            />
          </Link>
        </div>
        <Image
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
