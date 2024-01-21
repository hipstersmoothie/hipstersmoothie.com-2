import { getBlogPostList } from "./utils";
import getListOgImage from "../../components/open-graph/ListOgImage";

// Image metadata
export const contentType = "image/png";
export const alt = "A list of recent blog posts on Andrew's blog";
export const size = {
  width: 1200,
  height: 630,
};

// Image generation
export default async function Image() {
  return getListOgImage({
    title: "Andrew's Blog",
    items: await getBlogPostList(),
    size,
  });
}
