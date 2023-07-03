"use client";
import { useCallback, useEffect, useState } from "react";
import { fetchAPI } from "../utils/fetch-api";

import BlogList from "../components/BlogList";
import Hero from "../components/Hero";
import HotTopic from "../components/HotTopic";
import Loader from "../components/Loader";

interface Meta {
  pagination: {
    start: number;
    limit: number;
    total: number;
  };
}

export default function Profile() {
  const [meta, setMeta] = useState<Meta | undefined>();
  const [data, setData] = useState<any>([]);
  const [isLoading, setLoading] = useState(true);
  const [heroData, setHeroData] = useState<any>([]);
  const industryUpdatesData = data.filter(
    (data: any) =>
      data.attributes.category.data.attributes.name === "industryUpdates"
  );
  const newsData = data.filter(
    (data: any) =>
      data.attributes.category.data.attributes.name === "news"
  );

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
      const heroPath = `/pages`;
      const heroUrlParamsObject = { filters: { slug: "blog" }, locale: "en" };
      const options = { headers: { Authorization: `Bearer ${token}` } };
      const responseData = await fetchAPI(path, urlParamsObject, options);
      const heroResponseData = await fetchAPI(
        heroPath,
        heroUrlParamsObject,
        options
      );
      if (start === 0) {
        setData(responseData.data);
        setHeroData(heroResponseData?.data[0]?.attributes?.contentSections);
      } else {
        setData((prevData: any[]) => [...prevData, ...responseData.data]);
      }

      setMeta(responseData.meta);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }, []);

  function loadMorePosts(): void {
    const nextPosts = meta!.pagination.start + meta!.pagination.limit;
    fetchData(nextPosts);
  }

  useEffect(() => {
    fetchData(0);
  }, [fetchData]);

  if (isLoading) return <Loader />;
  return (
    <div>
      <Hero data={heroData[0]} />
      <HotTopic data={newsData} />
      <BlogList data={newsData} title="Latest News" />
      <BlogList data={newsData} title="News" />
      <BlogList
        data={industryUpdatesData}
        title="Industry Updates"
      />
    </div>
  );
}
