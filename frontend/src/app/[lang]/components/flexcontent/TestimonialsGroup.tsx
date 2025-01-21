import Image from "next/image";
import { getStrapiMedia } from "../../utils/api-helpers";
import Container from "../atoms/Container";
import Stack from "../atoms/Stack";
import PageHeader from "../PageHeader";

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
}

interface TestimonialsProps {
  data: {
    id: string;
    title: string;
    description: string;
    testimonials: Testimonial[];
  };
}

function Testimonial({ text, authorName, picture }: Readonly<Testimonial>) {
  const imageUrl = getStrapiMedia(picture.data?.attributes.url);
  return (
    <div className="flex flex-col items-center">
      <div className="flex items-center">
        <div className="my-6">
          <Image
            src={imageUrl ?? ""}
            alt={picture.data?.attributes.alternativeText || "none provided"}
            className="inline-block h-32 w-32 rounded-full"
            width={200}
            height={200}
          />
        </div>
      </div>
      <div className="relative text-center">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 512 512"
          fill="currentColor"
          className="absolute top-0 left-0 w-8 h-8 text-gray-700"
        >
          <path d="M232,246.857V16H16V416H54.4ZM48,48H200V233.143L48,377.905Z"></path>
          <path d="M280,416h38.4L496,246.857V16H280ZM312,48H464V233.143L312,377.905Z"></path>
        </svg>
        <p className="px-6 py-1 text-lg italic">{text}</p>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 512 512"
          fill="currentColor"
          className="absolute bottom-0 right-0 w-8 h-8 text-gray-700"
        >
          <path d="M280,185.143V416H496V16H457.6ZM464,384H312V198.857L464,54.1Z"></path>
          <path d="M232,16H193.6L16,185.143V416H232ZM200,384H48V198.857L200,54.1Z"></path>
        </svg>
      </div>
      <span className="w-12 h-1 my-2 rounded-lg bg-primary/40"></span>
      <b>{authorName}</b>
    </div>
  );
}

export default function Testimonials({ data }: TestimonialsProps) {
  return (
    <section className="lg:py-24">
      <Container>
        <Stack>
          <PageHeader heading={data.title} text={data.description} />
          <div className="container mx-auto grid grid-cols-1 gap-8 lg:gap-20 md:px-10 md:pb-10 lg:grid-cols-2">
            {data.testimonials.map(
              (testimonial: Testimonial, index: number) => (
                <Testimonial key={index} {...testimonial} />
              )
            )}
          </div>
        </Stack>
      </Container>
    </section>
  );
}
