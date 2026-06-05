import { Footer } from "../../../components/Footer";
import { NavigationHeader } from "../../../components/NavigationHeader";
import Wrapper from "../components/Wrapper";
import { Subscribe } from "../components/Subscribe";
import { Comments } from "../components/Comments";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <NavigationHeader />
      <Wrapper>
        {children}
        <Subscribe />
        <Comments />
      </Wrapper>
      <Footer />
    </>
  );
}
