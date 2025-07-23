"use client";

import Link from "next/link";
import { CgWebsite } from "react-icons/cg";
import { FaDiscord } from "react-icons/fa";
import { AiFillTwitterCircle, AiFillYoutube } from "react-icons/ai";
import Logo from "./atoms/Logo";
import NavigationLink from "./atoms/NavigationLink";
import Stack from "./atoms/Stack";
import FormSubmit from "./FormSubmit";
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

const FooterColumn = ({
  title,
  links,
}: {
  title: string;
  links: { id: string | number; url: string; text: string }[];
}) => (
  <div>
    <h4 className="mb-4">{title}</h4>
    <div className="flex flex-col gap-2">
      {links.map((link) => (
        <NavigationLink key={link.id} url={link.url} text={link.text} />
      ))}
    </div>
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
  menuLinks: FooterLink[];
  categoryLinks: CategoryLink[];
  legalLinks: FooterLink[];
  socialLinks: FooterLink[];
}) {
  return (
    <footer className="bg-muted py-10 lg:pt-20 text-text">
      <Container>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 pb-0 lg:pb-12">
          {/* Logo */}
          <div>
            <Logo src={logoUrl}>
              {logoText && (
                <h2 className="text-xl font-semibold">{logoText}</h2>
              )}
            </Logo>
          </div>
          {/* Menu */}
          <FooterColumn
            title="Menu"
            links={menuLinks.map((link) => ({
              id: link.id,
              url: link.url,
              text: link.text,
            }))}
          />

          {/* Blog Categories */}
          <FooterColumn
            title="Blog"
            links={categoryLinks.map((cat) => ({
              id: cat.id,
              url: `/blog/${cat.attributes.slug}`,
              text: cat.attributes.name,
            }))}
          />

          {/* Newsletter */}
          <Stack gap="gap-4">
            <h4>Newsletter</h4>
            <p className="text-xs">
             Schrijf je in voor de nieuwsbrief
            </p>
            <FormSubmit placeholder="email" />
          </Stack>
        </div>

        {/* Bottom Section */}
        <div className="flex flex-col md:flex-row justify-between items-center pt-6 border-t border-gray-300 gap-4">
          <p className="text-xs text-gray-500">
            © {new Date().getFullYear()} Nanny met een missie
          </p>

          <div className="flex gap-4 flex-wrap">
            {legalLinks.map((link) => (
              <Link
                key={link.id}
                href={link.url}
                className="text-xs text-gray-500 hover:text-black"
              >
                {link.text}
              </Link>
            ))}
          </div>
        </div>

        {/* Social Links */}
        {socialLinks?.length > 0 && (
          <div className="flex justify-center pt-6 space-x-4">
            {socialLinks.map((link) => (
              <a
                key={link.id}
                href={link.url}
                title={link.text}
                target={link.newTab ? "_blank" : "_self"}
                rel="noopener noreferrer"
                className="text-xl text-text hover:text-black"
              >
                <RenderSocialIcon social={link.social} />
              </a>
            ))}
          </div>
        )}
      </Container>
    </footer>
  );
}
