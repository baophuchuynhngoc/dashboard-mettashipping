"use client";
import Image from "next/image";
import { useState } from "react";
import { getStrapiMedia } from "../utils/api-helpers";
import HiddenTerm from "./HiddenTerm";

export default function Terminologies({ data }: any) {
  const [isOpen, setIsOpen] = useState(false);
  const [currentId, setCurrentId] = useState(0);
  const caretDown = getStrapiMedia("/uploads/CaretDown.png");
  const caretUp = getStrapiMedia("/uploads/CaretUp.png");
  const handleOpen = (index: any) => {
    setIsOpen(!isOpen);
    setCurrentId(index);
  };

  return (
    <section className="container">
      <div>
        <ul className="pt-[50px] ">
          {data.terminology.map((item: any, index: any) => {
            return (
              <>
                <li
                  className="border rounded-[20px] font-semibold py-[15px] px-[24px] uppercase text-primary-blue mb-4 list-disc list-inside items-baseline"
                  key={index}
                  onClick={() => handleOpen(item.id)}
                >
                  {item?.title}
                  <span className="inline-flex float-right">
                    {currentId !== item.id ? (
                      <Image
                        src={caretDown || ""}
                        alt="caret-down"
                        width={20}
                        height={20}
                      />
                    ) : (
                      <Image
                        src={caretUp || ""}
                        alt="caret-up"
                        width={20}
                        height={20}
                      />
                    )}
                  </span>
                </li>
                {currentId === item.id && (
                  <HiddenTerm data={item} key={index} />
                )}
              </>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
