"use client";
import Logo from "./atoms/Logo";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Dialog } from "@headlessui/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import { useEffect, useState } from "react";
import Button from "./atoms/Button";
import NavigationLink from "./atoms/NavigationLink";

interface NavLink {
  id: number;
  url: string;
  newTab: boolean;
  text: string;
}

interface MobileNavLink extends NavLink {
  closeMenu: () => void;
}

// function NavLinkItem({ url, text }: NavLink) {
//   const path = usePathname();
//   const currentPath = stripLocale(path || "");
//   const normalizedUrl = url.replace(/\/$/, "");

//   const isActive = currentPath === normalizedUrl;
//   return (
//     <Link
//       href={url}
//       className={`relative text-text text-sm font-light pb-1 ${
//         isActive ? "border-b border-text" : "border-none"
//       }`}
//     >
//       {text}
//     </Link>
//   );
// }

function MobileNavLink({ url, text, closeMenu }: MobileNavLink) {
  const path = usePathname();
  const handleClick = () => {
    closeMenu();
  };
  return (
    <Link
      href={url}
      onClick={handleClick}
      className={`-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-text hover:bg-text/10 ${
        path === url ? "text-primary/80 border-primary/40" : ""
      }`}
    >
      {text}
    </Link>
  );
}

export default function Navbar({
  links,
  logoUrl,
}: {
  links: Array<NavLink>;
  logoUrl: string | null;
  logoText: string | null;
}) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const closeMenu = () => {
    setMobileMenuOpen(false);
  };

  return (
    <div
      className={`text-text sticky top-0 z-50 bg-background overflow-hidden transition-shadow duration-300 ${
        scrolled ? "shadow-lg" : ""
      }`}
      data-testid="navbar"
    >
      <div className="flex justify-between items-center h-16 mx-auto px-6">
        <Logo src={logoUrl} />

        <div className="items-center flex-shrink-0 hidden lg:flex">
          <ul className="items-stretch hidden space-x-6 lg:flex">
            {links.map((item: NavLink) => (
              <li key={item.id}>
                <NavigationLink {...item} />
              </li>
            ))}
          </ul>
        </div>

        <Dialog
          as="div"
          className="lg:hidden"
          open={mobileMenuOpen}
          onClose={setMobileMenuOpen}
        >
          <div className="fixed inset-0 z-40" />
          <Dialog.Panel className="fixed inset-y-0 rtl:left-0 ltr:right-0 z-50 w-full overflow-y-auto bg-background px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-inset sm:ring-white/10">
            <div className="flex items-center justify-between">
              <a href="#" className="-m-1.5 p-1.5">
                <span className="sr-only">Strapi</span>
                {logoUrl && <img className="h-8 w-auto" src={logoUrl} alt="" />}
              </a>
              <button
                type="button"
                className="-m-2.5 rounded-md p-2.5 text-text"
                onClick={() => setMobileMenuOpen(false)}
              >
                <span className="sr-only">Close menu</span>
                <XMarkIcon className="h-6 w-6" aria-hidden="true" />
              </button>
            </div>
            <div className="mt-6 flow-root">
              <div className="-my-6 divide-y divide-gray-700">
                <div className="space-y-2 py-6">
                  {links.map((item) => (
                    <MobileNavLink
                      key={item.id}
                      closeMenu={closeMenu}
                      {...item}
                    />
                  ))}
                </div>
              </div>
            </div>
          </Dialog.Panel>
        </Dialog>

        <Button
          type="secondary"
          text="plan een gesprek"
          className="hidden lg:block"
          onClick={() => console.log("jow")}
        />

        <button
          className="p-4 lg:hidden"
          onClick={() => setMobileMenuOpen(true)}
        >
          <Bars3Icon className="h-7 w-7 text-text" aria-hidden="true" />
        </button>
      </div>
    </div>
  );
}
