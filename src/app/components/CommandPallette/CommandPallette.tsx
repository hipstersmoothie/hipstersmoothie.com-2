import {
  CommandDialog,
  CommandInput,
  CommandList,
  CommandEmpty,
  CommandItem,
  CommandGroup,
  CommandSeparator,
} from "../../../components/ui/command";
import { Suspense } from "react";

import { Loader2 } from "lucide-react";
import { CommandPalletteLink } from "./CommandPalletteItems";
import resume from "../../resume.json";
import {
  Post,
  getBlogPostList,
  mdxProcessor,
  renderPhrase,
} from "../../blog/utils";
import { Heading, Paragraph } from "mdast";
import { Code } from "../../../components/ui/typography";

async function SearchResults({
  query: queryParam,
  blogPosts,
}: {
  query: string | undefined;
  blogPosts: Post[];
}) {
  const query = (queryParam || "").trim().toLowerCase();

  const searches = blogPosts.map((blogPost) => {
    return {
      ...blogPost,
      source: mdxProcessor
        .parse(blogPost.source)
        .children.filter(
          (item): item is Paragraph | Heading =>
            item.type === "paragraph" || item.type === "heading"
        )
        .map((child) => {
          return child.children.map(renderPhrase).join("");
        }),
    };
  });

  const sourceMatches: [(typeof searches)[0], string][] = [];

  for (const post of searches) {
    for (const source of post.source) {
      sourceMatches.push([post, source] as const);
    }
  }

  return (
    <CommandGroup heading="Search">
      {sourceMatches.map(([post, source], index) => (
        <CommandPalletteLink
          key={`${post.path}-${index}`}
          href={`/blog/posts/${post.path}`}
          value={source.toLowerCase().indexOf(query) > -1 ? source : ""}
        >
          <div className="flex flex-col gap-2">
            <div className="">{post.title}</div>
            <div className="text-mauve-11 dark:text-mauvedark-11">
              {source
                .split(new RegExp(`(${query})`, "i"))
                .map((item, itemIndex) => {
                  if (item.toLowerCase() === query) {
                    return <Code key={`${item}-${itemIndex}`}>{item}</Code>;
                  }

                  return <span key={`${item}-${itemIndex}`}>{item}</span>;
                })}
            </div>
          </div>
        </CommandPalletteLink>
      ))}
    </CommandGroup>
  );
}

const loading = (
  <div className="flex items-center justify-center gap-2 px-3 h-12">
    <Loader2 className="animate-spin h-4 w-4" />
    <div className="text-mauve-11 dark:text-mauvedark-11 text-sm font-light">
      Searching blogs posts...
    </div>
  </div>
);

async function BlogSection({
  query: queryParam,
}: {
  query: string | undefined;
}) {
  // Somehow makes the non suspended components render faster
  await new Promise((resolve) => setTimeout(resolve, 0));

  const query = (queryParam || "").trim().toLowerCase();
  const blogPosts = await getBlogPostList({
    includeSource: true,
  });

  return (
    <>
      <CommandGroup heading="Blog Posts">
        {blogPosts.map((post) => (
          <CommandPalletteLink
            key={post.path}
            href={`/blog/posts/${post.path}`}
          >
            {post.title}
          </CommandPalletteLink>
        ))}
      </CommandGroup>

      {query && (
        <Suspense key={query} fallback={loading}>
          <SearchResults query={query} blogPosts={blogPosts} />
        </Suspense>
      )}
    </>
  );
}

export async function CommandPallette({
  open,
  query,
}: {
  open: boolean;
  query?: string;
}) {
  return (
    <CommandDialog open={open}>
      <CommandInput placeholder="Type a command or search..." />
      <CommandList>
        <CommandGroup heading="Sections">
          <CommandPalletteLink href="/">Resume</CommandPalletteLink>
          <CommandPalletteLink href="/blog">Blog</CommandPalletteLink>
          <CommandPalletteLink href="/experiments">
            Experiments
          </CommandPalletteLink>
        </CommandGroup>
        <CommandSeparator />
        <CommandGroup heading="Socials">
          {resume.basics.profiles.map((profile) => (
            <CommandPalletteLink
              external
              key={profile.network}
              href={profile.url}
            >
              {profile.label}
            </CommandPalletteLink>
          ))}

          <CommandPalletteLink external href="https://devtools.fm">
            devtools.fm
          </CommandPalletteLink>
        </CommandGroup>
        <CommandSeparator />
        <Suspense fallback={<CommandGroup heading="Blog Posts" />}>
          <BlogSection query={query} />
        </Suspense>
      </CommandList>
    </CommandDialog>
  );
}
