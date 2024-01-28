"use client";

import { ComponentProps, useRef } from "react";
import makeClass from "clsx";
import Image, { ImageProps } from "next/image";
import NextLink from "next/link";
import * as HoverCard from "@radix-ui/react-hover-card";
import { twMerge } from "tailwind-merge";
import { Copy } from "lucide-react";
import { toast } from "sonner";
import { Slot } from "@radix-ui/react-slot";

import { Avatar, AvatarImage } from "./avatar";
import { Button } from "./button";
import { ScrollArea, ScrollBar } from "./scroll-area";
import { Tooltip } from "./tooltip";
import { RelativeTime } from "./RelativeTime";

function WidthContainer({
  children,
  className,
  asChild = false,
}: {
  children: React.ReactNode;
  className?: string;
  asChild?: boolean;
}) {
  const Component = asChild ? Slot : "div";

  return (
    <Component
      className={makeClass(
        className,
        "max-w-prose mx-auto px-4 text-mauve-12 dark:text-mauvedark-12"
      )}
    >
      {children}
    </Component>
  );
}

export const Paragraph = ({
  className,
  ...props
}: React.ComponentProps<"p">) => (
  <WidthContainer>
    <p className={makeClass(className, "my-4")} {...props} />
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
        <figcaption className="text-sm font-medium my-2 text-center italic text-mauve-11 dark:text-mauvedark-11">
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
  const isTweet = className?.includes("twitter-tweet");
  let contents;

  if (isTweet) {
    const href = (props as any)["data-tweet-url"] as string;
    const name = (props as any)["data-name"] as string;
    const username = (props as any)["data-username"] as string;
    const content = (props as any)["data-content"] as string;
    const date = (props as any)["data-date"] as string;

    contents = (
      <div
        className="
          rounded-sm rounded-l-none 
          border border-mauve-7 dark:border-mauvedark-7
          flex flex-col gap-4 p-4
        "
      >
        <a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-4"
        >
          <Avatar>
            <AvatarImage src={`https://unavatar.io/twitter/${username}`} />
          </Avatar>
          <div>
            <div className="">{name}</div>
            <div className="text-sm text-mauve-11 dark:text-mauvedark-11">
              {username}
            </div>
          </div>
          <div className="flex-1" />
          <div className="text-sm text-mauve-11 dark:text-mauvedark-11 self-start">
            <RelativeTime date={new Date(date)} />
          </div>
        </a>

        <div className="flex flex-col gap-2 py-1.5">
          <div
            className="
              text-xl
              [&_a]:text-blue-11 [&_a]:visited:text-violet-11 
              [&_a]:dark:text-bluedark-11 [&_a]:dark:visited:text-violetdark-11
            "
            dangerouslySetInnerHTML={{
              __html: content,
            }}
          />
        </div>
      </div>
    );
  } else {
    contents = (
      <div
        className="
        rounded-sm rounded-l-none 
        bg-mauve-1 dark:bg-mauvedark-2 
        border border-l-0 border-mauve-7 dark:border-mauvedark-7
      "
      >
        <blockquote>{children}</blockquote>
      </div>
    );
  }

  return (
    <WidthContainer>
      <figure
        {...props}
        className={makeClass("my-6 grid", className)}
        style={{ gridTemplateColumns: "8px auto" }}
      >
        <div
          className={makeClass(
            "rounded-sm rounded-r-none",
            isTweet
              ? "bg-blue-9 dark:bg-bluedark-9"
              : "bg-crimson-9 dark:bg-crimsondark-9 "
          )}
        />

        {contents}
      </figure>
    </WidthContainer>
  );
};

export const HorizontalRule: React.FC = (props) => (
  <hr
    {...props}
    className="mx-auto h-2 w-8 rounded border-none bg-mauve-7 dark:bg-mauvedark-7 my-10"
  />
);

export const OrderedList: React.FC = (props) => (
  <WidthContainer>
    <ol {...props} className="list-decimal ml-6 my-6" />
  </WidthContainer>
);

export const UnorderedList = (props: ComponentProps<"ul">) => (
  <WidthContainer>
    <ul {...props} className="list-disc ml-4 my-6" />
  </WidthContainer>
);

const InlineCode = (props: React.ComponentProps<"code">) => (
  <code
    {...props}
    className="
        text-xs rounded p-1 py-0.5 inline-block translate-y-[-1px]
        bg-crimsona-5 dark:bg-crimsondarka-4
        text-crimsona-12 dark:text-crimsondarka-12
      "
  />
);

export const FigCaption = ({
  children,
  ...props
}: React.ComponentProps<"figcaption">) => {
  const isCodeBlockTitle = "data-rehype-pretty-code-title" in props;

  if (isCodeBlockTitle) {
    return (
      <WidthContainer
        className="
          mt-7
          [&_+_.code-block_>_pre]:rounded-t-none
          [&_+_.code-block_>_pre]:border-t-0
          [&_+_.code-block_>_pre]:mt-0
        "
      >
        <figcaption
          {...props}
          className="
            bg-mauve-3 dark:bg-mauvedark-3 px-6 py-2 rounded-t-md
            border border-mauve-7 dark:border-mauvedark-7
          "
        >
          <div className="mono text-sm text-mauve-11 dark:text-mauvedark-12">
            {children}
          </div>
        </figcaption>
      </WidthContainer>
    );
  }

  return (
    <figcaption
      {...props}
      className="text-sm text-center italic text-mauve-11 dark:text-mauvedark-11"
    >
      {children}
    </figcaption>
  );
};

export const Code = ({
  title,
  ...props
}: {
  children?: React.ReactNode;
  className?: string;
  title?: string;
}) => {
  const codeRef = useRef<HTMLPreElement>(null);
  const language = (props as any)["data-language"] as string | undefined;

  if (language) {
    let content;

    if (language === "sh") {
      content = (
        <div
          className="
            px-6 py-4
            w-full h-full
          "
        >
          <span className="text-greendark-11">{"\u276f"}</span> {props.children}
        </div>
      );
    } else {
      content = (
        <code
          {...props}
          ref={codeRef}
          className={makeClass(
            props.className,
            "font-mono",
            "rounded block",
            "h-full w-full",
            "py-5 px-6"
          )}
        >
          {props.children}
        </code>
      );
    }
    return (
      <>
        <ScrollArea type="always" className="relative group">
          {content}
          <ScrollBar orientation="horizontal" />
          <Tooltip title="Copy" asChild={true}>
            <Button
              variant="ghost"
              size="icon"
              className="
              h-8 w-8 p-2 
              absolute top-2 right-2
              opacity-0 group-hover:opacity-100 transition-opacity duration-75
            "
              onClick={() => {
                navigator.clipboard.writeText(codeRef.current?.innerText ?? "");
                toast.success("Copied to clipboard");
              }}
            >
              <Copy />
            </Button>
          </Tooltip>
        </ScrollArea>
      </>
    );
  }

  return <InlineCode {...props} />;
};

export const Pre = ({ children, ...props }: React.ComponentProps<"pre">) => {
  const language = (props as any)["data-language"] as string | undefined;
  const isShell = language === "sh";

  return (
    <WidthContainer className="code-block">
      <pre
        {...props}
        className={makeClass(
          "my-7",
          "overflow-hidden",
          isShell
            ? "shadow-xl bg-mauvedark-1 rounded-xl text-mauvedark-12 border border-mauvedark-7"
            : "border rounded border-mauve-7 dark:border-mauvedark-7 bg-code"
        )}
      >
        {isShell && (
          <div className="px-6 pt-4">
            <div className="flex gap-2.5">
              <div className="h-3.5 w-3.5 bg-red-10 rounded-full" />
              <div className="h-3.5 w-3.5 bg-amber-10 rounded-full" />
              <div className="h-3.5 w-3.5 bg-greendark-10 rounded-full" />
            </div>
          </div>
        )}
        {children}
      </pre>
    </WidthContainer>
  );
};

export const H1 = (props: React.ComponentProps<"h1">) => (
  <WidthContainer>
    <h1
      {...props}
      className="
        mt-6 md:mt-8 
        pb-4 md:pb-6 
        mb-6 md:mb-10 
        border-b border-mauve-7 dark:border-mauvedark-7
        flex justify-between 
        text-4xl md:text-6xl
      "
    />
  </WidthContainer>
);

const onHeadingClick = (e: React.MouseEvent<HTMLHeadingElement>) => {
  // Update the location hash without scrolling
  history.replaceState(null, "", `#${e.currentTarget.id}`);
};

export const H2 = (props: React.ComponentProps<"h2">) => (
  <WidthContainer>
    <h2
      {...props}
      className="
        text-3xl font-semibold
        mt-12 mb-6 pb-3 
        border-b border-mauve-7 dark:border-mauvedark-7
        in-preview:text-xl in-preview:mt-6 
      "
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
      className="text-2xl mt-10 mb-4 font-medium"
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
      className="text-xl mt-6 mb-4 font-medium"
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
      className="my-4 font-medium"
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
      className="text-sm my-4 font-bold"
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
  <th {...props} className="pb-4 px-3 text-left font-medium" />
);

export const TD: React.FC = (props) => (
  <td
    {...props}
    className="
      py-2 px-3 
      border-b border-t border-mauve-6 dark:border-mauvedark-6
    "
  />
);

export function BasicLink({
  className: classNameProp,
  ...props
}: React.ComponentPropsWithoutRef<"a">) {
  let href = props.href;

  if (href?.startsWith("#")) {
    return <a {...props} />;
  }

  const className = twMerge(
    `
      underline
      text-blue-11 visited:text-violet-11 
      dark:text-bluedark-11 dark:visited:text-violetdark-11
    `,
    classNameProp
  );

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
  preview?: React.ReactNode;
}

export function Backlink({ preview, ...props }: BacklinkProps) {
  let href = props.href;

  if (!href) {
    return null;
  }

  const linkClass = "underline text-pink-11 dark:text-pinkdark-10";

  return (
    <HoverCard.Root>
      <HoverCard.Trigger asChild={true}>
        <NextLink
          {...props}
          data-backlink
          href={href}
          className={makeClass(linkClass, props.className)}
        />
      </HoverCard.Trigger>

      {preview && (
        <HoverCard.Portal>
          <HoverCard.Content collisionPadding={8} sideOffset={8} asChild={true}>
            <ScrollArea
              className="
                rounded-sm w-[400px] h-[400px] shadow-xl
                bg-mauve-1 dark:bg-mauvedark-1
                border border-mauve-7 dark:border-mauvedark-7
              "
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
      )}
    </HoverCard.Root>
  );
}
