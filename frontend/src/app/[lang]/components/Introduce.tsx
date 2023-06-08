import Link from "next/link";
import { getStrapiMedia } from "../utils/api-helpers";
import HighlightedText from "./HighlightedText";
import Image from "next/image";

interface Button {
  id: string;
  url: string;
  text: string;
  type: string;
  newTab: boolean;
}

interface Picture {
  data: {
    id: string;
    attributes: {
      url: string;
      name: string;
      alternativeText: string;
    };
  };
}

interface Paragrah {
  id: string;
  description: string;
}

interface IntroduceProps {
  data: {
    id: string;
    title: string;
    subTitle: string;
    description: string;
    imgBackground: Picture;
    picture: Picture;
    buttons: Button;
    paragraph: Paragrah[];
    icon: Picture;
  };
}

export default function Introduce({ data }: IntroduceProps) {
  const imgUrl = getStrapiMedia(data.picture.data.attributes.url);
  const imgBackgroundUrl = getStrapiMedia(
    data.imgBackground.data.attributes.url
  );
  const iconUrl = getStrapiMedia(data.icon.data.attributes.url);
  return (
    <section className="relative mb-[110px]">
      <div
        className="bg-no-repeat bg-center lg:bg-right bg-cover lg:bg-auto"
        style={{
          backgroundImage: `url(${imgBackgroundUrl})`,
          backgroundSize: "1372px 544px",
        }}
      >
        <div className="container grid grid-cols-1 lg:grid-cols-2 p-6 mx-auto">
          <div className="">
            <div className="mb-[40px] lg:w-4/5 lg:text-left text-center">
              <HighlightedText
                text={data.title}
                tag="h2"
                className="text-h2 text-primary-blue font-bold leading-[72px]  mb-[15px]"
              />
              <HighlightedText
                text={data.subTitle}
                tag="h4"
                className="text-h4 text-primary-blue font-semibold "
              />
            </div>
            <ul className="list-disc text-primary-blue text-justify lg:w-2/3">
              {data.paragraph.map((para, index) => (
                <li key={index} className="mb-[40px]">
                  {para.description}
                </li>
              ))}
            </ul>
          </div>
          <div className="relative">
            <Image
              src={imgUrl || ""}
              alt=""
              width={729}
              height={540}
              className="rounded-[12px] mt-[40px] w-full"
            />
            <div className="absolute -bottom-[20px] left-0">
              <div className="text-white py-[22px] px-[15px] bg-primary-brown rounded-[12px]">
                <p className="text-[20px] lg:text-[40px] font-bold w-fit mx-auto">
                  1245
                </p>
                <p className="text-p lg:text-h4 w-fit">clients worldwide</p>
              </div>
            </div>
            <Image
              src={iconUrl || ""}
              alt=""
              width={101}
              height={101}
              className="rounded-[12px] absolute bottom-[13%] -left-[50px]"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
