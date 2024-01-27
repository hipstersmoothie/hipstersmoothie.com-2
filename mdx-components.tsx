import type { MDXComponents } from "mdx/types";
import {
  Blockquote,
  Code,
  H2,
  H3,
  H4,
  H5,
  H6,
  HorizontalRule,
  MdxImage,
  OrderedList,
  Paragraph,
  Pre,
  TD,
  TH,
  Table,
  UnorderedList,
  H1,
  FigCaption,
} from "./src/components/ui/typography";
import { PostHeader } from "./src/app/blog/components/PostHeader";
import { Link } from "./src/components/ui/Link";
import { BackLinks } from "./src/app/blog/components/Backlinks";

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    ...components,
    BackLinks,
    PostHeader,
    p: Paragraph,
    img: MdxImage,
    blockquote: Blockquote,
    hr: HorizontalRule,
    ol: OrderedList,
    ul: UnorderedList,
    code: Code,
    pre: Pre,
    a: Link,
    h1: H1,
    h2: H2,
    h3: H3,
    h4: H4,
    h5: H5,
    h6: H6,
    table: Table,
    td: TD,
    th: TH,
    figcaption: FigCaption,
  };
}
