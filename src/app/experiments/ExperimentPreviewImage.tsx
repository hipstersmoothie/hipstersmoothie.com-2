"use client";

import { useState } from "react";
import NextImage, { ImageProps, StaticImageData } from "next/image";

const isDev = process.env.NODE_ENV === "development";

const devLoader = ({ src }: { src: string | StaticImageData }) => {
  // In dev mode hit the route directly
  return `/experiments/preview?id=${typeof src === "object" ? src.src : src}`;
};

const prodLoader = ({
  src,
  lqip,
}: {
  src: string | StaticImageData;
  lqip?: boolean;
}) => {
  const _src = typeof src === "object" ? src.src : src;
  return `/optimized/${_src}${lqip ? "-lqip" : ""}.png`;
};

function ProdImageRenderer(props: ImageProps) {
  const [imageError, setImageError] = useState(false);
  const [blurComplete, setBlurComplete] = useState(false);
  const imageUrl = prodLoader({ src: props.src as string, lqip: true });

  const blurStyle = blurComplete
    ? undefined
    : {
        backgroundSize: "cover",
        backgroundPosition: "50% 50%",
        backgroundRepeat: "no-repeat",
        backgroundImage: `url("${imageUrl}")`,
      };

  return (
    <NextImage
      {...props}
      loader={imageError ? devLoader : prodLoader}
      style={{ ...props.style, ...blurStyle }}
      onError={() => {
        setImageError(true);
        setBlurComplete(true);
      }}
    />
  );
}

export function ExperimentPreviewImage(props: ImageProps) {
  if (isDev) {
    return <NextImage {...props} loader={devLoader} />;
  }

  return <ProdImageRenderer {...props} />;
}
