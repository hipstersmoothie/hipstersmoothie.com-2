import { OutlinedBox } from "../components/OutlinedBox/OutlinedBox";
import { Text } from "../components/Text/Text";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <OutlinedBox className="px-8 pt-3 relative text-center">
        <Text as="h1">AL</Text>
        <div className="cardstock absolute left-1/2 bottom-0 -translate-x-1/2 translate-y-1/2 px-3 min-w-max">
          <Text className="text-2xl">Andrew Lisowski</Text>
        </div>
      </OutlinedBox>
    </main>
  );
}
