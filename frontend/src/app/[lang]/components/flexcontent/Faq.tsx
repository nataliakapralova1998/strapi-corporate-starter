"use client";

import { useState, useRef, useEffect } from "react";
import Container from "../atoms/Container";
import Stack from "../atoms/Stack";
import PageHeader from "../molecules/PageHeader";
import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";


interface FAQProps {
  data: {
    title: string;
    faq_items: FaqItem[];
  };
}

interface FaqItem {
  id: number;
  question: string;
  answer: string;
}



function FAQItem({ item, isOpen, onClick }: {
  item: FaqItem;
  isOpen: boolean;
  onClick: () => void;
}) {
  const contentRef = useRef<HTMLDivElement>(null);
  const [height, setHeight] = useState("0px");

  useEffect(() => {
    if (isOpen && contentRef.current) {
      setHeight(`${contentRef.current.scrollHeight}px`);
    } else {
      setHeight("0px");
    }
  }, [isOpen]);

  return (
    <div className="border-b border-gray-800 py-6 transition-all duration-300 ease-in-out">
      <button
        onClick={onClick}
        className="w-full flex justify-between items-center text-left font-medium"
      >
        <span className="font-medium">{item.question}</span>
        <span
          className={`transform transition-transform duration-300 ${
            isOpen ? "rotate-45" : "rotate-0"
          }`}
        >
          +
        </span>
      </button>

      <div
        ref={contentRef}
        className="overflow-hidden transition-all duration-500 ease-in-out"
        style={{ maxHeight: height }}
      >
        <div className="mt-4 text-gray-700">
          <Markdown remarkPlugins={[remarkGfm]}>{item.answer}</Markdown>
        </div>
      </div>
    </div>
  );
}

export default function Faq({ data }: FAQProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="bg-accent py-12 lg:py-24">
      <Container>
        <Stack
          gap="gap-12"
          justifyContent="justify-center"
          alignItems="items-center"
        >
          <PageHeader heading={data.title} />
          <div className="w-full max-w-3xl mx-auto">
            {data.faq_items?.map((item, index) => (
              <FAQItem
                key={item.id}
                item={item}
                isOpen={openIndex === index}
                onClick={() => toggle(index)}
              />
            ))}
          </div>
        </Stack>
      </Container>
    </section>
  );
}
