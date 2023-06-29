"use client";
import { useCallback, useState } from "react";
import { getStrapiMedia, getStrapiURL } from "../utils/api-helpers";
import HighlightedText from "./HighlightedText";
import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";
const initialData = {
  name: "",
  email: "",
  phone: "",
  company: "",
  message: "",
};
export default function TestimonialForm({ data }: any) {
  const [testimonial, setTestimonial] = useState(initialData);
  const imgBackgroundUrl = getStrapiMedia(
    data?.imgBackground?.data?.attributes?.url
  );

  const token = process.env.NEXT_PUBLIC_STRAPI_FORM_SUBMISSION_TOKEN;
  const changeInput = (e: any) => {
    const { value, name } = e.target;
    setTestimonial({ ...testimonial, [name]: value });
  };

  const handleSendMail = useCallback(async (data: any, subject: string, text: string) => {
    return await fetch("/api/send-email", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ data, subject, text }),
    });
  }, []);

  async function handleSubmit(e: any) {
    const { name, email, phone, company, message } = testimonial;
    const emailTemplate = `
    ${name} have sent you a testimonail
    `
    const res = await fetch(getStrapiURL() + "/api/testimonials", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        data: { name, email, phone, company, message },
      }),
    });
    handleSendMail(testimonial, "MettaShipping: You have a new message", emailTemplate);
  }

  return (
    <section
      className="bg-center bg-no-repeat"
      style={{ backgroundImage: `url(${imgBackgroundUrl})` }}
    >
      <div className="container m:py-12 lg:py-24 ">
        <div className="mb-8">
          <HighlightedText
            text="Tell us how we did ?"
            tag="p"
            className="text-h3 text-primary-blue text-center font-light leading-[24px] mb-4"
          />
          <Markdown children={data.description} remarkPlugins={[remarkGfm]} className="text-justify	" />
        </div>
        <form
          className="lg:grid block lg:gap-[20px] lg:grid-cols-2"
          onSubmit={handleSubmit}
        >
          <div>
            <p className="font-light mb-2">Name</p>
            <input
              type="text"
              onChange={changeInput}
              name="name"
              className="bg-[#FAFBFE] border w-full p-3 rounded-[8px] mb-4"
            />
            <p className="font-light mb-2">Company Name</p>
            <input
              type="text"
              onChange={changeInput}
              name="company"
              className="bg-[#FAFBFE] border w-full p-3 rounded-[8px] mb-4"
            />
            <p className="font-light mb-2">Email</p>
            <input
              type="text"
              onChange={changeInput}
              name="email"
              className="bg-[#FAFBFE] border w-full p-3 rounded-[8px] mb-4"
            />
            <p className="font-light mb-2">Phone</p>
            <input
              type="text"
              onChange={changeInput}
              name="phone"
              className="bg-[#FAFBFE] border w-full p-3 rounded-[8px] mb-4"
            />
          </div>
          <div>
            <p className="font-light mb-2">Message</p>
            <textarea
              name="message"
              onChange={changeInput}
              className="bg-[#FAFBFE] border w-full h-full p-3 rounded-[8px] mb-4"
            />
          </div>
        </form>
        <button
          className="bg-primary-blue rounded-[39px] text-white font-bold py-2 px-[33px]"
          onClick={handleSubmit}
        >
          Submit
        </button>
      </div>
    </section>
  );
}
