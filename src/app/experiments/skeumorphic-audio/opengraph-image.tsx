import { geExperimentOgImage } from "../../../components/open-graph/ExperimentOgImage";

export const contentType = "image/png";
export const size = {
  width: 1200,
  height: 630,
};

export default async function Image() {
  return await geExperimentOgImage({
    size,
    slug: "skeumorphic-audio",
  });
}
