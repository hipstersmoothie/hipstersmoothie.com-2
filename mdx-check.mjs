import { compile } from "/Users/andrew/Documents/hipstersmoothie.com-2/node_modules/.pnpm/@mdx-js+mdx@3.0.0/node_modules/@mdx-js/mdx/index.js";
import remarkFrontmatter from "remark-frontmatter";
import remarkMdxFrontmatter from "remark-mdx-frontmatter";

const src = `---
title: "Test Title"
description: "Test description"
---

import { getPostMetadata } from "../postMetadata";

export const metadata = getPostMetadata(frontmatter);

<PostHeader slug="test" />

Hello
`;

const out = await compile(src, {
  remarkPlugins: [remarkFrontmatter, remarkMdxFrontmatter],
});
const code = String(out);
console.log("COMPILED_OK");
console.log("has metadata export:", /export\s+const\s+metadata/.test(code));
console.log("has frontmatter export:", /frontmatter\s*=/.test(code));
