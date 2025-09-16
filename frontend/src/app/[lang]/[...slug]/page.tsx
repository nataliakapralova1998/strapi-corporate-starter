import {Metadata} from "next";
import {getPageBySlug} from "@/app/[lang]/utils/get-page-by-slug";
import {FALLBACK_SEO} from "@/app/[lang]/utils/constants";
import componentResolver from "../utils/component-resolver";
import { normalizeLocale } from '../../../../i18n-config';


type Props = {
    params: {
        lang: string,
        slug: string
    }
}


export async function generateMetadata({params}: Props): Promise<Metadata> {
    const lang = normalizeLocale(params.lang);
    const page = await getPageBySlug(params.slug, lang);

    if (!page.data[0]?.attributes?.seo) return FALLBACK_SEO;
    const metadata = page.data[0].attributes.seo

    return {
        title: metadata.metaTitle,
        description: metadata.metaDescription
    }
}


export default async function PageRoute({params}: Props) {
    const lang = normalizeLocale(params.lang);
    const page = await getPageBySlug(params.slug, lang);
    if (page.data.length === 0) return null;
    const contentSections = page.data[0].attributes.contentSections;
    return contentSections.map((section: any, index: number) => componentResolver(section, index));
}
