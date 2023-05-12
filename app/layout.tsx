import { Inter } from "next/font/google";
import { Providers } from "./providers";
import GoogleAnalytics from "./components/GoogleAnalytics";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Draw It | powered by Leap",
  description: "Sketch something and our AI will generate an image.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Providers>{children}</Providers>
      </body>
      <GoogleAnalytics />
    </html>
  );
}
