"use client";
import { formatDate, getStrapiMedia } from "@/app/[lang]/utils/api-helpers";
import { postRenderer } from "@/app/[lang]/utils/post-renderer";
import Image from "next/image";
import { useCallback, useEffect, useState } from "react";
import { fetchAPI } from "../utils/fetch-api";
import Link from "next/link";

interface Article {
  id: number;
  attributes: {
    title: string;
    description: string;
    slug: string;
    cover: {
      data: {
        attributes: {
          url: string;
        };
      };
    };
    authorsBio: {
      data: {
        attributes: {
          name: string;
          avatar: {
            data: {
              attributes: {
                url: string;
              };
            };
          };
        };
      };
    };
    blocks: any[];
    publishedAt: string;
  };
}

export default function Post({ data }: { data: Article }) {
  const { title, description, publishedAt, cover, authorsBio } =
    data?.attributes;
  const author = authorsBio?.data?.attributes;
  const imageUrl = getStrapiMedia(cover?.data?.attributes?.url);
  const authorImgUrl = getStrapiMedia(
    authorsBio?.data?.attributes?.avatar?.data?.attributes?.url
  );
  const [post, setPost] = useState<any>([]);
  const [isLoading, setLoading] = useState(true);
  const [heroData, setHeroData] = useState<any>([]);

  const fetchData = useCallback(async (start: number) => {
    setLoading(true);
    try {
      const token = process.env.NEXT_PUBLIC_STRAPI_API_TOKEN;
      const path = `/articles`;
      const urlParamsObject = {
        sort: { createdAt: "desc" },
        populate: {
          cover: { fields: ["url"] },
          category: { populate: "*" },
          authorsBio: {
            populate: "*",
          },
        },
      };
      const options = { headers: { Authorization: `Bearer ${token}` } };
      const responseData = await fetchAPI(path, urlParamsObject, options);
      if (start === 0) {
        setPost(responseData.data);
      } else {
        setPost((prevData: any[]) => [...prevData, ...responseData.data]);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchData(0);
  }, [fetchData]);
  return (
    <article className="space-y-8 ">
      {/* {imageUrl && (
        <img
          src={imageUrl}
          alt="article cover image"
          width={400}
          height={400}
          className="w-full h-96 object-cover rounded-lg"
        />
      )} */}
      <div className="grid grid-cols-3 gap-[20px]">
        <div className="col-span-2">
          <div className="space-y-6">
            <div className="flex flex-col items-start justify-between w-full md:flex-row md:items-center ">
              <div className="flex items-center md:space-x-2">
                {/* {authorImgUrl && (
                            <img
                                src={authorImgUrl}
                                alt="article cover image"
                                width={400}
                                height={400}
                                className="w-14 h-14 border rounded-full dark:bg-gray-500 dark:border-gray-700"
                            />
                        )} */}
                <p className="text-md ">
                  By {author && author?.name} | {formatDate(publishedAt)}
                </p>
              </div>
            </div>
          </div>

          <div className="">
            <p>{description}</p>

            {data?.attributes?.blocks?.map((section: any, index: number) =>
              postRenderer(section, index)
            )}
          </div>
        </div>
        <div>
          <p className="font-bold mb-4">Recommended for you</p>
          <div className="flex flex-col gap-[26px]">
            {post.slice(0, 2).map((item: any, index: any) => {
              const category = item?.attributes.category.data?.attributes;
              const imgUrl = getStrapiMedia(
                item?.attributes?.cover?.data?.attributes.url
              );
              return (
                <Link
                  href={`blog/${category?.slug}/${item?.attributes?.slug}`}
                  key={item?.id}
                  className="bg-white max-w-sm mx-auto group hover:no-underline focus:no-underline lg:w-[300px] xl:min-w-[375px] rounded-[8px] overflow-hidden shadow-lg flex-1"
                >
                  {imgUrl && (
                    <img
                      alt="presentation"
                      width="371"
                      height="200"
                      className="object-cover w-full h-[200px] "
                      src={imgUrl}
                    />
                  )}
                  <div className="p-6 space-y-2 relative">
                    <h3 className="text-2xl font-semibold group-hover:underline group-focus:underline">
                      {item?.attributes?.title}
                    </h3>

                    <p className="py-4 font-light">
                      {item?.attributes?.description}
                    </p>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </div>
      <div>
        <p className="font-bold mb-4">Related News</p>
        <div className="flex flex-row gap-[30px]">
          {post.slice(0, 4).map((item: any, index: any) => {
            const category = item?.attributes?.category?.data?.attributes;
            const imgUrl = getStrapiMedia(
              item?.attributes?.cover?.data?.attributes?.url
            );

            return (
              <Link
                href={`blog/${category?.slug}/${item?.attributes?.slug}`}
                key={item.id}
                className="mx-auto group hover:no-underline focus:no-underline  rounded-[8px] overflow-hidden flex-1"
              >
                {imgUrl && (
                  <img
                    alt="presentation"
                    width="371"
                    height="200"
                    className="object-cover w-full h-[200px] "
                    src={imgUrl}
                  />
                )}
                <div className="pt-[16px] relative">
                  <h3 className="text-xl font-semibold group-hover:underline group-focus:underline">
                    {item?.attributes?.title}
                  </h3>

                  {/* <p className="py-4 font-light">
              {article.attributes.description}
            </p> */}
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </article>
  );
}
