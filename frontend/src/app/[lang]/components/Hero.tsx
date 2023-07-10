"use client";
import Link from "next/link";
import Image from "next/image";
import HighlightedText from "./HighlightedText";
import { getStrapiMedia } from "../utils/api-helpers";
import { renderButtonStyle } from "../utils/render-button-style";
import { usePathname } from "next/navigation";

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

interface HeroProps {
  data: {
    id: string;
    title: string;
    description: string;
    picture: Picture;
    buttons: Button[];
    cover: Picture;
    attributes: {
      cover: Picture;
      title:string;
    }
  };
}

export default function Hero({ data }: HeroProps) {
  const imgUrl = !data?.attributes?.title
    ? getStrapiMedia(data?.picture?.data?.attributes?.url)
    : getStrapiMedia(data?.attributes?.cover?.data?.attributes?.url);
  const path = usePathname();
  return (
    <section
      className="bg-norepeat bg-center bg-cover"
      style={{
        backgroundImage: `url(${imgUrl})`,
      }}
    >
      {path === "/en" ? (
        <div className="container flex flex-col justify-center p-6 mx-auto sm:py-12 lg:py-24 lg:flex-row lg:justify-between">
          <div className="flex flex-col justify-center p-6 rounded-lg lg:max-w-md xl:max-w-lg text-left">
            <HighlightedText
              text={data.title}
              tag="h1"
              className="lg:text-h1 text-h2 text-white font-bold leading-[81.5px] mb-8"
            />
            <HighlightedText
              text={data.description}
              tag="p"
              className="tmt-6 mb-8 text-white text-p sm:mb-12"
            />
            <div className="flex flex-col space-y-4 w-fit sm:flex-row sm:space-y-0 sm:space-x-4 justify-start">
              {data.buttons.map((button: Button, index: number) => (
                <Link
                  key={index}
                  href={button.url}
                  target={button.newTab ? "_blank" : "_self"}
                  className="bg-white text-primary-blue text-ex font-semibold py-2 px-[40px] rounded-[39px]"
                >
                  {button.text}
                </Link>
              ))}
            </div>
          </div>
        </div>
      ) : (
        <div className="container m:pb-12 lg:pb-24 pt-12">
          <div className="flex flex-row gap-2 mb-[45px]">
            <Link href="/">
              <HighlightedText
                text="Home "
                tag="p"
                className="lg:text-ex text-ex text-white font-light hover:underline"
              />
            </Link>
            <HighlightedText
              text="> "
              tag="p"
              className="lg:text-ex text-ex text-white font-light"
            />
            {!data?.attributes?.title ? (
              <HighlightedText
                text={data.title}
                tag="p"
                className="lg:text-ex text-ex text-white font-light"
              />
            ) : (
              <HighlightedText
                text="News"
                tag="p"
                className="lg:text-ex text-ex text-white font-light"
              />
            )}
          </div>
          {!data?.attributes?.title ? (
            <HighlightedText
              text={data.title}
              tag="h1"
              className="lg:text-h1 text-h2 text-white font-bold leading-[81.5px] mb-[45px]"
            />
          ) : (
            <HighlightedText
              text={data?.attributes?.title}
              tag="h1"
              className="lg:text-h2 text-h4 text-white text-center font-bold leading-[81.5px] mb-[45px]"
            />
          )}
        </div>
      )}
    </section>
  );
}
