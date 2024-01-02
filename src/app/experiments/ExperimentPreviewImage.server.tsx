import path from "path";
import { promises as fs, existsSync } from "fs";
import { ImageProps } from "next/image";
import { ExperimentPreviewImageClient } from "./ExperimentPreviewImage.client";

const IMAGE_LIST = "./public/optimized/list.txt";

export async function ExperimentPreviewImage(
  props: Omit<ImageProps, "src"> & { src: string }
) {
  if (process.env.NODE_ENV === "production") {
    if (!existsSync(IMAGE_LIST)) {
      await fs.mkdir(path.dirname(IMAGE_LIST), { recursive: true });
      await fs.writeFile(IMAGE_LIST, "");
    }

    await fs.appendFile(IMAGE_LIST, `${props.src}\n`);
  }

  return <ExperimentPreviewImageClient {...props} />;
}
