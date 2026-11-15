import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";

import SiteNavbar from "@/components/site-navbar";

const geistPlusJakartaSansSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
});



export const metadata = {
  title: "HelpHive — Together for a better tomorrow",
  description:
    "HelpHive brings people, purpose, and progress together through community events and volunteering.",
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${geistPlusJakartaSansSans.className} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <SiteNavbar />
        <main className="flex-1">{children}</main>
      </body>
    </html>
  );
}
