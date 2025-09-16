import type { Metadata } from "next";
import "./globals.css";
import { getStrapiMedia, getStrapiURL } from "./utils/api-helpers";
import { fetchAPI } from "./utils/fetch-api";
import { i18n, normalizeLocale } from '../../../i18n-config';
import Footer from "./components/organisms/Footer";
import Navbar from "./components/organisms/Navbar";
import { getColorVariables } from "./utils/colors";
import { FALLBACK_SEO } from "@/app/[lang]/utils/constants";
import { EB_Garamond, Manrope } from "next/font/google";

export const dynamic = "force-dynamic";

async function getGlobal(lang: string): Promise<any> {
  const token = process.env.NEXT_PUBLIC_STRAPI_API_TOKEN;

  if (!token)
    throw new Error("The Strapi API Token environment variable is not set.");

  const path = `/global`;
  const options = { headers: { Authorization: `Bearer ${token}` } };

  const populate = {
    populate: [
      "metadata.shareImage",
      "favicon",
      "notificationBanner.link",
      "navbar.links",
      "navbar.navbarLogo.logoImg",
      "footer.footerLogo.logoImg",
      "footer.menuLinks",
      "footer.legalLinks",
      "footer.socialLinks",
      "footer.categories",
      "colors",
    ],
  } as any;

  const locale = normalizeLocale(lang);

  try {
    const withLocale = await fetchAPI(path, { ...populate, locale }, options);
    if (withLocale?.data) return withLocale;
  } catch {}

  try {
    const withEn = await fetchAPI(path, { ...populate, locale: 'en' }, options);
    if (withEn?.data) return withEn;
  } catch {}

  return await fetchAPI(path, populate, options);
}

export async function generateMetadata({
  params,
}: {
  params: { lang: string };
}): Promise<Metadata> {
  const lang = normalizeLocale(params.lang);
  const meta = await getGlobal(lang);

  if (!meta.data) return FALLBACK_SEO;

  const { metadata, favicon } = meta.data.attributes;
  const { url } = favicon.data.attributes;

  return {
    title: metadata.metaTitle,
    description: metadata.metaDescription,
    icons: {
      icon: [new URL(url, getStrapiURL())],
    },
  };
}

export const ebGaramond = EB_Garamond({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-eb-garamond",
  display: "swap",
});

export const manrope = Manrope({
  subsets: ['latin'],
  variable: '--font-manrope',
  weight: ['400', '500', '700'], // pas aan wat je nodig hebt
  display: 'swap',
});

export default async function RootLayout({
  children,
  params,
}: {
  readonly children: React.ReactNode;
  readonly params: { lang: string };
}) {
  const lang = normalizeLocale(params.lang);
  const global = await getGlobal(lang);
  // TODO: CREATE A CUSTOM ERROR PAGE
  if (!global.data) return null;

  const { notificationBanner, navbar, footer, colors } = global.data.attributes;

  const navbarLogoUrl = getStrapiMedia(
    navbar.navbarLogo.logoImg.data?.attributes.url
  );

  const footerLogoUrl = getStrapiMedia(
    footer.footerLogo.logoImg.data?.attributes.url
  );

  // Get color variables for inline styles
  const colorVariables = colors ? getColorVariables(colors) : {};

  const colorStyles = Object.entries(colorVariables)
    .map(([key, value]) => `${key}: ${value};`)
    .join("\n");

  return (
    <html lang={lang} className={`${ebGaramond.variable} ${manrope.variable}`}>
      <head>
        <style>{`
          :root {
            ${colorStyles}
          }
        `}</style>
      </head>
      <body>
        <Navbar
          links={navbar.links}
          logoUrl={navbarLogoUrl}
          logoText={navbar.navbarLogo.logoText}
        />

        <main className="mb-4 md:mb-12">
          <div className="flex flex-col">{children}</div>
        </main>

        <Footer
          logoUrl={footerLogoUrl}
          logoText={footer.footerLogo.logoText}
          menuLinks={footer.menuLinks}
          categoryLinks={footer.categories.data}
          legalLinks={footer.legalLinks}
          socialLinks={footer.socialLinks}
        />
      </body>
    </html>
  );
}

export async function generateStaticParams() {
  return i18n.locales.map((locale) => ({ lang: locale }));
}
