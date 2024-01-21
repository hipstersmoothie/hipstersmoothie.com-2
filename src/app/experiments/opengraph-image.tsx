import { getExperimentList } from "./utils";
import getListOgImage from "../../components/open-graph/ListOgImage";

// Image metadata
export const contentType = "image/png";
export const alt =
  "A list of recent front end experiments done by Andrew Lisowski";
export const size = {
  width: 1200,
  height: 630,
};

// Image generation
export default async function Image() {
  return getListOgImage({
    title: "Experiments",
    items: await getExperimentList(),
    size,
  });
}
