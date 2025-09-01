import Image from "next/image";
import Link from "next/link";
import { getStrapiMedia, formatDate } from "../utils/api-helpers";

export interface BlogListItemArticle {
  id: number;
  attributes: {
    title: string;
    description: string;
    slug: string;
    publishedAt: string;
    cover: {
      data?: {
        attributes: {
          url: string;
        };
      } | null;
    };
    category: {
      data?: {
        attributes: {
          name: string;
          slug: string;
        };
      } | null;
    };
    authorsBio: {
      data?: {
        attributes: {
          name: string;
          avatar: {
            data?: {
              attributes: {
                url: string;
              };
            } | null;
          };
        };
      } | null;
    };
  };
}

export default function BlogListItem({
  article,
}: {
  article: BlogListItemArticle;
}) {
  const imageUrl = getStrapiMedia(
    article.attributes.cover.data?.attributes.url ?? null
  );
  const category = article.attributes.category.data?.attributes;

  return (
    <Link
      href={`/blog/${category?.slug}/${article.attributes.slug}`}
      className="group block overflow-hidden"
    >
      <div className="mb-1">
        {imageUrl && (
          <Image
            alt={article.attributes.title}
            width={400}
            height={200}
            className="object-cover h-48 mb-2"
            src={imageUrl}
            priority={false}
          />
        )}
        <span className="text-xs uppercase tracking-widest text-text">
          {formatDate(article.attributes.publishedAt)}
        </span>
      </div>
      <h3 className="leading-[22px] text-[14px] font-medium font-manrope">
        {article.attributes.title}
      </h3>
    </Link>
  );
}
