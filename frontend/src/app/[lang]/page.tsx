import LangRedirect from "./components/molecules/LangRedirect";
import componentResolver from "./utils/component-resolver";
import { getPageBySlug } from "@/app/[lang]/utils/get-page-by-slug";
import { normalizeLocale } from '../../../i18n-config';


export const dynamic = 'force-dynamic';
export default async function RootRoute({
  params,
}: {
  params: { lang: string };
}) {
  try {
    const lang = normalizeLocale(params.lang);
    const page = await getPageBySlug("home", lang);
    if (page.error && page.error.status == 401)
      throw new Error(
        "Missing or invalid credentials. Have you created an access token using the Strapi admin panel? http://localhost:1337/admin/"
      );
    if (page.data.length == 0 && lang !== "en") return <LangRedirect />;
    if (page.data.length === 0) return null;
    const contentSections = page.data[0].attributes.contentSections;
    return contentSections.map((section: any, index: number) =>
      componentResolver(section, index)
    );
  } catch (error: any) {
    console.error("Error loading page:", error);
    return <div>Something went wrong.</div>;
  }
}
