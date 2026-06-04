import "server-only";

import fs from "fs";
import path from "path";

let cachedPublicationUri: string | null | undefined;

/**
 * Reads the publication AT URI from `sequoia.json` (created by `sequoia init`).
 * Returns `null` until Sequoia has been initialized so verification link tags
 * are simply omitted rather than rendering broken markup.
 */
export function getSequoiaPublicationUri(): string | null {
  if (cachedPublicationUri !== undefined) {
    return cachedPublicationUri;
  }

  let publicationUri: string | null = null;

  try {
    const configPath = path.join(process.cwd(), "sequoia.json");
    const config = JSON.parse(fs.readFileSync(configPath, "utf-8"));
    publicationUri =
      typeof config.publicationUri === "string" ? config.publicationUri : null;
  } catch {
    publicationUri = null;
  }

  cachedPublicationUri = publicationUri;
  return publicationUri;
}
