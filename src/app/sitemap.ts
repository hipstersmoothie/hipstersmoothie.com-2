import { MetadataRoute } from "next";
import { getBlogPostList } from "./blog/utils";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const blogPosts = await getBlogPostList();

  return [
    {
      url: "https://hipstersmoothie.com",
      lastModified: new Date(),
      changeFrequency: "yearly",
      priority: 1,
    },
    {
      url: "https://hipstersmoothie.com/projects",
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: "https://hipstersmoothie.com/blog",
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.5,
    },
    ...blogPosts.map((p) => ({
      url: `https://hipstersmoothie.com/blog/${p.slug}`,
      lastModified: new Date(p.creationDate),
      changeFrequency: "monthly" as const,
      priority: 0.5,
    })),
  ];
}
