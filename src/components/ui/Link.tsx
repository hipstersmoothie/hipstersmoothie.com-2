import { Backlink, BasicLink } from "./typography";

async function PostPreview({ slug }: { slug: string }) {
  const PostComponent = (await import(`../../app/blog/posts/${slug}/page.mdx`))
    .default;

  return (
    <div className="in-preview">
      <PostComponent />
    </div>
  );
}

export async function Link(props: React.ComponentPropsWithoutRef<"a">) {
  const isBackLink = props.href?.startsWith("/blog/posts/");

  if (isBackLink) {
    const slug = props.href?.replace("/blog/posts/", "").split("/")[0];

    if (!slug) {
      throw new Error("slug is required");
    }

    return <Backlink {...props} preview={<PostPreview slug={slug} />} />;
  }

  return <BasicLink {...props} />;
}
