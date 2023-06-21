"use client";
import Image from "next/image";
import { getStrapiMedia } from "../utils/api-helpers";
import Link from "next/link";
import HighlightedText from "./HighlightedText";
import { useState } from "react";

export default function BlogList({ data, title }: any) {
  const [start, setStart] = useState<number>(
    Number(process.env.NEXT_PUBLIC_PAGE_LIMIT)
  );
  const [end, setEnd] = useState<number>(16);
  const skip = process.env.NEXT_PUBLIC_PAGE_LIMIT;
  const totalPage = Math.ceil((data.length - Number(skip)) / Number(skip));
  const nextArrow = getStrapiMedia("/uploads/next-arrow.png");
  const prevArrow = getStrapiMedia("/uploads/prev-arrow.png");
  const previous = () => {
    if (start > Number(skip)) {
      setStart(start - Number(skip));
      setEnd(end - Number(skip));
    }
  };
  const next = () => {
    if (end < totalPage * Number(skip) + 1) {
      setStart(start + Number(skip));
      setEnd(end + Number(skip));
    }
  };
  console.log(start, end, totalPage * Number(skip));
  return (
    <section className="container p-6 mx-auto space-y-6 sm:space-y-12 ">
      {title === "News" ? (
        <div className="flex flex-row justify-between items-center">
          <HighlightedText
            text={title}
            tag="h2"
            className="text-h2 font-bold leading-none leading-[81.5px] mb-[15px]"
          />
          <div className="flex flex-row">
            <Image
              src={prevArrow || ""}
              alt="next-arrow"
              width={62}
              height={62}
              onClick={previous}
              className="cursor-pointer"
            />
            <Image
              src={nextArrow || ""}
              alt="next-arrow"
              width={62}
              height={62}
              onClick={next}
              className="cursor-pointer"
            />
          </div>
        </div>
      ) : (
        <HighlightedText
          text={title}
          tag="h2"
          className="text-h2 font-bold leading-none leading-[81.5px] mb-[15px]"
        />
      )}
      <div className="grid justify-center grid-cols-1 gap-[30px] sm:grid-cols-2 lg:grid-cols-4">
        {title !== "News"
          ? data
              .slice(0, process.env.NEXT_PUBLIC_PAGE_LIMIT)
              .map((article: any) => {
                const imageUrl = getStrapiMedia(
                  article.attributes.cover.data?.attributes.url
                );

                const category = article.attributes.category.data?.attributes;
                const authorsBio =
                  article.attributes.authorsBio.data?.attributes;

                const avatarUrl = getStrapiMedia(
                  authorsBio?.avatar.data.attributes.url
                );

                return (
                  <Link
                    href={`blog/${category?.slug}/${article.attributes.slug}`}
                    key={article.id}
                    className="mx-auto group hover:no-underline focus:no-underline  rounded-[8px] overflow-hidden flex-1"
                  >
                    {imageUrl && (
                      <Image
                        alt="presentation"
                        width="371"
                        height="200"
                        className="object-cover w-full h-[200px] "
                        src={imageUrl}
                      />
                    )}
                    <div className="pt-[16px] relative">
                      <h3 className="text-xl font-semibold group-hover:underline group-focus:underline">
                        {article.attributes.title}
                      </h3>

                      {/* <p className="py-4 font-light">
                  {article.attributes.description}
                </p> */}
                    </div>
                  </Link>
                );
              })
          : data.slice(start, end).map((article: any) => {
              const imageUrl = getStrapiMedia(
                article.attributes.cover.data?.attributes.url
              );

              const category = article.attributes.category.data?.attributes;
              const authorsBio = article.attributes.authorsBio.data?.attributes;

              const avatarUrl = getStrapiMedia(
                authorsBio?.avatar.data.attributes.url
              );

              return (
                <Link
                  href={`blog/${category?.slug}/${article.attributes.slug}`}
                  key={article.id}
                  className="mx-auto group hover:no-underline focus:no-underline  rounded-[8px] overflow-hidden flex-1"
                >
                  {imageUrl && (
                    <Image
                      alt="presentation"
                      width="371"
                      height="200"
                      className="object-cover w-full h-[200px] "
                      src={imageUrl}
                    />
                  )}
                  <div className="pt-[16px] relative">
                    <h3 className="text-xl font-semibold group-hover:underline group-focus:underline">
                      {article.attributes.title}
                    </h3>

                    {/* <p className="py-4 font-light">
                {article.attributes.description}
              </p> */}
                  </div>
                </Link>
              );
            })}
      </div>
      {title === "News" && (
        <div className="flex flex-row justify-end items-center"></div>
      )}
    </section>
  );
}
