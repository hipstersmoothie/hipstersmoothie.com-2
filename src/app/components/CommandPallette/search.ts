import Fuse, { IFuseOptions } from "fuse.js";
import emojiRegex from "emoji-regex";
import strip from "strip-markdown";

import { getBlogPostList, mdxProcessor } from "../../blog/utils";
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
          .use(strip)
          .process(item.source)
          .then((result) => String(result).replaceAll(regex, "")),
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
