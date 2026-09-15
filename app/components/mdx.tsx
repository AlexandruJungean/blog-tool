import Link from "next/link";
import type { AnchorHTMLAttributes, ReactNode } from "react";
import { localizeInternalHref, type Lang } from "../lib/i18n";

type MdxAnchorProps = AnchorHTMLAttributes<HTMLAnchorElement> & {
  children?: ReactNode;
};

export function createMdxComponents(lang: Lang) {
  return {
    a: ({ href, children, ...props }: MdxAnchorProps) => {
      const localized = localizeInternalHref(href, lang);
      if (localized?.startsWith("/") && !localized.startsWith("//")) {
        return (
          <Link href={localized} {...props}>
            {children}
          </Link>
        );
      }
      return (
        <a href={localized} {...props}>
          {children}
        </a>
      );
    },
  };
}
