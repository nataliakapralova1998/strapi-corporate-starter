"use client";

import Container from "../atoms/Container";
import Stack from "../atoms/Stack";
import PageHeader from "../PageHeader";
import Button from "../atoms/Button"; 

interface FeaturesProps {
  data: {
    heading: string;
    description: string;
    feature: Feature[];
  };
}

interface Feature {
  id: string;
  title: string;
  description: string;
  showLink: boolean;
  newTab: boolean;
  url: string;
  text: string;
}

function Feature({ title, description, showLink, newTab, url, text }: Feature) {
  return (
    <div className="py-8 px-4 sm:p-8 bg-white rounded-lg shadow-md transition-all duration-300 hover:shadow-xl group">
      <Stack alignItems="items-center" justifyContent="justify-center"> 
      {/* Animated Icon with continuous animation */}
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 20 20"
        fill="currentColor"
        className="w-10 h-10 text-primary/80 transition-all duration-300 group-hover:text-primary transform-gpu animate-pulse-vertical"
      >
        <path
          fillRule="evenodd"
          d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z"
          clipRule="evenodd"
        ></path>
      </svg>

      {/* Title */}
      <h3 className="my-3 text-2xl font-semibold transition-all group-hover:text-primary duration-200">
        {title}
      </h3>

      {/* Description */}
      <p className="text-lg text-justify transition-all duration-200">
        {description}
      </p>

      {showLink && url && text && (
        <div className="mt-4">
          <Button
            type="primary"
            text={text}
            onClick={() => window.open(url, newTab ? "_blank" : "_self")}
            className="group-hover:bg-primary group-hover:text-white"  // Hover effect when card is hovered
          />
        </div>
      )}
      </Stack>
    </div>
  );
}

export default function Features({ data }: FeaturesProps) {
  return (
    <section className="py-12 lg:py-24">
      <Container>
        <Stack gap="gap-12" justifyContent="justify-center" alignItems="items-center">
          <PageHeader heading={data.heading} text={data.description} />
          <div className="grid justify-center gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {data.feature.map((feature: Feature) => (
              <Feature key={feature.id} {...feature} />
            ))}
          </div>
        </Stack>
      </Container>
    </section>
  );
}
