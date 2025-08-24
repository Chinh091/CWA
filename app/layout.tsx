import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { cookies } from "next/headers";

export const metadata: Metadata = {
  title: "Assignment 1 – Next.js App",
  description: "Accessible UI with code generator (Tabs)",
};

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const cookieStore = cookies();
  const theme = (await cookieStore).get("theme")?.value || "system";
  const lastMenuPath = (await cookieStore).get("lastMenuPath")?.value || null;

  // Replace with your actual details
  const studentName = "Cong Chinh Phan";
  const studentNumber = "21405057";

  return (
    <html lang="en-AU" data-theme={theme}>
      <body>
        <Header studentName={studentName} studentNumber={studentNumber} lastMenuPathFromCookie={lastMenuPath} />
        <main id="main-content" className="container" role="main">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
