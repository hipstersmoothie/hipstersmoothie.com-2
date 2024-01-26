import Rss from "rss";
import {
  getBlogPostList,
  isBlogPost,
  mdxProcessor,
  renderPhrase,
} from "../blog/utils";
import { getExperimentList } from "../experiments/utils";
import { Paragraph } from "mdast";

async function feed() {
  const blogPosts = await getBlogPostList({ includeSource: true });
  const experiment = await getExperimentList();
  const posts = [...blogPosts, ...experiment]
    .sort((a, b) => {
      const aDate = new Date(a.creationDate);
      const bDate = new Date(b.creationDate);

      return bDate.getTime() - aDate.getTime();
    })
    .slice(0, 10);

  const feed = new Rss({
    title: "Andrew Lisowski's Personal Website - Blog and Experiments",
    description:
      "Andrew posts front end development articles and experiments on his personal website.",
    site_url: `${process.env.NEXT_PUBLIC_URL}`,
    feed_url: `${process.env.NEXT_PUBLIC_URL}rss.xml`,
  });

  posts.forEach((post) => {
    let description: string = "";

    if (isBlogPost(post)) {
      const paragraph = mdxProcessor
        .parse(post.source)
        .children.find((c): c is Paragraph => c.type === "paragraph");

      if (paragraph) {
        description = paragraph.children.map(renderPhrase).join("");
      }
    } else {
      description = post.description as string;
    }

    feed.item({
      title: post.title,
      description,
      url: isBlogPost(post)
        ? `${process.env.NEXT_PUBLIC_URL}/blog/posts/${post.path}`
        : `${process.env.NEXT_PUBLIC_URL}/experiments/${post.slug}`,
      date: post.creationDate,
    });
  });

  return feed.xml();
}

export async function GET() {
  const feedXml = await feed();

  if (feedXml) {
    return new Response(feedXml, {
      headers: {
        "Content-Type": "application/xml",
      },
    });
  } else {
    return new Response("Error generating RSS feed.", { status: 500 });
  }
}
