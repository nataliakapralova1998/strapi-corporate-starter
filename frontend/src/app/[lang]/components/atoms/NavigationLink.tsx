"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

export function stripLocale(path: string) {
  return path.replace(/^\/(en|nl)(?=\/|$)/, "");
}

export interface NavigationLinkProps {
  url: string;
  text: string;
  className?: string;
}

export default function NavigationLink({
  url,
  text,
}: NavigationLinkProps) {
  const pathname = usePathname();
  const currentPath = stripLocale(pathname || "");
  const normalizedUrl = url.replace(/\/$/, "");
  const isActive = currentPath === normalizedUrl;

  return (
    <Link
      href={url}
      className={`relative inline-block w-fit text-text text-sm font-light pb-1 ${
        isActive ? "border-b border-text" : "border-none"
      }`}
    >
      {text}
    </Link>
  );
}
