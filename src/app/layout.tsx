import "@/styles/globals.css";

import { Theme } from "@radix-ui/themes";
import type { Metadata } from "next";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Livestream with dTelecom",
  description: "A sample full-stack application built with dTelecom",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <Theme
          appearance="dark"
          accentColor="green"
          grayColor="mauve"
          radius="none"
        >
          {children}
        </Theme>
      </body>
    </html>
  );
}
