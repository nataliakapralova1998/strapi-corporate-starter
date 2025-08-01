"use client";
import React from "react";
import Container from "../atoms/Container";
import Row from "../atoms/Row";
import { getStrapiMedia } from "../../utils/api-helpers";
import Button, { ButtonValues } from "../atoms/Button";
import Image from "next/image";

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

interface HeroProps {
  data: {
    id: string;
    title: string;
    description: string;
    picture: Picture;
    buttons: ButtonValues[];
  };
}

export default function Hero({ data }: HeroProps) {
  const imgUrl = getStrapiMedia(data.picture.data.attributes.url);
  return (
    <Container className="my-16">
      <Row className="gap-12 md:gap-6">
        <div className="col-span-full lg:col-span-5 lg:col-start-2">
          <div className="space-y-8">
            <h1>{data.title}</h1>
            <p>{data.description}</p>
            <div className="flex flex-col space-y-4 sm:flex-row sm:space-y-0 sm:space-x-4">
              {data.buttons.map((button: ButtonValues, index: number) => (
                <Button
                  key={button.id}
                  text={button.text}
                  type={button.type}
                  className="w-fit"
                  onClick={() =>
                    window.open(button.url, button.newTab ? "_blank" : "_self")
                  }
                />
              ))}
            </div>
          </div>
        </div>
        <div className="hidden lg:block col-span-full lg:col-span-7 lg:col-start-7">
          <Image
            src={imgUrl || ""}
            alt={
              data.picture.data.attributes.alternativeText || "none provided"
            }
            className="object-contain h-72 sm:h-80 lg:h-96 xl:h-112 2xl:h-128"
            width={600}
            height={600}
          />
        </div>
      </Row>
    </Container>
  );
}
