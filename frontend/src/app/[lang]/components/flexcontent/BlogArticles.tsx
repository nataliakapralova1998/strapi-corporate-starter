"use client";
import React from "react";
import Container from "../atoms/Container";
import { getStrapiMedia } from "../../utils/api-helpers";
import Image from "next/image";
import { Picture } from "../../utils/model";
import Link from "next/link";

interface BlogItem {
  title: string;
  link: string;
  media: Picture;
}

interface BlogArticlesProps {
  data: {
    title: string;
    linkText?: string;
    linkUrl?: string;
    blogs: BlogItem[];
  };
}

export default function BlogArticles({ data }: BlogArticlesProps) {
  return (
    <section className="bg-accent py-12 md:py-24">
      <Container>
        <div className="flex items-center justify-between mb-10">
          <h3 className="max-w-60 lg:max-w-full">{data.title}</h3>
          {data.linkText && data.linkUrl && (
            <Link className="font-semibold" href={data.linkUrl}>
              {data.linkText}
            </Link>
          )}
        </div>

        {/* Scrollable list on mobile */}
        <div className="overflow-x-auto md:overflow-visible">
          <div className="flex md:grid md:grid-cols-12 md:gap-x-4 gap-6 w-fit md:w-full snap-x snap-mandatory">
            {data.blogs?.map((blog, index) => {
              const imageUrl = getStrapiMedia(
                blog.media?.data?.attributes?.url
              );
              const alt =
                blog.media?.data?.attributes?.alternativeText || blog.title;

              return (
                <div
                  key={index}
                  className="flex-shrink-0 min-w-[80vw] md:min-w-0 md:col-span-4 snap-start"
                >
                  <Link href={blog.link} className="group block">
                    <div className="relative w-full h-64 overflow-hidden mb-4">
                      {imageUrl && (
                        <Image
                          src={imageUrl}
                          alt={alt}
                          fill
                          className="object-cover transition-transform duration-300 group-hover:scale-105"
                          sizes="(max-width: 768px) 100vw, 33vw"
                        />
                      )}
                    </div>
                    <p className="font-semibold">{blog.title}</p>
                  </Link>
                </div>
              );
            })}
          </div>
        </div>
      </Container>
    </section>
  );
}
