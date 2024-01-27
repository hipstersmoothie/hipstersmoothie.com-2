import { getSearchData } from "./search";

export async function GET() {
  const data = await getSearchData();

  return new Response(JSON.stringify(data), {
    headers: {
      "Content-Type": "application/json",
    },
  });
}
