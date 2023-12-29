import type { Meta } from "@storybook/react";
import { Text } from "./Text";

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
  title: "Typography",
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
    layout: "centered",
  },
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ["autodocs"],
  // More on argTypes: https://storybook.js.org/docs/api/argtypes
  argTypes: {
    backgroundColor: { control: "color" },
  },
} satisfies Meta;

export default meta;

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args

export function Heading() {
  return (
    <div>
      <Text as="h1" className="text-center">
        Heading
      </Text>
    </div>
  );
}
