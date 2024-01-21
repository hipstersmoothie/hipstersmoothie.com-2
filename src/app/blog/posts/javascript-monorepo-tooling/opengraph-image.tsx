import { getPostOgImage } from "../../../../components/open-graph/PostOgImage";

export const contentType = "image/png";
export const size = {
  width: 1200,
  height: 630,
};

export default async function Image() {
  return await getPostOgImage({
    size,
    slug: "javascript-monorepo-tooling",
  });
}
