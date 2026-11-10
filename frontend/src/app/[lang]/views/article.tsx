import { formatDate, getStrapiMedia } from "@/app/[lang]/utils/api-helpers";
import Image from "next/image";
import componentResolver from "../utils/component-resolver";

interface Article {
  id: number;
  attributes: {
    title: string;
    description: string;
    slug: string;
    cover: {
      data: {
        attributes: {
          url: string;
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
    blocks: any[];
    publishedAt: string;
  };
}

export default function ArticleView({ data }: { data: Article }) {
  const { title, publishedAt, cover } = data.attributes;
  //   const author = authorsBio.data?.attributes;
  const imageUrl = getStrapiMedia(cover.data?.attributes.url);
  //   const authorImgUrl = getStrapiMedia(
  //     authorsBio.data?.attributes.avatar.data.attributes.url
  //   );

  return (
    <article>
      <div className="relative w-full h-[60vh]">
        {imageUrl && (
          <Image
            src={imageUrl}
            alt="article cover image"
            fill
            priority
            className="object-cover"
          />
        )}
        <div className="absolute inset-0 bg-black/10" />
        <div className="absolute bottom-12 inset-x-0">
          <div className="max-w-3xl mx-auto px-4 text-left">
            <span className="uppercase text-sm tracking-widest mb-4 block text-white">
              {formatDate(publishedAt)}
            </span>
            <h1 className="text-3xl md:text-5xl  mb-8 font-semibold leading-tight max-w-3xl text-white">
              {title}
            </h1>
          </div>
        </div>
      </div>
      <div className="my-12">
        {data.attributes.blocks.map((section: any, index: number) =>
          componentResolver(section, index)
        )}
      </div>
    </article>
  );
}
