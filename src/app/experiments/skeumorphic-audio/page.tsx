import { Label } from "./components/Label";
import { LargeKnob } from "./components/LargeKnob";
import { Switch } from "./components/Switch";

export default async function Page() {
  return (
    <div className="h-screen w-scree flex items-center justify-center bg-[#D7E2F0]">
      <div className="flex flex-col gap-10 items-center">
        <div className="flex flex-col gap-2 items-center">
          <Label>Level Trim</Label>
          <Switch />
        </div>

        <div className="flex flex-col items-center">
          <LargeKnob min={0} max={100} />
          <Label>Volume</Label>
        </div>
      </div>
    </div>
  );
}
