import { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://zmagacigli.com";
  return [
    { url: baseUrl, changeFrequency: "monthly", priority: 1 },
    { url: `${baseUrl}/catalog`, changeFrequency: "monthly", priority: 0.9 },
    { url: `${baseUrl}/inspiration`, changeFrequency: "monthly", priority: 0.8 },
    { url: `${baseUrl}/about`, changeFrequency: "monthly", priority: 0.8 },
    { url: `${baseUrl}/contact`, changeFrequency: "monthly", priority: 0.8 },
  ];
}
