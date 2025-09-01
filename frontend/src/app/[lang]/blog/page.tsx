"use client";
import { useState, useEffect, useCallback } from "react";
import { fetchAPI } from "../utils/fetch-api";
import Loader from "../components/Loader";
import Blog from "../views/blog-list";
import Pagination from "../components/Pagination";

interface Meta {
  pagination: {
    start: number;
    limit: number;
    total: number;
  };
}

export default function Profile() {
  const [meta, setMeta] = useState<Meta | undefined>();
  const [data, setData] = useState<any>([]);
  const [isLoading, setLoading] = useState(true);

  const fetchData = useCallback(async (start: number, limit: number) => {
    setLoading(true);
    try {
      const token = process.env.NEXT_PUBLIC_STRAPI_API_TOKEN;
      const path = `/articles`;
      const urlParamsObject = {
        sort: { createdAt: "desc" },
        populate: {
          cover: { fields: ["url"] },
          category: { populate: "*" },
          authorsBio: {
            populate: "*",
          },
        },
        pagination: {
          start: start,
          limit: limit,
        },
      };
      const options = { headers: { Authorization: `Bearer ${token}` } };
      const responseData = await fetchAPI(path, urlParamsObject, options);

      setData(responseData.data);
      setMeta(responseData.meta);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }, []);

  const onPageChange = (page: number) => {
    const limit = Number(process.env.NEXT_PUBLIC_PAGE_LIMIT);
    const start = (page - 1) * limit;
    fetchData(start, limit);
  };

  useEffect(() => {
    fetchData(0, Number(process.env.NEXT_PUBLIC_PAGE_LIMIT));
  }, [fetchData]);

  if (isLoading) return <Loader />;

  const total = meta!.pagination.total;
  const limit = meta!.pagination.limit;
  const start = meta!.pagination.start;
  console.log(limit);

  return (
    <div>
      <Blog data={data}>
        {total > limit && (
          <div className="flex justify-center mt-8">
            <Pagination total={total} limit={limit} start={start} onPageChange={onPageChange} />
          </div>
        )}
      </Blog>
    </div>
  );
}
