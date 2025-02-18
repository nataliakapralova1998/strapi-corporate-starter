"use client";
import Image from "next/image";
import Container from "../atoms/Container";
import Row from "../atoms/Row";
import { getStrapiMedia } from "../../utils/api-helpers";
import Button, { ButtonValues } from "../atoms/Button";
import Stack from "../atoms/Stack";
import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";

interface TextImageProps {
  data: {
    id: string;
    title: string;
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
  
  return (
    <section className="py-12">
      <Container>
        <Row className="gap-y-16">
          <div
            className={`col-span-full lg:col-span-6 flex flex-col ${
              data.textLeft ? "lg:order-1" : "lg:order-2"
            }`}
          >
            <Stack gap="gap-6">
              <h2>{data.title}</h2>
              <div className="rich-text">
                 <Markdown children={data.text} remarkPlugins={[remarkGfm]} />
                <div className="flex flex-col max-w-fit mt-6 sm:flex-row sm:gap-4">
                  {data.buttons.map((button: ButtonValues, index: number) => (
                    <Button
                      key={button.id}
                      text={button.text}
                      type={button.type}
                      onClick={() =>
                        window.open(
                          button.url,
                          button.newTab ? "_blank" : "_self"
                        )
                      }
                    />
                  ))}
                </div>
              </div>
            </Stack>
          </div>
          <div
            className={`col-span-full lg:col-span-6 ${
              data.textLeft ? "lg:order-2" : "lg:order-1"
            }`}
          >
            <Image
              src={imgUrl || ""}
              alt={
                data.picture.data.attributes.alternativeText || "none provided"
              }
              className="object-contain lg:h-96 xl:h-112 2xl:h-128"
              width={600}
              height={600}
            />
          </div>
        </Row>
      </Container>
    </section>
  );
}
