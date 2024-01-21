import { Footer } from "../../../components/Footer";
import { NavigationHeader } from "../../../components/NavigationHeader";
import Wrapper from "../components/Wrapper";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <NavigationHeader />
      <Wrapper>{children}</Wrapper>
      <Footer />
    </>
  );
}
