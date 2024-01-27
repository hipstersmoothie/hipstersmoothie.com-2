import Fuse, { IFuseOptions } from "fuse.js";
import { Heading, Link, Paragraph, Strong } from "mdast";
import emojiRegex from "emoji-regex";

import { getBlogPostList, mdxProcessor, renderPhrase } from "../../blog/utils";
import { getExperimentList } from "../../experiments/utils";

const regex = emojiRegex();

const options: IFuseOptions<any> = {
  includeMatches: true,
  useExtendedSearch: true,
  keys: ["title", "description", "source"],
};

async function initializeIndex() {
  // For speed on prod use the pre-built index
  if (process.env.NODE_ENV === "production") {
    const { default: prodIndex } = await import(
      "./production-search-index.json"
    );
    const { default: data } = await import("./production-search-data.json");

    return new Fuse(data, options);
  }

  const blogPosts = (await getBlogPostList({ includeSource: true })).map(
    (item) => {
      return {
        ...item,
        source: mdxProcessor
          .parse(item.source)
          .children.filter(
            (item): item is Paragraph | Heading | Link | Strong =>
              item.type === "paragraph" ||
              item.type === "heading" ||
              item.type === "link" ||
              item.type === "strong"
          )
          .map((child) => {
            return child.children.map(renderPhrase).join("");
          })
          .flat()
          .join("\n")
          .replaceAll(regex, ""),
      };
    }
  );
  const experiments = await getExperimentList();

  return new Fuse([...blogPosts, ...experiments], options);
}

export async function search(query: string) {
  const fuse = await initializeIndex();
  const results = fuse.search(`'${query}`);

  return results;
}
