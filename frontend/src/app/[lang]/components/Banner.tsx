"use client";

import { getStrapiMedia } from "../utils/api-helpers";
import HighlightedText from "./HighlightedText";

export default function Banner({ data }: any) {
  const imgBackgroundUrl = getStrapiMedia(
    data?.imgBackground?.data?.attributes?.url
  );
  return (
    <section
      className="bg-no-repeat bg-center bg-cover"
      style={{ backgroundImage: `url(${imgBackgroundUrl})` }}
    >
      <div className="container pt-[141px] pb-[236px]">
        <HighlightedText
          text={data.title}
          tag="h2"
          className="text-h2 text-white font-bold leading-[72px]  mb-[15px]"
        />
      </div>
    </section>
  );
}
