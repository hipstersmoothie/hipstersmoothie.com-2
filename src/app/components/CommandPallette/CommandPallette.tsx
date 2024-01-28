import {
  CommandDialog,
  CommandInput,
  CommandList,
  CommandGroup,
  CommandSeparator,
} from "../../../components/ui/command";
import { Suspense } from "react";

import { Loader2 } from "lucide-react";
import { CommandPalletteLink } from "./CommandPalletteItems";
import resume from "../../resume.json";
import { getBlogPostList } from "../../blog/utils";
import { search } from "./search";

const separator = <div className="-mx-1 h-px bg-mauve-7 dark:bg-mauvedark-7" />;

function base64encode(str: string) {
  let encode = encodeURIComponent(str).replace(/%([a-f0-9]{2})/gi, (m, $1) =>
    String.fromCharCode(parseInt($1, 16))
  );
  return btoa(encode);
}

async function SearchResults({
  query: queryParam,
}: {
  query: string | undefined;
}) {
  await new Promise((resolve) => setTimeout(resolve, 0));
  const query = (queryParam || "").trim().toLowerCase();
  let results;

  if (query.startsWith("#")) {
    const posts = await getBlogPostList();
    results = posts.map((post) => {
      if (!post.frontMatter.tags) {
        return null;
      }

      const tags = post.frontMatter.tags.map((tag) => tag.toLowerCase());

      if (!tags.includes(query.slice(1))) {
        return null;
      }

      return (
        <CommandPalletteLink
          key={post.slug}
          href={`/blog/posts/${post.slug}`}
          value={query + post.slug}
        >
          {post.title}
        </CommandPalletteLink>
      );
    });
    results = results.filter((result) => result !== null);

    if (results.length === 0) {
      results = null;
    } else {
      results = (
        <CommandGroup heading="Blog Posts">
          {results.map((result) => result)}
        </CommandGroup>
      );
    }
  } else {
    const data = await search(query);
    results = data.map((result) => {
      if (!result.matches) {
        return null;
      }

      return result.matches.map(({ value, ...match }, index) => {
        if (
          !value ||
          // We don't need to show title matches for blogs posts since those are
          // already in the blog section
          (match.key === "title" && "source" in result.item)
        ) {
          return null;
        }

        return (
          <>
            <CommandGroup
              key={result.item.slug}
              heading={result.item.title}
              value={query + base64encode(value || "").slice(0, 16)}
            >
              {match.indices.map(([start, end]) => {
                if (start === end) {
                  return null;
                }

                const startOfPreview = Math.max(0, start - 32);
                const endOfPreview = Math.min(value.length, end + 32);
                const text = value.slice(startOfPreview, endOfPreview);

                return (
                  <CommandPalletteLink
                    href={`/blog/posts/${result.item.slug}`}
                    key={`${start}-${end}`}
                    value={
                      query +
                      base64encode(value || "").slice(0, 16) +
                      start +
                      end
                    }
                  >
                    <span>
                      {startOfPreview > 0 && "..."}
                      {text
                        .split(new RegExp(`(${query})`, "i"))
                        .map((item, itemIndex) => {
                          if (item.toLowerCase() === query) {
                            return (
                              <mark key={`${item}-${itemIndex}`}>{item}</mark>
                            );
                          }

                          return (
                            <span key={`${item}-${itemIndex}`}>{item}</span>
                          );
                        })}
                      {endOfPreview < value.length && "..."}
                    </span>
                  </CommandPalletteLink>
                );
              })}
            </CommandGroup>
            {result.matches && index < result.matches.length - 1 && separator}
          </>
        );
      });
    });
  }

  return (
    <>
      {separator}
      <div className="px-2.5 py-2">
        <div className="text-mauve-12 dark:text-mauvedark-12 px-2">
          Search Results
        </div>
      </div>
      {results}
    </>
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
            key={post.slug}
            href={`/blog/posts/${post.slug}`}
          >
            {post.title}
          </CommandPalletteLink>
        ))}
      </CommandGroup>

      {query && (
        <Suspense key={query} fallback={loading}>
          <SearchResults query={query} />
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
