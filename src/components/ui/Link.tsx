import { Backlink, BasicLink } from "./typography";

async function PostPreview({ slug }: { slug: string }) {
  const { default: PostComponent } = await import(
    `../../app/blog/posts/${slug}/page.mdx`
  );

  return (
    <div className="in-preview">
      <PostComponent />
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
