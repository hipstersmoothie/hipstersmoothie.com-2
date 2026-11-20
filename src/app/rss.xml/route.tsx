import Rss from "rss";
import { getBlogPostList, getPostDescription } from "../blog/utils";
import { getSiteUrl } from "../../lib/site-url";

async function feed() {
  const siteUrl = getSiteUrl();
  const posts = (await getBlogPostList({ includeSource: true })).slice(0, 10);

  const feed = new Rss({
    title: "Andrew Lisowski",
    description:
      "Building on the AT Protocol, working with AI agents, React internals, dev tooling, home automation and podcasting.",
    site_url: siteUrl,
    feed_url: `${siteUrl}/rss.xml`,
  });

  posts.forEach((post) => {
    feed.item({
      title: post.title,
      description: getPostDescription(post),
      url: `${siteUrl}/blog/posts/${post.slug}`,
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
