"use client";

import { useState } from "react";
import NextImage, { ImageProps } from "next/image";
import { devLoader, prodLoader } from "./image-utils";

const isDev = process.env.NODE_ENV === "development";

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
