"use client";

import makeClass from "clsx";
import Image, { ImageProps } from "next/image";
import NextLink from "next/link";
import * as HoverCard from "@radix-ui/react-hover-card";

import { useFrontMatterContext } from "../../lib/front-matter-context";
import { ScrollArea } from "./scroll-area";
import { PageHeader } from "./PageHeader";

function WidthContainer({ children }: { children: React.ReactNode }) {
  return (
    <div className="max-w-prose mx-auto px-4 dark:text-gray-200">
      {children}
    </div>
  );
}

export const Paragraph = ({
  className,
  ...props
}: React.ComponentProps<"p">) => (
  <WidthContainer>
    <p className={makeClass(className, "my-6")} {...props} />
  </WidthContainer>
);

export const MdxImage = ({
  className,
  ...props
}: React.ComponentProps<"img">) => (
  <WidthContainer>
    <figure className="my-10 flex flex-col gap-2">
      <div className="w-full flex-1 min-h-0 flex justify-center">
        {props.src && props.src.startsWith("http") ? (
          // eslint-disable-next-line @next/next/no-img-element, jsx-a11y/alt-text
          <img
            className={makeClass(className, "max-h-[500px] h-full w-full")}
            {...props}
          />
        ) : (
          // eslint-disable-next-line jsx-a11y/alt-text
          <Image
            className={makeClass(className, "max-h-[500px] object-contain")}
            {...(props as ImageProps)}
          />
        )}
      </div>
      {props.alt && (
        <figcaption className="text-sm font-medium my-2 text-center italic dark:text-gray-400">
          {props.alt}
        </figcaption>
      )}
    </figure>
  </WidthContainer>
);

interface BlockquoteProps extends React.ComponentProps<"figure"> {
  author?: React.ReactNode;
}

export const Blockquote: React.FC<BlockquoteProps> = ({
  author,
  className,
  children,
  ...props
}) => {
  return (
    <WidthContainer>
      <figure
        {...props}
        className={makeClass("-m-2 my-6 grid", className)}
        style={{ gridTemplateColumns: "8px auto" }}
      >
        <div className="rounded-sm rounded-r-none bg-pink-500 dark:bg-gray-500" />
        <div className="rounded-sm rounded-l-none bg-white dark:bg-gray-900 border-2 border-l-0 border-gray-100 dark:border-gray-800 px-4">
          <blockquote>{children}</blockquote>
        </div>
      </figure>
    </WidthContainer>
  );
};

export const HorizontalRule: React.FC = (props) => (
  <hr
    {...props}
    className="mx-auto h-2 w-8 rounded border-none bg-gray-200 dark:bg-gray-600 my-10"
  />
);

export const OrderedList: React.FC = (props) => (
  <WidthContainer>
    <ol {...props} className="list-decimal ml-6 my-6" />
  </WidthContainer>
);

export const UnorderedList: React.FC = (props) => (
  <WidthContainer>
    <ul {...props} className="list-disc ml-4 my-6" />
  </WidthContainer>
);

export const Code = (props: {
  children?: React.ReactNode;
  className?: string;
}) => {
  if ((props as any)["data-language"]) {
    return (
      <code
        {...props}
        className={makeClass(
          props.className,
          "font-mono",
          "rounded block py-8 px-6 overflow-auto",
          "h-full w-full"
        )}
      />
    );
  }

  return (
    <code
      {...props}
      className="text-xs rounded p-1 bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-gray-300 inline-block translate-y-[-1px]"
    />
  );
};

export const Pre = (props: React.ComponentProps<"pre">) => (
  <WidthContainer>
    <pre {...props} className="rounded border dark:border-gray-700 my-6" />
  </WidthContainer>
);

export const H1 = (props: React.ComponentProps<"h1">) => (
  <WidthContainer>
    <h1
      {...props}
      className="mt-6 md:mt-8 pb-4 md:pb-6 mb-6 md:mb-4 border-b dark:border-gray-400 flex justify-between text-4xl md:text-6xl"
    />
  </WidthContainer>
);

export const BlogPostTitle = (props: React.ComponentProps<"h1">) => {
  const frontMatter = useFrontMatterContext();

  return (
    <>
      <div className="mb-8 md:mb-12">
        <PageHeader {...props} />
      </div>
      {/* <div className="mb-10 md:mb-12 sm:flex items-baseline justify-between">
        <div className="space-x-4 md:space-y-0 text-sm flex flex-row mb-4 md:mb-0">
          <div className="text-gray-500">
            <span className="italic">Created: </span>
            <Time
              date={frontMatter.creationDate || new Date().toLocaleString()}
              className="text-gray-900 font-medium"
            />
          </div>
          <div className="text-gray-500">
            <span className="italic">Updated: </span>
            <Time
              date={currentLeaf.lastUpdatedDate || new Date().toLocaleString()}
              className="text-gray-900 font-medium"
            />
          </div>
        </div>
      </div> */}
    </>
  );
};

const onHeadingClick = (e: React.MouseEvent<HTMLHeadingElement>) => {
  // Update the location hash without scrolling
  history.replaceState(null, "", `#${e.currentTarget.id}`);
};

export const H2 = (props: React.ComponentProps<"h2">) => (
  <WidthContainer>
    <h2
      {...props}
      className="lvl2 text-2xl mt-10 mb-6 pb-3 border-b border-gray-300 dark:border-gray-400 font-medium in-preview:text-xl in-preview:mt-6 "
      onClick={(e) => {
        props.onClick?.(e);
        onHeadingClick(e);
      }}
    />
  </WidthContainer>
);

export const H3 = (props: React.ComponentProps<"h3">) => (
  <WidthContainer>
    <h3
      {...props}
      className="lvl3 text-xl my-4 font-semibold"
      onClick={(e) => {
        props.onClick?.(e);
        onHeadingClick(e);
      }}
    />
  </WidthContainer>
);

export const H4 = (props: React.ComponentProps<"h4">) => (
  <WidthContainer>
    <h4
      {...props}
      className="lvl4 text-lg my-4 font-bold"
      onClick={(e) => {
        props.onClick?.(e);
        onHeadingClick(e);
      }}
    />
  </WidthContainer>
);

export const H5 = (props: React.ComponentProps<"h5">) => (
  <WidthContainer>
    <h5
      {...props}
      className="lvl5 my-4 font-bold"
      onClick={(e) => {
        props.onClick?.(e);
        onHeadingClick(e);
      }}
    />
  </WidthContainer>
);

export const H6 = (props: React.ComponentProps<"h6">) => (
  <WidthContainer>
    <h6
      {...props}
      className="lvl6 text-sm my-4 font-bold"
      onClick={(e) => {
        props.onClick?.(e);
        onHeadingClick(e);
      }}
    />
  </WidthContainer>
);

export const Table: React.FC = (props) => (
  <WidthContainer>
    <table {...props} className="w-full my-6" />
  </WidthContainer>
);

export const TH: React.FC = (props) => (
  <th {...props} className="pb-4 px-3 text-left font-semibold" />
);

export const TD: React.FC = (props) => (
  <td {...props} className="py-2 px-3 border-b border-t dark:border-gray-600" />
);

export function BasicLink(props: React.ComponentPropsWithoutRef<"a">) {
  let href = props.href;

  if (href?.startsWith("#")) {
    return <a {...props} />;
  }

  const className = "text-blue-500 underline";

  if (href?.startsWith("/")) {
    return (
      <NextLink {...props} className={className} href={href}>
        {props.children}
      </NextLink>
    );
  }

  return (
    <a
      target="_blank"
      rel="noopener noreferrer"
      {...props}
      className={className}
    />
  );
}

interface BacklinkProps extends React.ComponentPropsWithoutRef<"a"> {
  preview: React.ReactNode;
}

export function Backlink({ preview, ...props }: BacklinkProps) {
  let href = props.href;

  if (!href) {
    return null;
  }

  return (
    <>
      <NextLink
        {...props}
        data-backlink
        href={href}
        className={makeClass(
          "underline text-pink-500 hidden in-preview:block",
          props.className
        )}
      />
      <HoverCard.Root>
        <HoverCard.Trigger asChild={true}>
          <NextLink
            {...props}
            data-backlink
            href={href}
            className={makeClass(
              "underline text-pink-500 in-preview:hidden",
              props.className
            )}
          />
        </HoverCard.Trigger>

        <HoverCard.Portal>
          <HoverCard.Content collisionPadding={8} sideOffset={8} asChild={true}>
            <ScrollArea
              className="bg-gray-50 dark:bg-gray-950 border border-gray-300 dark:border-gray-600 rounded-sm w-[400px] h-[400px] shadow-xl"
              style={{
                maxWidth:
                  "min(var(--radix-hover-card-content-available-width), 400px)",
                maxHeight:
                  "min(var(--radix-hover-card-content-available-height), 400px)",
              }}
            >
              {preview}
            </ScrollArea>
          </HoverCard.Content>
        </HoverCard.Portal>
      </HoverCard.Root>
    </>
  );
}
