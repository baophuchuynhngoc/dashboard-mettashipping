"use-client";
import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { getStrapiMedia } from "../utils/api-helpers";
import Image from "next/image";

export default function PaymentInfomation({ data }: any) {
  const caretDown = getStrapiMedia("/uploads/CaretDown.png");
  const imgBackgroundUrl = getStrapiMedia(data?.imgBackground?.data?.attributes?.url);
  return (
    <section className="container m:py-12 lg:py-24">
      <div className="border py-[20px] px-[32px] rounded-[20px]">
        <table className="text-left border-spacing-8">
          <thead className="bg-[#0E56861A] text-primary-blue ">
            <tr className="">
              <th className="py-[15px] px-[30px] text-p font-semibold rounded-l-[24px]">
                PAYMENT METHOD
              </th>
              <th className="py-[15px] px-[30px] text-p font-semibold ">
                AVERAGE PROCESSING TIME
              </th>
              <th className="py-[15px] px-[30px] text-p font-semibold rounded-r-[24px]">
                ACCESS TO PAID FEATURES
              </th>
            </tr>
          </thead>
          <tbody>
            {data.table.map((item: any, index: any) => {
              return (
                <tr key={index} className="even:bg-[#F5F5F5]">
                  <td className="py-[15px] px-[30px] text-ex rounded-l-[24px] whitespace-nowrap list-disc">
                    {item.title}
                  </td>
                  <td className="py-[15px] px-[30px] text-ex">
                    <Markdown
                      children={item.processingTime}
                      remarkPlugins={[remarkGfm]}
                    />
                  </td>
                  <td className="py-[15px] px-[30px] text-ex rounded-r-[24px]">
                    {item.paidFeatures}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      <ul className="pt-[50px] ">
        {data.paymentMethod.map((item: any, index: any) => {
          return (
            <li className="border rounded-[20px] font-semibold py-[15px] px-[24px] uppercase text-primary-blue mb-4 list-disc list-inside items-baseline">
              {item?.title}{" "}
              <span className="inline-flex float-right">
                <Image
                  src={caretDown || ""}
                  alt="caret-down"
                  width={20}
                  height={20}
                />
              </span>
            </li>
          );
        })}
      </ul>
      <div className="grid grid-cols-3 mt-[45px] items-center">
        <div className="col-span-2 grid grid-cols-5">
          {data.paymentMethod.map((item: any, index: any) => {
            const paymentMethodUrl = getStrapiMedia(
              item?.picture?.data?.attributes?.url
            );
            return (
              <>
                {paymentMethodUrl && (
                  <Image
                    src={paymentMethodUrl || ""}
                    alt="pay-method"
                    width={108}
                    height={72}
                  />
                )}
              </>
            );
          })}
        </div>
        <Image src={imgBackgroundUrl || ""} alt="" width={330} height={268} className="mx-auto" />
      </div>
    </section>
  );
}
