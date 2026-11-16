import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";

import SiteNavbar from "@/components/site-navbar";
import Footer from "@/components/footer";

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-plus-jakarta",
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
      suppressHydrationWarning
      className={`${plusJakarta.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col bg-brand-surface">
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var t=localStorage.getItem("helphive-theme");var d=t?t==="dark":window.matchMedia("(prefers-color-scheme: dark)").matches;var r=document.documentElement;r.classList.toggle("dark",d);r.style.colorScheme=d?"dark":"light";}catch(e){}})();`,
          }}
        />
        <SiteNavbar />
        <main className="flex-1">{children}</main>
        <Footer></Footer>
      </body>
    </html>
  );
}
