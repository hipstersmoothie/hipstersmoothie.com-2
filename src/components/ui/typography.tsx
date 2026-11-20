"use client";

import { ComponentProps, useRef } from "react";
import makeClass from "clsx";
import Image, { ImageProps } from "next/image";
import NextLink from "next/link";
import * as HoverCard from "@radix-ui/react-hover-card";
import { twMerge } from "tailwind-merge";
import { Copy, Info, AlertTriangle } from "lucide-react";
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
        "max-w-[740px] mx-auto px-6 text-ink"
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
    <p className={makeClass(className, "my-5 text-[19px] leading-[1.6]")} {...props} />
  </WidthContainer>
);

export const MdxImage = ({
  className,
  ...props
}: React.ComponentProps<"img">) => (
  <WidthContainer>
    <figure className="my-6 md:my-10 flex flex-col gap-2">
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
            className={makeClass(className, "max-h-[640px] object-contain rounded-xl squircle")}
            {...(props as ImageProps)}
          />
        )}
      </div>
      {props.alt && (
        <figcaption className="text-[15px] mt-3 text-center text-ink-2">
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
  let borderClass;
  let contents;

  if (className?.includes("twitter-tweet")) {
    const href = (props as any)["data-tweet-url"] as string;
    const name = (props as any)["data-name"] as string;
    const username = (props as any)["data-username"] as string;
    const content = (props as any)["data-content"] as string;
    const date = (props as any)["data-date"] as string;

    borderClass = "bg-blue-9 dark:bg-bluedark-9";
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
  } else if (className?.includes("info")) {
    return (
      <WidthContainer className="my-6">
        <div
          className="
          rounded
          border border-blue-7 dark:border-bluedarka-7
          flex flex-col
          bg-blue-3 dark:bg-bluedarka-3
          text-blue-12 dark:text-bluedarka-12
        "
        >
          <div
            className="
              flex items-center gap-1 px-3 py-2
              border-b border-blue-7 dark:border-bluedarka-7
            "
          >
            <Info className="h-4" />
            <div className="text-sm">Info</div>
          </div>
          <div
            className="
              px-4 py-4
              [&_.inline-code]:bg-blue-6 [&_.inline-code]:dark:bg-bluedark-9
              [&_.inline-code]:text-blue-12 [&_.inline-code]:dark:text-bluedark-1
            "
          >
            {children}
          </div>
        </div>
      </WidthContainer>
    );
  } else if (className?.includes("warning")) {
    return (
      <WidthContainer className="my-6">
        <div
          className="
          rounded
          border border-yellow-7 dark:border-yellowdarka-7
          flex flex-col
          bg-yellow-3 dark:bg-yellowdarka-3
          text-yellow-12 dark:text-yellowdarka-12
        "
        >
          <div
            className="
              flex items-center gap-1 px-3 py-2
              border-b border-yellow-7 dark:border-yellowdarka-7
            "
          >
            <AlertTriangle className="h-4" />
            <div className="text-sm">Warning</div>
          </div>
          <div
            className="
              px-4 py-4
              [&_.inline-code]:bg-yellow-6 [&_.inline-code]:dark:bg-yellowdark-9
              [&_.inline-code]:text-yellow-12 [&_.inline-code]:dark:text-yellowdark-1
            "
          >
            {children}
          </div>
        </div>
      </WidthContainer>
    );
  } else if (className?.includes("success")) {
    return (
      <WidthContainer className="my-6">
        <div
          className="
          rounded
          border border-green-7 dark:border-greendarka-7
          flex flex-col
          bg-green-3 dark:bg-greendarka-3
          text-green-12 dark:text-greendarka-12
        "
        >
          <div
            className="
              flex items-center gap-1 px-3 py-2
              border-b border-green-7 dark:border-greendarka-7
            "
          >
            <AlertTriangle className="h-4" />
            <div className="text-sm">Warning</div>
          </div>
          <div
            className="
              px-4 py-4
              [&_.inline-code]:bg-green-6 [&_.inline-code]:dark:bg-greendark-9
              [&_.inline-code]:text-green-12 [&_.inline-code]:dark:text-greendark-1
            "
          >
            {children}
          </div>
        </div>
      </WidthContainer>
    );
  } else {
    borderClass = "bg-ink-3";
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
        <div className={makeClass("rounded-sm rounded-r-none", borderClass)} />
        {contents}
      </figure>
    </WidthContainer>
  );
};

export const HorizontalRule: React.FC = (props) => (
  <hr
    {...props}
    className="mx-auto h-1 w-10 rounded-full border-none bg-ink-3 my-14"
  />
);

export const OrderedList: React.FC = (props) => (
  <WidthContainer>
    <ol {...props} className="list-decimal ml-6 my-6 text-[19px] leading-[1.6] [&>li]:my-1.5" />
  </WidthContainer>
);

export const UnorderedList = (props: ComponentProps<"ul">) => (
  <WidthContainer>
    <ul {...props} className="list-disc ml-5 my-6 text-[19px] leading-[1.6] [&>li]:my-1.5" />
  </WidthContainer>
);

const InlineCode = (props: React.ComponentProps<"code">) => (
  <code
    {...props}
    className="
        inline-code
        text-[0.85em] rounded-md squircle px-1.5 py-0.5 inline-block translate-y-[-1px]
        bg-ground-alt text-ink
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
          [&_+_.code-block_>_pre]:rounded-t-none [&_+_.code-block_>_pre]:[corner-shape:round]
          [&_+_.code-block_>_pre]:border-t-0
          [&_+_.code-block_>_pre]:mt-0
        "
      >
        <figcaption
          {...props}
          className="
            bg-ground-alt px-6 py-2.5 rounded-t-xl squircle
            border border-hair
          "
        >
          <div className="font-mono text-[13px] text-ink-2">
            {children}
          </div>
        </figcaption>
      </WidthContainer>
    );
  }

  return (
    <figcaption
      {...props}
      className="text-[15px] text-center text-ink-2"
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
          "rounded-xl squircle text-[15px]",
          isShell
            ? "shadow-device bg-[#1c1c1e] text-[#f5f5f7] border border-white/10"
            : "border border-hair bg-code"
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
        headline mt-6 md:mt-8
        pb-4 md:pb-6
        mb-6 md:mb-10
        border-b border-hair
        flex justify-between
        text-[clamp(36px,5vw,60px)]
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
        headline text-[clamp(26px,3.2vw,36px)]
        [&_.inline-code]:text-[0.8em]
        mt-14 md:mt-16 mb-6
        in-preview:text-xl in-preview:mt-6
        [&_.header-link]:no-underline [&_.header-link]:text-inherit [&_.header-link]:visited:text-inherit
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
      className="
        text-[clamp(21px,2.4vw,26px)] font-semibold tracking-[-0.02em] leading-tight
        [&_.inline-code]:text-[0.8em]
        mt-10 md:mt-12 mb-4
        [&_.header-link]:no-underline [&_.header-link]:text-inherit [&_.header-link]:visited:text-inherit
      "
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
      className="text-[19px] mt-8 mb-3 font-semibold tracking-[-0.01em] [&_.header-link]:no-underline [&_.header-link]:text-inherit [&_.header-link]:visited:text-inherit"
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
      className="my-4 font-medium [&_.header-link]:no-underline [&_.header-link]:text-inherit [&_.header-link]:visited:text-inherit"
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
      className="text-sm my-4 font-bold [&_.header-link]:no-underline [&_.header-link]:text-inherit [&_.header-link]:visited:text-inherit"
      onClick={(e) => {
        props.onClick?.(e);
        onHeadingClick(e);
      }}
    />
  </WidthContainer>
);

export const Table: React.FC = (props) => (
  <WidthContainer>
    {/* Wide tables scroll sideways on phones instead of widening the page. */}
    <div className="my-8 -mx-6 px-6 overflow-x-auto">
      <table {...props} className="w-full min-w-[480px] text-[17px]" />
    </div>
  </WidthContainer>
);

export const TH: React.FC = (props) => (
  <th {...props} className="pb-4 px-3 text-left font-medium" />
);

export const TD: React.FC = (props) => (
  <td
    {...props}
    className="
      py-2.5 px-3
      border-b border-t border-hair
    "
  />
);

export function BasicLink({
  className: classNameProp,
  ...props
}: React.ComponentPropsWithoutRef<"a">) {
  const href = props.href;
  const classNames = Array.isArray(classNameProp)
    ? classNameProp.join(" ")
    : classNameProp ?? "";
  const isHeaderLink = classNames.includes("header-link");

  const className = twMerge(
    `
      underline underline-offset-4 decoration-ink-3 hover:decoration-ink
      text-ink
    `,
    classNameProp
  );

  if (href?.startsWith("#")) {
    if (isHeaderLink) {
      return <a {...props} />;
    }

    return <a {...props} className={className} />;
  }

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

  const linkClass =
    "underline underline-offset-4 [text-decoration-style:double] decoration-ink-3 hover:decoration-ink text-ink";

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

export const Strong = (props: React.ComponentProps<"strong">) => (
  <strong {...props} className="font-semibold" />
);
