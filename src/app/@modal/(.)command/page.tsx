import { CommandPallette } from "../../components/CommandPallette/CommandPallette";

export default async function CommandModal({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  return <CommandPallette open query={searchParams.q as string} />;
}
