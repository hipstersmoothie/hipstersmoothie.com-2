import { NavigationHeader } from "../../../components/NavigationHeader";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <NavigationHeader />
      <main className="max-w-prose mx-auto py-12 md:py-16">{children}</main>
    </>
  );
}
