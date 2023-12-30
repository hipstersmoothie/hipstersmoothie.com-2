import "./gold-lettering.css";

import Link from "next/link";
import { ChevronLeft } from "lucide-react";

import { AppWrapper } from "./AppWrapper";
import { OutlinedBox } from "./components/OutlinedBox/OutlinedBox";
import { Text } from "./components/Text/Text";
import { Button } from "../../components/ui/button";

export default function GoldLetteringExperiment() {
  return (
    <AppWrapper>
      <main className="flex gap-4 min-h-screen portrait:flex-col items-center justify-center landscape:p-20 portrait:py-20">
        {/* <Button
          variant="secondary"
          size="icon"
          asChild={true}
          className="absolute top-4 left-4"
        >
          <Link href="/">
            <ChevronLeft />
          </Link>
        </Button> */}

        <OutlinedBox className="px-8 pt-3 relative text-center portrait:mb-10">
          <Text as="h1">AL</Text>
          <div className="cardstock absolute left-1/2 bottom-0 -translate-x-1/2 translate-y-1/2 px-3 min-w-max">
            <a href="https://twitter.com/HipsterSmoothie">
              <Text className="text-2xl">@hipstersmoothie</Text>
            </a>
          </div>
        </OutlinedBox>
        <div className="px-8 flex flex-col portrait:text-center">
          <h2 className="text-5xl portrait:text-4xl flex items-center mb-4">
            Andrew Lisowski
          </h2>
          <h2 className="text-2xl mb-4">Senior Software Engineer</h2>
          <div className="text-xl text-gray-600">
            <a href="https://descript.com">Descript</a> •{" "}
            <a href="https://devtools.fm">DevtoolsFM</a>
          </div>
        </div>
      </main>
    </AppWrapper>
  );
}
