import Link from "next/link";
import { getStrapiMedia } from "../utils/api-helpers";
import Image from "next/image";

interface FeaturesProps {
  data: {
    heading: string;
    description: string;
    feature: Feature[];
  };
}

interface Feature {
  id: string;
  title: string;
  description: string;
  showLink: boolean;
  newTab: boolean;
  url: string;
  text: string;
  media:  string;
  icon: string;
  index: number;
}

function Feature({ title, description, media,icon,id,index}: Feature) {
  const imgUrl = getStrapiMedia(media?.data.attributes.url);
  const iconUrl = getStrapiMedia(icon?.data.attributes.url);
  console.log(123123,index);
  return (
    <div className="flex flex-col lg:odd:flex-row lg:even:flex-row-reverse items-center justify-center lg:gap-[130px] mb-[40px] lg:mb-[138px] last:mb-0">
    <div className="flex flex-col p-4 flex-1">
      <h3 className="my-3 text-3xl text-primary-blue font-semibold">{title}</h3>
      <div className="space-y-1 leading-tight my-6">
        <p>{description}</p>
      </div>
    </div>
    <div className="flex-1 relative">
      <Image src={imgUrl} alt="" width="588" height="335" className="w-full aspect-[7/4] rounded-[12px] "/>
      {0 === Number(index) && <Image src={iconUrl} alt="" width={122} height={122} className="object-cover absolute -bottom-[63px] -left-[63px] "/>}
      {1 === Number(index) && <Image src={iconUrl} alt="" width={122} height={122} className="object-cover absolute -bottom-[63px] right-[46px] "/>}
      {2 === Number(index) && <Image src={iconUrl} alt="" width={122} height={122} className="object-cover absolute -top-[60px] left-[57px] "/>}
      {3 === Number(index) && <Image src={iconUrl} alt="" width={122} height={122} className="object-cover absolute top-[30%] -right-[60px] "/>}
    </div>
    </div>
  );
}

export default function Features({ data }: FeaturesProps) {
  return (
    <section className=" m:py-12 lg:py-24">
      {/* <div className="container mx-auto py-4 space-y-2 text-center">
        <h2 className="text-5xl font-bold">{data.heading}</h2>
        <p className="dark:text-gray-400">{data.description}</p>
      </div> */}
      <div className="container mx-auto my-6 ">
        {data.feature.map((feature: Feature, index: number) => (
          <Feature key={index} {...feature} index={index} />
        ))}
      </div>
    </section>
  );
}
