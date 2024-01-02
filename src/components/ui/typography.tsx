"use client";

import makeClass from "clsx";
import Image, { ImageProps } from "next/image";
import Link from "next/link";

export const Paragraph = ({
  className,
  ...props
}: React.ComponentProps<"p">) => (
  <p className={makeClass(className, "my-6")} {...props} />
);

export const MdxImage = ({
  className,
  ...props
}: React.ComponentProps<"img">) => (
  <figure className="my-10 flex flex-col gap-2">
    <div className="block relative h-24 w-full max-h-64">
      {/* eslint-disable-next-line jsx-a11y/alt-text */}
      <Image
        fill={true}
        className={makeClass(className, "object-contain")}
        {...(props as ImageProps)}
      />
    </div>
    {props.alt && (
      <figcaption className="text-sm font-medium my-2 text-center italic">
        {props.alt}
      </figcaption>
    )}
  </figure>
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
    <figure
      {...props}
      className={makeClass("-m-2 my-6 grid", className)}
      style={{ gridTemplateColumns: "8px auto" }}
    >
      <div className="rounded-sm rounded-r-none bg-pink-500" />
      <div className="rounded-sm rounded-l-none bg-white border-2 border-l-0 border-gray-100 px-4">
        <blockquote>{children}</blockquote>
      </div>
    </figure>
  );
};

export const HorizontalRule: React.FC = (props) => (
  <hr {...props} className="mx-auto h-2 w-8 rounded bg-gray-200 my-10" />
);

export const OrderedList: React.FC = (props) => (
  <ol {...props} className="list-decimal ml-6 my-6" />
);

export const UnorderedList: React.FC = (props) => (
  <ul {...props} className="list-disc ml-4 my-6" />
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
          "text-gray-600 rounded block py-8 px-6 overflow-auto",
          "h-full w-full"
        )}
      />
    );
  }

  return (
    <code
      {...props}
      className="text-xs rounded p-1 bg-gray-200 text-gray-900 inline-block translate-y-[-1px]"
    />
  );
};

export const Pre = (props: React.ComponentProps<"pre">) => (
  <pre {...props} className="bg-gray-200 rounded border my-6" />
);

export const H1 = (props: React.ComponentProps<"h1">) => (
  <h1
    {...props}
    className="mt-6 md:mt-8 pb-4 md:pb-6 mb-6 md:mb-4 border-b flex justify-between text-4xl md:text-6xl"
  />
);

const onHeadingClick = (e: React.MouseEvent<HTMLHeadingElement>) => {
  // Update the location hash without scrolling
  history.replaceState(null, "", `#${e.currentTarget.id}`);
};

export const H2 = (props: React.ComponentProps<"h2">) => (
  <h2
    {...props}
    className="lvl2 text-2xl mt-10 mb-6 pb-3 border-b border-gray-300 font-medium"
    onClick={(e) => {
      props.onClick?.(e);
      onHeadingClick(e);
    }}
  />
);

export const H3 = (props: React.ComponentProps<"h3">) => (
  <h3
    {...props}
    className="lvl3 text-xl my-4 font-semibold"
    onClick={(e) => {
      props.onClick?.(e);
      onHeadingClick(e);
    }}
  />
);

export const H4 = (props: React.ComponentProps<"h4">) => (
  <h4
    {...props}
    className="lvl4 text-lg my-4 font-bold"
    onClick={(e) => {
      props.onClick?.(e);
      onHeadingClick(e);
    }}
  />
);

export const H5 = (props: React.ComponentProps<"h5">) => (
  <h5
    {...props}
    className="lvl5 my-4 font-bold"
    onClick={(e) => {
      props.onClick?.(e);
      onHeadingClick(e);
    }}
  />
);

export const H6 = (props: React.ComponentProps<"h6">) => (
  <h6
    {...props}
    className="lvl6 text-sm my-4 font-bold"
    onClick={(e) => {
      props.onClick?.(e);
      onHeadingClick(e);
    }}
  />
);

export const Table: React.FC = (props) => (
  <table {...props} className="w-full my-6" />
);

export const TH: React.FC = (props) => (
  <th {...props} className="pb-4 px-3 text-left font-semibold" />
);

export const TD: React.FC = (props) => (
  <td {...props} className="py-2 px-3 border-b border-t" />
);

export function MdxLink(props: React.ComponentPropsWithoutRef<"a">) {
  let href = props.href;
  const className = "text-blue-500 underline";

  if (href?.startsWith("/")) {
    return (
      <Link {...props} className={className} href={href}>
        {props.children}
      </Link>
    );
  }

  if (href?.startsWith("#")) {
    return <a {...props} className={className} />;
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
