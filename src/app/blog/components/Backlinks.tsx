import { Link } from "../../../components/ui/Link";
import { H2, UnorderedList } from "../../../components/ui/typography";
import { Post, getBlogPostList, mdxProcessor } from "../utils";
import { visit } from "unist-util-visit";

function createPostGraph(posts: Post[]) {
  const graph: Record<string, Set<string>> = {};

  for (const post of posts) {
    const data = mdxProcessor.parse(post.source);

    visit(data, "wikiLink", function (node: { data: { permalink: string } }) {
      if (!graph[node.data.permalink]) {
        graph[node.data.permalink] = new Set();
      }
      graph[node.data.permalink].add(post.path);
    });
  }

  return graph;
}

export async function BackLinks({ slug }: { slug: string }) {
  const posts = await getBlogPostList({
    includeSource: true,
  });
  const graph = createPostGraph(posts);
  const backlinks = graph[slug];

  if (!backlinks) {
    return null;
  }

  return (
    <>
      <H2>Backlinks</H2>
      <UnorderedList>
        {Array.from(backlinks).map((path) => {
          const post = posts.find((post) => post.path === path);

          if (!post) {
            return null;
          }

          return (
            <li key={path}>
              <Link href={`/blog/posts/${path}`}>{post.title}</Link>
            </li>
          );
        })}
      </UnorderedList>
    </>
  );
}
