import { getAeoPage } from "@/lib/aeo-pages";
import { siteConfig } from "@/lib/site-config";

type DirectAnswerProps = {
  pathname: string;
};

function crumbs(path: string): { name: string; url: string }[] {
  const bits = path.split("/").filter(Boolean);
  const items = [{ name: "Home", url: siteConfig.url }];
  let acc = "";
  for (const bit of bits) {
    acc += `/${bit}`;
    const name = bit
      .split("-")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
    items.push({ name, url: `${siteConfig.url}${acc}` });
  }
  return items;
}

/**
 * Visible direct answer plus WebPage and breadcrumb schema.
 * Rendered on every route that has an entry in lib/aeo-pages.ts.
 * The homepage answers live in its own sections so the hero stays first.
 */
export function DirectAnswer({ pathname }: DirectAnswerProps) {
  const page = getAeoPage(pathname);
  if (!page) return null;

  const path = pathname.split("?")[0].replace(/\/$/, "") || "/";
  const url = `${siteConfig.url}${path}`;
  const webPage = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": `${url}#webpage`,
    url,
    name: page.question,
    description: page.answer,
    isPartOf: {
      "@type": "WebSite",
      name: siteConfig.name,
      url: siteConfig.url,
    },
    about: {
      "@type": "RealEstateAgent",
      name: "Dr. Jan Duffy",
      telephone: "+1-702-222-1964",
    },
    speakable: {
      "@type": "SpeakableSpecification",
      cssSelector: ["#direct-answer"],
    },
  };
  const breadcrumb = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: crumbs(path).map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };

  return (
    <section aria-label="Direct answer" className="border-b border-slate-200 bg-white">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(webPage) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }}
      />
      <div className="container mx-auto max-w-4xl px-4 py-5">
        <p id="direct-answer" className="text-base leading-7 text-slate-800">
          {page.answer}
        </p>
        <details className="mt-3">
          <summary className="cursor-pointer text-sm font-semibold text-slate-900">
            Questions about this page
          </summary>
          <dl className="mt-3 space-y-3">
            {page.faqs.map((faq) => (
              <div key={faq.question}>
                <dt className="font-semibold text-slate-900">{faq.question}</dt>
                <dd className="mt-1 text-slate-700">{faq.answer}</dd>
              </div>
            ))}
          </dl>
        </details>
      </div>
    </section>
  );
}
