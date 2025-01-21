"use client";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { getStrapiMedia, formatDate } from "../utils/api-helpers";
import Container from "../components/atoms/Container";
import Stack from "../components/atoms/Stack";

interface Article {
  id: number;
  attributes: {
    title: string;
    description: string;
    slug: string;
    createdAt: string;
    updatedAt: string;
    publishedAt: string;
    cover: {
      data: {
        attributes: {
          url: string;
        };
      };
    };
    category: {
      data: {
        attributes: {
          name: string;
          slug: string;
        };
      };
    };
    authorsBio: {
      data: {
        attributes: {
          name: string;
          avatar: {
            data: {
              attributes: {
                url: string;
              };
            };
          };
        };
      };
    };
  };
}

export default function PostList({
  data: articles,
  children,
}: {
  data: Article[];
  children?: React.ReactNode;
}) {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  // Get unique categories from articles
  const categories = Array.from(
    new Set(
      articles.map(
        (article) => article.attributes.category.data?.attributes.name
      )
    )
  ).filter(Boolean); // Remove null/undefined categories

  // Filter articles based on selected category
  const filteredArticles = selectedCategory
    ? articles.filter(
        (article) =>
          article.attributes.category.data?.attributes.name === selectedCategory
      )
    : articles;

  return (
    <section>
      <Container>
        <Stack gap="gap-12"> 
        {/* Category Filter */}
        <div className="flex flex-wrap items-center justify-center gap-4">
          <button
            className={`px-4 py-2 rounded text-white ${
              !selectedCategory ? "bg-secondary" : "bg-secondary/50"
            }`}
            onClick={() => setSelectedCategory(null)}
          >
            All
          </button>
          {categories.map((category) => (
            <button
              key={category}
              className={`px-4 py-2 rounded text-white ${
                selectedCategory === category
                  ? "bg-secondary "
                  : "bg-secondary/50"
              }`}
              onClick={() => setSelectedCategory(category)}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Article List */}
        <div className="grid justify-center grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filteredArticles.map((article) => {
            const imageUrl = getStrapiMedia(
              article.attributes.cover.data?.attributes.url
            );

            const category = article.attributes.category.data?.attributes;
            const authorsBio = article.attributes.authorsBio.data?.attributes;

            const avatarUrl = getStrapiMedia(
              authorsBio?.avatar.data.attributes.url
            );

            return (
              <Link
                href={`/blog/${category?.slug}/${article.attributes.slug}`}
                key={article.id}
                className="max-w-sm mx-auto group hover:no-underline focus:no-underline lg:w-[300px] xl:min-w-[375px] rounded-2xl overflow-hidden shadow-lg"
              >
                {imageUrl && (
                  <Image
                    alt="presentation"
                    width="240"
                    height="240"
                    className="object-cover w-full h-44 "
                    src={imageUrl}
                  />
                )}
                <div className="p-6 space-y-2 relative">
                  {avatarUrl && (
                    <Image
                      alt="avatar"
                      width="80"
                      height="80"
                      src={avatarUrl}
                      className="rounded-full h-16 w-16 object-cover absolute -top-8 right-4"
                    />
                  )}

                  <h3 className="text-2xl font-semibold group-hover:underline group-focus:underline">
                    {article.attributes.title}
                  </h3>

                  <div className="flex justify-between items-center">
                    <span className="text-xs  text-gray-400">
                      {formatDate(article.attributes.publishedAt)}
                    </span>
                    {authorsBio && (
                      <span className="text-xs  text-gray-400">
                        {authorsBio.name}
                      </span>
                    )}
                  </div>
                  <p className="py-4">{article.attributes.description}</p>
                </div>
              </Link>
            );
          })}
        </div>
        {children && children}
        </Stack >
      </Container>
    </section>
  );
}
