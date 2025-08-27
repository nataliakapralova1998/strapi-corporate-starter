"use client";
import Image from "next/image";
import { getStrapiMedia } from "../../utils/api-helpers";
import Button, { ButtonValues } from "../atoms/Button";
import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";
import PageHeader from "../PageHeader";

interface TextImageProps {
  data: {
    id: string;
    title: string;
    subtitle?: string;
    text: any;
    textLeft: boolean;
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
    buttons: ButtonValues[];
  };
}

export default function TextImage({ data }: TextImageProps) {
  const imgUrl = getStrapiMedia(data.picture.data.attributes.url);
  const altText = data.picture.data.attributes.alternativeText || "Image";

  return (
    <section className="w-full">
      <div className="grid grid-cols-1 lg:grid-cols-2">
        <div
          className={`relative w-full ${
            data.textLeft ? "order-1 lg:order-1" : "order-1 lg:order-2"
          }`}
        >
          <div className="relative block lg:hidden aspect-[4/3] w-full">
            <Image
              src={imgUrl || ""}
              alt={altText}
              fill
              className="object-cover"
            />
          </div>

          <div className="hidden lg:block absolute inset-0">
            <Image
              src={imgUrl || ""}
              alt={altText}
              fill
              className="object-cover"
            />
          </div>
        </div>
        <div
          className={`flex items-center ${
            data.textLeft ? "order-2 lg:order-2" : "order-2 lg:order-1"
          }`}
        >
          <div className="py-12 px-5 lg:py-32 lg:px-16">
            <PageHeader heading={data.title} text={data.subtitle} />
            <div className="my-6">
              <Markdown remarkPlugins={[remarkGfm]}>{data.text}</Markdown>
            </div>
            <div className="flex flex-col sm:flex-row sm:gap-4">
              {data.buttons.map((button, index) => (
                <Button
                  key={button.id || index}
                  text={button.text}
                  type={button.type}
                  className="max-w-fit"
                  onClick={() =>
                    window.open(button.url, button.newTab ? "_blank" : "_self")
                  }
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
