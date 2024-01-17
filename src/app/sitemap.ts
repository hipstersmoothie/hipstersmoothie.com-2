import { MetadataRoute } from "next";
import { getBlogPostList } from "./blog/utils";
import { getExperimentList } from "./experiments/utils";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const blogPosts = await getBlogPostList();
  const experiment = await getExperimentList();

  return [
    {
      url: "https://hipstersmoothie.com",
      lastModified: new Date(),
      changeFrequency: "yearly",
      priority: 1,
    },
    {
      url: "https://hipstersmoothie.com/experiments",
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.5,
    },
    ...experiment.map((e) => ({
      url: `https://hipstersmoothie.com/experiments/${e.path}`,
      lastModified: new Date(e.creationDate),
      changeFrequency: "monthly" as const,
      priority: 0.5,
    })),
    {
      url: "https://hipstersmoothie.com/blog",
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.5,
    },
    ...blogPosts.map((p) => ({
      url: `https://hipstersmoothie.com/blog/${p.path}`,
      lastModified: new Date(p.creationDate),
      changeFrequency: "monthly" as const,
      priority: 0.5,
    })),
  ];
}
