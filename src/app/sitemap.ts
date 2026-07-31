import type { MetadataRoute } from "next";
import { siteConfig } from "@/lib/data";

const pages = ["", "/about", "/courses", "/apply", "/contact", "/team", "/teachers", "/privacy", "/terms"];

export default function sitemap(): MetadataRoute.Sitemap {
  return pages.map((page) => ({
    url: `${siteConfig.url}${page}`,
    lastModified: new Date(),
    changeFrequency: page === "" ? "weekly" : "monthly",
    priority: page === "" ? 1 : 0.8,
  }));
}
