import Image from "next/image";
import makeClass from "clsx";

/** A Mac window screenshot. The PNG has its own transparent margin and rounded corners. */
export function MacWindow({
  src,
  alt,
  width,
  height,
  className,
  priority,
}: {
  src: string;
  alt: string;
  width: number;
  height: number;
  className?: string;
  priority?: boolean;
}) {
  return (
    <Image
      src={src}
      alt={alt}
      width={width}
      height={height}
      priority={priority}
      sizes="(min-width: 1180px) 1100px, 100vw"
      className={makeClass("window max-w-none", className)}
    />
  );
}

export function IPhone({
  src,
  alt,
  className,
}: {
  src: string;
  alt: string;
  className?: string;
}) {
  return (
    <div className={makeClass("iphone", className)}>
      <div className="iphone-case">
        <Image src={src} alt={alt} width={1206} height={2622} sizes="300px" />
      </div>
      <i className="iphone-island" aria-hidden="true" />
    </div>
  );
}

export function Watch({
  src,
  alt,
  className,
}: {
  src: string;
  alt: string;
  className?: string;
}) {
  return (
    <div className={makeClass("watch", className)}>
      <div className="watch-case">
        <div className="watch-glass">
          <Image src={src} alt={alt} width={416} height={496} sizes="200px" />
        </div>
      </div>
      <i className="watch-crown" aria-hidden="true" />
      <i className="watch-btn" aria-hidden="true" />
    </div>
  );
}

export function TV({
  src,
  alt,
  width = 2400,
  height = 1350,
  className,
  priority,
}: {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  className?: string;
  priority?: boolean;
}) {
  return (
    <div className={makeClass("tv", className)}>
      <Image
        src={src}
        alt={alt}
        width={width}
        height={height}
        priority={priority}
        sizes="(min-width: 1180px) 1130px, 100vw"
      />
    </div>
  );
}
