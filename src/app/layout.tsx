import "./globals.css";
import "@fortawesome/fontawesome-svg-core/styles.css";

import { config } from "@fortawesome/fontawesome-svg-core";
import { Alegreya_Sans } from "next/font/google";
import Providers from "@/components/providers";

import { cn } from "@/core/lib/utils";

config.autoAddCss = false;

const fontSans = Alegreya_Sans({
  weight: ["400"],
  subsets: ["latin"],
  variable: "--font-sans",
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="icon" href="/logos/byte.png" />
      </head>
      <body
        className={cn(
          "min-h-screen bg-darkBlack font-sans antialiased",
          fontSans.variable,
        )}
      >
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
