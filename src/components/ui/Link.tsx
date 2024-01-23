import { Backlink, BasicLink } from "./typography";

/** Don't render previews for links in previews */
function PreviewLink(props: React.ComponentPropsWithoutRef<"a">) {
  const isBackLink = props.href?.startsWith("/blog/posts/");

  if (isBackLink) {
    const [slug] = props.href?.replace("/blog/posts/", "").split("/") || [];

    if (!slug) {
      throw new Error("slug is required");
    }

    return <Backlink {...props} />;
  }

  return <BasicLink {...props} />;
}

export async function PostPreview({ slug }: { slug: string }) {
  const { default: PostComponent } = await import(
    `../../app/blog/posts/${slug}/page.mdx`
  );

  return (
    <div className="in-preview">
      <PostComponent components={{ BackLinks: () => null, a: PreviewLink }} />
    </div>
  );
}

export function Link(props: React.ComponentPropsWithoutRef<"a">) {
  const isBackLink = props.href?.startsWith("/blog/posts/");

  if (isBackLink) {
    const [slug] = props.href?.replace("/blog/posts/", "").split("/") || [];

    if (!slug) {
      throw new Error("slug is required");
    }

    return <Backlink {...props} preview={<PostPreview slug={slug} />} />;
  }

  return <BasicLink {...props} />;
}
