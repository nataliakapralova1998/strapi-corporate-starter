"use client";
import { useState } from "react";
import Container from "../components/atoms/Container";
import Stack from "../components/atoms/Stack";
import BlogListItem, { BlogListItemArticle } from "../components/molecules/BlogListItem";
import Row from "../components/atoms/Row";

interface Article extends BlogListItemArticle {}

export default function PostList({
  data: articles,
  children,
}: {
  data: Article[];
  children?: React.ReactNode;
}) {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const categories = Array.from(
    new Set(
      articles.map(
        (article) => article.attributes.category.data?.attributes.name
      )
    )
  ).filter(Boolean) as string[];

  const filteredArticles = selectedCategory
    ? articles.filter(
        (article) =>
          article.attributes.category.data?.attributes.name === selectedCategory
      )
    : articles;

  return (
    <section className="px-5 md:px-16">
        {/* <Stack gap="gap-12"> */}
          {/* <div className="flex flex-wrap items-center justify-center gap-3">
            <button
              className={`px-3 py-1.5 rounded-full text-sm ${
                !selectedCategory ? "bg-neutral-900 text-white" : "bg-neutral-200 text-neutral-800"
              }`}
              onClick={() => setSelectedCategory(null)}
            >
              All
            </button>
            {categories.map((category) => (
              <button
                key={category}
                className={`px-3 py-1.5 rounded-full text-sm ${
                  selectedCategory === category
                    ? "bg-primary text-white"
                    : "bg-primary/10 text-neutral-800"
                }`}
                onClick={() => setSelectedCategory(category)}
              >
                {category}
              </button>
            ))}
          </div> */}

          <Row className="gap-x-3 gap-y-16 my-12">
            {filteredArticles.map((article) => (
              <div key={article.id} className="col-span-2 md:col-span-6 lg:col-span-3">
                <BlogListItem article={article} />
              </div>
            ))}
          </Row>
          {children && children}
        {/* </Stack> */}
     
    </section>
  );
}
