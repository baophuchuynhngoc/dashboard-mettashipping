"use client";
import { useCallback, useEffect, useState } from "react";
import Blog from "../views/blog-list";
import { fetchAPI } from "../utils/fetch-api";
import HighlightedText from "./HighlightedText";
import Loader from "./Loader";
import { getStrapiMedia } from "../utils/api-helpers";
import Link from "next/link";
interface Meta {
  pagination: {
    start: number;
    limit: number;
    total: number;
  };
}
interface ArticleProps {
  data: {
    title: string;
  };
}
export default function Article({ data }: ArticleProps) {
  const [meta, setMeta] = useState<Meta | undefined>();
  const [dataFetch, setDataFetch] = useState<any>([]);
  const [isLoading, setLoading] = useState(true);
  const backgroundUrl = getStrapiMedia("/uploads/Eclipse-group.png");
  const fetchData = useCallback(async (start: number, limit: number) => {
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
        pagination: {
          start: start,
          limit: limit,
        },
      };
      const options = { headers: { Authorization: `Bearer ${token}` } };
      const responseData = await fetchAPI(path, urlParamsObject, options);

      if (start === 0) {
        setDataFetch(responseData.data);
      } else {
        setDataFetch((prevData: any[]) => [...prevData, ...responseData.data]);
      }

      setMeta(responseData.meta);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }, []);
  useEffect(() => {
    fetchData(0, Number(process.env.NEXT_PUBLIC_PAGE_LIMIT));
  }, [fetchData]);

  if (isLoading) return <Loader />;
  return (
    <section
      className="bg-no-repeat bg-[length:640px_640px] py-12"
      style={{
        backgroundImage: `url(${backgroundUrl})`,
        backgroundPosition: "left -22%",
      }}
    >
      <div className="text-center mb-[40px]">
        <Link href="/blog">
          <HighlightedText
            text={data.title}
            tag="h2"
            className="text-h2 text-primary-blue font-bold leading-none leading-[81.5px] mb-[15px]"
          />
        </Link>
      </div>
      <Blog data={dataFetch}></Blog>
    </section>
  );
}
