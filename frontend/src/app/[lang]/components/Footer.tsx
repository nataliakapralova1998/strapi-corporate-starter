"use client";
import { usePathname } from "next/navigation";
import Link from "next/link";
import Logo from "./atoms/Logo";
import { CgWebsite } from "react-icons/cg";
import { FaDiscord } from "react-icons/fa";
import { AiFillTwitterCircle, AiFillYoutube } from "react-icons/ai";
import AnimatedLink from "./atoms/AnimatedLink";
import Row from "./atoms/Row";
import Container from "./atoms/Container";

interface FooterLink {
  id: number;
  url: string;
  newTab: boolean;
  text: string;
  social?: string;
}

interface CategoryLink {
  id: string;
  attributes: {
    name: string;
    slug: string;
  };
}

const RenderSocialIcon = ({ social }: { social?: string }) => {
  const socialIcons: Record<string, JSX.Element | null> = {
    WEBSITE: <CgWebsite />,
    TWITTER: <AiFillTwitterCircle />,
    YOUTUBE: <AiFillYoutube />,
    DISCORD: <FaDiscord />,
  };
  return social ? socialIcons[social] || null : null;
};

// Type Guard to check if the item is a FooterLink
function isFooterLink(item: FooterLink | CategoryLink): item is FooterLink {
  return (item as FooterLink).text !== undefined;
}

const FooterCollumn: React.FC<{
  title: string;
  items: Array<FooterLink | CategoryLink>;
}> = ({ title, items }) => (
  <div className="space-y-4">
    <h4>{title}</h4>
    <nav>
      <ul className="space-y-2">
        {items.map((item, index) => (
          <li key={index}>
            <AnimatedLink
              url={
                isFooterLink(item) ? item.url : `/blog/${item.attributes.slug}`
              }
              text={isFooterLink(item) ? item.text : item.attributes.name}
            />
          </li>
        ))}
      </ul>
    </nav>
  </div>
);

export default function Footer({
  logoUrl,
  logoText,
  menuLinks,
  categoryLinks,
  legalLinks,
  socialLinks,
}: {
  logoUrl: string | null;
  logoText: string | null;
  menuLinks: Array<FooterLink>;
  categoryLinks: Array<CategoryLink>;
  legalLinks: Array<FooterLink>;
  socialLinks: Array<FooterLink>;
}) {

  const footerColumns = [
    {
      title: "Categories",
      items: categoryLinks.map((link) => ({
        url: `/blog/${link.attributes.slug}`,
        text: link.attributes.name,
      })) as FooterLink[], // Cast it to FooterLink[] since the data structure is expected
    },
    {
      title: "Menu",
      items: menuLinks.map((link) => ({
        id: link.id,
        url: link.url,
        text: link.text,
        newTab: link.newTab,
      })),
    },
  ];

  return (
    <footer className="py-6">
      <Container className="space-y-6 divide-y divide-gray-400 md:space-y-12 divide-opacity-50">
        <Row className="gap-y-16">
          <div className="col-span-full md:col-span-6">
            <Logo src={logoUrl}>
              {logoText && <h2 className="text-2xl font-bold">{logoText}</h2>}
            </Logo>
          </div>
          <div className="col-span-full md:col-span-6">
            <div className="flex flex-col md:flex-row gap-8 md:gap-16 text-text w-1/2">
              {footerColumns.map((section, index) => (
                <FooterCollumn
                  key={index}
                  title={section.title}
                  items={section.items}
                />
              ))}
            </div>
          </div>
        </Row>

        <div className="grid justify-center pt-6 lg:justify-between">
          <div className="flex">
            <span className="mr-2">
              ©{new Date().getFullYear()} All rights reserved
            </span>
            <ul className="flex">
              {legalLinks.map((link: FooterLink) => (
                <Link
                  href={link.url}
                  className="text-gray-400 hover:text-gray-300 mr-2"
                  key={link.id}
                >
                  {link.text}
                </Link>
              ))}
            </ul>
          </div>

          <div className="flex justify-center pt-4 space-x-4 lg:pt-0 lg:col-end-13">
            {socialLinks.map((link: FooterLink) => (
              <a
                key={link.id}
                rel="noopener noreferrer"
                href={link.url}
                title={link.text}
                target={link.newTab ? "_blank" : "_self"}
                className="flex items-center justify-center w-10 h-10 rounded-full bg-primary text-white"
              >
                <RenderSocialIcon social={link.social} />
              </a>
            ))}
          </div>
        </div>
      </Container>
    </footer>
  );
}
