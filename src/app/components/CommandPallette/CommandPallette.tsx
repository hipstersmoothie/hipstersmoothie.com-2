import {
  CommandDialog,
  CommandInput,
  CommandList,
  CommandEmpty,
  CommandGroup,
  CommandSeparator,
} from "../../../components/ui/command";
import { Suspense } from "react";

import { CommandPalletteLink } from "./CommandPalletteItems";
import resume from "../../resume.json";
import { getBlogPostList, mdxProcessor, renderPhrase } from "../../blog/utils";
import { Heading, Paragraph } from "mdast";
import { Code } from "../../../components/ui/typography";

async function SearchResults({
  query: queryParam,
}: {
  query: string | undefined;
}) {
  const query = (queryParam || "").trim().toLowerCase();

  if (!query) {
    return null;
  }

  const blogPosts = await getBlogPostList({
    includeSource: true,
  });
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
        <>
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
                          return (
                            <Code key={`${item}-${itemIndex}`}>{item}</Code>
                          );
                        }

                        return <span key={`${item}-${itemIndex}`}>{item}</span>;
                      })}
                  </div>
                </div>
              </CommandPalletteLink>
            ))}
          </CommandGroup>
        </>
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
        <CommandEmpty>No results found.</CommandEmpty>
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
        </CommandGroup>
        <CommandSeparator />
        <Suspense fallback={<div>Loading...</div>}>
          <SearchResults query={query} />
        </Suspense>
      </CommandList>
    </CommandDialog>
  );
}
