import Image from "next/image";
import { getStrapiMedia } from "../utils/api-helpers";
import HighlightedText from "./HighlightedText";

export default function TheyChooseUs({ data }: any) {
  const pictureUrl = getStrapiMedia(data?.picture?.data?.attributes?.url);
  return (
    <section className="m:py-12 lg:py-24">
      <div className="grid lg:grid-cols-2">
        <div>
          <Image src={pictureUrl || ""} alt="" width={710} height={508} />
        </div>
        <div className="container py-6 lg:py-0">
          <HighlightedText
            text={data.title}
            tag="h2"
            className="text-h2 text-primary-blue font-bold leading-[72px]  mb-[15px]"
          />
          <HighlightedText
            text={data.description}
            tag="p"
            className="text-para mb-[15px]"
          />
        </div>
      </div>
    </section>
  );
}
