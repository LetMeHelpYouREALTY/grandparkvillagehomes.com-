import { aeoPaths, getAeoPage } from "@/lib/aeo-pages";
import { siteConfig } from "@/lib/site-config";

export function GET() {
  const lines = [
    `# ${siteConfig.name}`,
    "",
    siteConfig.description,
    "",
    "Dr. Jan Duffy, REALTOR, license S.0197614.LLC",
    "Berkshire Hathaway HomeServices Nevada Properties",
    "9406 W Lake Mead Blvd, Suite 100, Las Vegas, NV 89134",
    "Call or text (702) 222-1964",
    "",
    `Home: ${siteConfig.url}`,
    "Grand Park Village is a newer Summerlin village west of the 215 Beltway. Single-family homes, paired homes, and townhomes are sold there.",
    "",
    "## Pages",
  ];

  for (const path of aeoPaths()) {
    const page = getAeoPage(path);
    if (!page) continue;
    lines.push(`- ${siteConfig.url}${path}`);
    lines.push(`  ${page.answer}`);
  }

  return new Response(`${lines.join("\n")}\n`, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=3600",
    },
  });
}
