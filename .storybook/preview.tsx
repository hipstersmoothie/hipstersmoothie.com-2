import React from "react";
import type { Preview } from "@storybook/react";

import { AppWrapper } from "../src/components/AppWrapper";
import "../src/app/globals.css";
import "../src/app/typography.css";

const preview: Preview = {
  parameters: {
    actions: { argTypesRegex: "^on[A-Z].*" },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
  decorators: [
    (Story) => (
      <AppWrapper>
        <Story />
      </AppWrapper>
    ),
  ],
};

export default preview;
