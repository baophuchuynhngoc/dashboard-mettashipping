import { formatDate, getStrapiMedia } from "../utils/api-helpers";
import HighlightedText from "./HighlightedText";

export default function HotTopic({ data }: any) {
  const { title, description, publishedAt, cover, authorsBio } =
    data[0]?.attributes;
  const backgroundUrl = getStrapiMedia(
    data[0]?.attributes?.cover?.data?.attributes.url
  );
  return (
    <section className="container p-6 mx-auto space-y-6 sm:space-y-12  ">
      <HighlightedText
        text="Hot Topic"
        tag="h2"
        className="text-h2 font-bold leading-none leading-[81.5px] mb-[15px]"
      />
      <div className="grid lg:grid-cols-3 gap-[30px]">
        <div
          className="col-span-2 bg-no-repeat bg-center bg-cover rounded-[8px]"
          style={{ backgroundImage: `url(${backgroundUrl})` }}
        >
          <div className="pt-[190px] px-[32px]">
            <p className="text-h2 text-white font-bold hover:underline hover:cursor-pointer ">{title}</p>
            <p className="font-thin text-white mb-[30px]">{formatDate(publishedAt)}</p>
          </div>
        </div>
        <div className="max-h-[358px]">
          {/* <p>{description}</p> */}
        </div>
      </div>
    </section>
  );
}
