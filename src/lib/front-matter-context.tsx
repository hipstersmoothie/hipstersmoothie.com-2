"use client";

import { createContext, useContext } from "react";

const FrontMatterContext = createContext<Record<string, any>>({});

export function FrontMatterContextProvider({
  children,
  frontmatter,
}: {
  children: React.ReactNode;
  frontmatter: Record<string, any>;
}) {
  return (
    <FrontMatterContext.Provider value={frontmatter}>
      {children}
    </FrontMatterContext.Provider>
  );
}

export function useFrontMatterContext() {
  return useContext(FrontMatterContext);
}
