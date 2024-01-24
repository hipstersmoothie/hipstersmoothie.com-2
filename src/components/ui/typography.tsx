"use client";

import { ComponentProps, useRef } from "react";
import makeClass from "clsx";
import Image, { ImageProps } from "next/image";
import NextLink from "next/link";
import * as HoverCard from "@radix-ui/react-hover-card";
import { twMerge } from "tailwind-merge";
import { Copy } from "lucide-react";
import { toast } from "sonner";

import { Button } from "./button";
import { ScrollArea, ScrollBar } from "./scroll-area";
import { Tooltip } from "./tooltip";

function WidthContainer({ children }: { children: React.ReactNode }) {
  return (
    <div className="max-w-prose mx-auto px-4 text-mauve-12 dark:text-mauvedark-12 ">
      {children}
    </div>
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
  return (
    <WidthContainer>
      <figure
        {...props}
        className={makeClass("my-6 grid", className)}
        style={{ gridTemplateColumns: "8px auto" }}
      >
        <div className="rounded-sm rounded-r-none bg-crimson-9 dark:bg-crimsondark-9 " />
        <div
          className="
            rounded-sm rounded-l-none 
            bg-mauve-1 dark:bg-mauvedark-2 
            border border-l-0 border-mauve-7 dark:border-mauvedark-7
          "
        >
          <blockquote>{children}</blockquote>
        </div>
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

export const Code = (props: {
  children?: React.ReactNode;
  className?: string;
}) => {
  const codeRef = useRef<HTMLPreElement>(null);

  if ((props as any)["data-language"]) {
    return (
      <ScrollArea type="always" className="bg-code relative group">
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
    );
  }

  return (
    <code
      {...props}
      className="
        text-xs rounded p-1 py-0.5 inline-block translate-y-[-1px]
        bg-crimsona-5 dark:bg-crimsondarka-4
        text-crimsona-12 dark:text-crimsondarka-12
      "
    />
  );
};

export const Pre = (props: React.ComponentProps<"pre">) => (
  <WidthContainer>
    <pre
      {...props}
      className="
        my-6 rounded border
        overflow-hidden
        border-mauve-7 dark:border-mauvedark-7
      "
    />
  </WidthContainer>
);

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
        text-2xl font-medium
        mt-10 mb-6 pb-3 
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
      className="text-xl mt-8 mb-4 font-semibold"
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
      className="text-lg my-4 font-bold"
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
      className="my-4 font-bold"
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
  <th {...props} className="pb-4 px-3 text-left font-semibold" />
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
