import { StaticImageData } from "next/image";

export const devLoader = ({ src }: { src: string | StaticImageData }) => {
  // In dev mode hit the route directly
  return `/experiments/preview?id=${typeof src === "object" ? src.src : src}`;
};

export const prodLoader = ({
  src,
  lqip,
}: {
  src: string | StaticImageData;
  lqip?: boolean;
}) => {
  const _src = typeof src === "object" ? src.src : src;
  return `/optimized/${_src}${lqip ? "-lqip" : ""}.png`;
};
