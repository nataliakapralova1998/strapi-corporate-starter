import {fetchAPI} from "@/app/[lang]/utils/fetch-api";
import { normalizeLocale } from '../../../../i18n-config';

export async function getPageBySlug(slug: string | string[], lang: string) {
    const token = process.env.NEXT_PUBLIC_STRAPI_API_TOKEN;

    const path = `/pages`;
    const locale = normalizeLocale(lang);
    const urlParamsObject = {filters: {slug}, locale};
    const options = {headers: {Authorization: `Bearer ${token}`}};
    return await fetchAPI(path, urlParamsObject, options);
}