import Fuse, { FuseIndex, IFuseOptions } from "fuse.js";
import { Heading, Link, Paragraph, Strong } from "mdast";
import emojiRegex from "emoji-regex";

import { getBlogPostList, mdxProcessor, renderPhrase } from "../../blog/utils";
import { getExperimentList } from "../../experiments/utils";

import prodSearchIndex from "./production-search-index.json";
import prodData from "./production-search-data.json";

const regex = emojiRegex();

const fuseOptions: IFuseOptions<any> = {
  includeMatches: true,
  useExtendedSearch: true,
  keys: ["title", "description", "source"],
};

export async function getSearchData() {
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

  return [...blogPosts, ...experiments];
}

async function initializeIndex() {
  // For speed on prod use the pre-built index
  if (process.env.NODE_ENV === "production") {
    return new Fuse(prodData, fuseOptions, Fuse.parseIndex(prodSearchIndex));
  }

  const data = await getSearchData();
  return new Fuse(data, fuseOptions);
}

export async function search(query: string) {
  const fuse = await initializeIndex();
  const results = fuse.search(`'${query}`);

  return results;
}
