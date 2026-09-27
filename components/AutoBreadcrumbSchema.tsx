import { headers } from "next/headers";
import { BreadcrumbSchema } from "@/components/SchemaScript";
import { breadcrumbItemsFromPathname } from "@/lib/breadcrumb-from-path";

/**
 * Emits BreadcrumbList JSON-LD on all non-home routes (server-rendered).
 */
export default function AutoBreadcrumbSchema() {
  const host = headers().get("x-domain");
  const pathname = headers().get("x-pathname");
  const items = breadcrumbItemsFromPathname(host, pathname);

  if (!items || items.length < 2) {
    return null;
  }

  return <BreadcrumbSchema items={items} />;
}
