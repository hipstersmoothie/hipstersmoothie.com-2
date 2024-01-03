import { useSearchParams } from "next/navigation";

export function useIsInIframe() {
  const searchParams = useSearchParams();
  return searchParams.get("in-iframe") === "true";
}
