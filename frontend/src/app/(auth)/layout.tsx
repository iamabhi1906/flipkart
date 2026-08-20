import AppBar from "@/components/appbar";
import { roboto } from "../layout";
import PrimarySearchAppBar from "@/components/appbar";
import Footer from "@/components/footer/footer";
import CategoryBar from "@/components/category";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={roboto.variable}>
      <body>
        {/* <PrimarySearchAppBar /> */}
        <CategoryBar props={{ page: 1, limit: 9 }} />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
