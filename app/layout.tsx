import type { Metadata } from "next";
import { ThemeProvider } from "next-themes";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import "./globals.css";
import "katex/dist/katex.min.css";

const SITE_NAME = "Elliott M. Harper";
const BASE_URL = "https://elliottmharper.dev";

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),

  title: {
    default: SITE_NAME,
    template: `%s | ${SITE_NAME}`,
  },

  description: "Portfolio and blog by Elliott M. Harper",

  authors: [
    {
      name: "Elliott M. Harper",
      url: BASE_URL,
    },
  ],

  creator: "Elliott M. Harper",
  publisher: SITE_NAME,

  openGraph: {
    siteName: SITE_NAME,
    type: "website",
    locale: "en_US",
  },

  twitter: {
    card: "summary_large_image",
    creator: "@yourhandle",
  },

  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="min-h-full flex flex-col">
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
          <Analytics />
          <SpeedInsights />
        </ThemeProvider>
      </body>
    </html>
  );
}
