import type { Metadata } from "next";
import { Outfit, Crimson_Pro } from "next/font/google";
import "./globals.css";

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
});

const crimsonPro = Crimson_Pro({
  variable: "--font-crimson",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
});

export const metadata: Metadata = {
  title: "HealthyBrew ♡ Tea & Coffee Wellness",
  description:
    "Discover delightful wellness-focused tea and coffee recipes in a cute, Japanese-inspired interface ✿",
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${outfit.variable} ${crimsonPro.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
