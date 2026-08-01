import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "VIDO Social | Työmaat näkyviksi",
  description: "VIDO Social muuttaa rakennus-, LVI-, sähkö- ja saneerausyritysten työmaakuvat jatkuvaksi näkyvyydeksi ja referensseiksi.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="fi">
      <body className="bg-bg-950 font-sans text-ink-primary antialiased">{children}</body>
    </html>
  );
}
