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
    <Stack >
      <h3>{title}</h3>
      <p>{description}</p>
      {showLink && url && text && (
        <div className="mt-4">
          <Button
            type="primary"
            text={text}
            onClick={() => window.open(url, newTab ? "_blank" : "_self")}
          />
        </div>
      )}
    </Stack>
  );
}

export default function Features({ data }: FeaturesProps) {
  return (
    <section className="bg-accent">
      <Container className="py-12 lg:py-24">
        <Stack
          gap="gap-12"
          justifyContent="justify-center"
          alignItems="items-center"
        >
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
