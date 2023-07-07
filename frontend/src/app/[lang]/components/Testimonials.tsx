"use client";
import Image from "next/image";
import { getStrapiMedia } from "../utils/api-helpers";
import Slider from "react-slick";
import { useCallback, useEffect, useRef, useState } from "react";
import { fetchAPI } from "../utils/fetch-api";
interface Testimonial {
  text: string;
  authorName: string;
  picture: {
    data: {
      id: string;
      attributes: {
        name: string;
        alternativeText: string;
        url: string;
      };
    };
  };
  location: string;
  star: number;
}

interface Icon {
  data: {
    id: string;
    attributes: {
      name: string;
      alternativeText: string;
      url: string;
    };
  };
}

interface TestimonialsProps {
  data: {
    id: string;
    title: string;
    description: string;
    testimonials: Testimonial[];
    icon: Icon;
  };
}

export default function Testimonials({ data }: TestimonialsProps) {
  const [dataTestimonial, setDataTestimonial] = useState<any>([]);
  const slider = useRef<any>({});
  const iconUrl = getStrapiMedia(data.icon.data.attributes.url);
  const nextArrow = getStrapiMedia("/uploads/next-arrow.png");
  const prevArrow = getStrapiMedia("/uploads/prev-arrow.png");
  const star = getStrapiMedia("/uploads/start_847b34657c.png");
  const backgroundImage = getStrapiMedia("/uploads/Eclipse.png");

  const next = () => {
    slider.current?.slickNext();
  };
  const previous = () => {
    slider.current?.slickPrev();
  };
  const settings = {
    dots: false,
    arrows: false,
    autoplay: true,
    swipe: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  const fetchData = useCallback(async () => {
    try {
      const token = process.env.NEXT_PUBLIC_STRAPI_API_TOKEN;
      const path = `/testimonials`;
      const urlParamsObject = {
        sort: { createdAt: "asc" },
        populate: {
          picture: { fields: ["url"] },
        },
      };

      const options = { headers: { Authorization: `Bearer ${token}` } };
      const responseData = await fetchAPI(path, urlParamsObject, options);
      setDataTestimonial(responseData.data);
    } catch (error) {
      console.error(error);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);
  return (
    <section
      className="bg-no-repeat bg-[length:900px_800px]"
      style={{
        backgroundImage: `url(${backgroundImage})`,
        backgroundPosition: "150%",
      }}
    >
      <div className="container p-0 relative">
        <div className="absolute top-[45%] hidden lg:flex flex-row z-10 justify-between w-full">
          <img
            src={prevArrow || ""}
            alt="next-arrow"
            width={62}
            height={62}
            onClick={previous}
            className="cursor-pointer"
          />
          <img
            src={nextArrow || ""}
            alt="next-arrow"
            width={62}
            height={62}
            onClick={next}
            className="cursor-pointer"
          />
        </div>

        <Slider ref={slider} {...settings}>
          {dataTestimonial
            .filter((data: any) => data.attributes.status === true)
            .map((testimonial: any, index: any) => {
              const imageUrl = getStrapiMedia(
                testimonial.attributes.picture?.data?.attributes?.url
              );
              return (
                <div className="m:py-12 lg:py-24">
                  <div className="mb-[16px] mx-auto w-fit">
                    {imageUrl ? (
                      <img
                        src={imageUrl || ""}
                        alt={""}
                        className="inline-block object-cover rounded-full "
                        width={200}
                        height={200}
                      />
                    ) : (
                      <div className="bg-[#fed136] rounded-full w-[200px] h-[200px]"></div>
                    )}
                  </div>
                  <div key={index}>
                    <div className="mx-auto w-fit mb-[20px] text-center">
                      <p className="text-[#1C2869]">
                        {testimonial.attributes.name}
                      </p>
                      <p className="pb-[16px] font-light">
                        {testimonial.attributes.company}
                      </p>
                      <div className="flex items-center justify-center">
                        {Array.from(Array(5), (_, index) => (
                          <img
                            src={star || ""}
                            alt="star"
                            width={16}
                            height={17}
                            className="mx-[2px]"
                            key={index}
                          />
                        ))}
                      </div>
                    </div>

                    <div className=" text-center">
                      <div className="bg-[#F6FCFF] rounded-[40px] relative lg:w-3/4 mx-auto">
                        <img
                          src={iconUrl || ""}
                          alt="quotes"
                          width={80}
                          height={72}
                          className="absolute -top-[42px] left-0"
                        />
                        <p className="p-[40px] text-p font-light">
                          {testimonial.attributes.message}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
        </Slider>
      </div>
    </section>
  );
}
