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
      icon:Picture;
    };
  }

export default function Introduce ({ data }: IntroduceProps) {
  const imgUrl = getStrapiMedia(data.picture.data.attributes.url);
  const imgBackgroundUrl = getStrapiMedia(data.imgBackground.data.attributes.url);
  const iconUrl = getStrapiMedia(data.icon.data.attributes.url);
    console.log(data);
    return (
        <section className="bg-primary-blue relative mb-[210px]">
            <div className="">
            <div className="bg-no-repeat bg-bottom bg-cover lg:bg-auto pt-[34px] pb-[59px]" style={{backgroundImage: `url(${imgBackgroundUrl})`,backgroundSize: "1372px 544px"}}>
                <div className="container p-6 mx-auto sm:py-12 lg:py-24 lg:flex-row lg:justify-between">
                    <div className="text-center mb-[40px]">
                <HighlightedText
                    text={data.title}
                    tag="h2"
                    className="text-h2 text-white font-bold leading-none leading-[81.5px] mb-[15px]"
                    />
                    <HighlightedText
                    text={data.subTitle}
                    tag="h4"
                    className="text-h4 text-white font-semibold leading-none leading-[81.5px]"
                    />
                    </div>
                    <div>
                        <ul className="lg:w-[30%] list-disc text-white">
                            {data.paragraph.map((para,index) => (
                                <li key={index} className="mb-[40px]">{para.description}</li>
                                )
                                
                                )}
                        </ul>
                        <div className="mt-2">
                        <Link
                            href={data.buttons.url}
                            target={data.buttons.newTab ? "_blank" : "_self"}
                            className="bg-white text-primary-blue text-ex font-semibold py-2 px-[40px] rounded-[39px] "
                        >
                            {data.buttons.text}
                        </Link>
                        </div>
                    </div>
                </div>
                <div className="lg:absolute lg:-bottom-8 lg:right-36">
                    <Image src={imgUrl} alt="" width={729} height={540} className="rounded-[12px] " />
                    <Image src={iconUrl} alt="" width={101} height={101} className="rounded-[12px] absolute -top-[40px] -left-[50px]" />
                    <div className="absolute -bottom-[70px] -right-[36px]">
                        <div className="text-white py-[32px] px-[15px] bg-primary-brown rounded-[12px]">
                            <p className="text-[40px] font-bold w-fit mx-auto">1245</p>
                            <p className="text-h4 w-fit">clients worldwide</p>
                        </div>
                    </div>
                </div>
            </div>
            </div>

        </section>
    )
}