"use client";
import NextImage from "next/image";
import { getStrapiMedia } from "../../utils/api-helpers";
import Button, { ButtonValues } from "../atoms/Button";

type ImageProps = {
  data: {
    media: {
      data: {
        attributes: {
          url: string;
          alternativeText?: string;
          width?: number;
          height?: number;
        };
      };
    };
    button?: ButtonValues
  };
};

export default function Image({ data }: ImageProps) {
  const imageData = data?.media?.data?.attributes;
  const imageUrl = getStrapiMedia(imageData?.url);

  if (!imageUrl) return null;

  const handleClick = () => {
    if (data.button?.url) {
      if (data.button.newTab) {
        window.open(data.button.url, "_blank");
      } else {
        window.location.href = data.button.url;
      }
    }
  };

  return (
    <section className="relative w-full h-full lg:h-[500px] overflow-hidden">
      <NextImage
        src={imageUrl}
        alt={data.media.data.attributes.alternativeText || ""}
        width={imageData?.width || 500}
        height={imageData?.height || 500}
        className="w-full h-auto object-cover"
      />

      {data.button && (
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
          <Button
            type={data.button.type}
            text={data.button.text}
            onClick={handleClick}
          />
        </div>
      )}
    </section>
  );
}
