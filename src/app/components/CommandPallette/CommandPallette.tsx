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
import { projects } from "../../projects/projects";
import { search } from "./search";

const separator = <div className="-mx-1 h-px bg-hair" />;

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

  const hasResults = Array.isArray(results)
    ? results.flat().some((r) => r !== null)
    : Boolean(results);

  if (!hasResults) {
    return null;
  }

  return (
    <>
      {separator}
      <div className="px-2.5 py-2">
        <div className="text-ink px-2">Search Results</div>
      </div>
      {results}
    </>
  );
}

const loading = (
  <div className="flex items-center justify-center gap-2 px-3 h-12">
    <Loader2 className="animate-spin h-4 w-4" />
    <div className="text-ink-2 text-sm">Searching posts…</div>
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
      <CommandGroup heading="Writing">
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
          <CommandPalletteLink href="/">Home</CommandPalletteLink>
          <CommandPalletteLink href="/projects">Projects</CommandPalletteLink>
          <CommandPalletteLink href="/blog">Writing</CommandPalletteLink>
          <CommandPalletteLink href="/resume">Résumé</CommandPalletteLink>
        </CommandGroup>
        <CommandSeparator />
        <CommandGroup heading="Projects">
          {projects.map((project) => (
            <CommandPalletteLink
              key={project.slug}
              external={project.href.startsWith("http")}
              href={project.href}
              value={`${project.name} ${project.kind} ${project.tagline}`}
            >
              <span className="flex items-baseline gap-2 min-w-0">
                <span className="shrink-0">{project.name}</span>
                <span className="text-xs text-ink-2 truncate">{project.tagline}</span>
              </span>
            </CommandPalletteLink>
          ))}
        </CommandGroup>
        <CommandSeparator />
        <CommandGroup heading="Elsewhere">
          {resume.basics.profiles.map((profile) => (
            <CommandPalletteLink
              external
              key={profile.network}
              href={profile.url}
            >
              {profile.label}
            </CommandPalletteLink>
          ))}
          <CommandPalletteLink external href={`mailto:${resume.basics.email}`}>
            Email
          </CommandPalletteLink>
          <CommandPalletteLink external href="/rss.xml">
            RSS
          </CommandPalletteLink>
        </CommandGroup>
        <CommandSeparator />
        <Suspense fallback={<CommandGroup heading="Writing" />}>
          <BlogSection query={query} />
        </Suspense>
      </CommandList>
    </CommandDialog>
  );
}
