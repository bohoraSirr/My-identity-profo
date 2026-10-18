import type { MetadataRoute } from "next";

import { site } from "@/content/site";
import { getBuildTime } from "@/lib/build-time";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  return [
    {
      url: site.url,
      lastModified: await getBuildTime(),
      changeFrequency: "monthly",
      priority: 1,
    },
  ];
}
