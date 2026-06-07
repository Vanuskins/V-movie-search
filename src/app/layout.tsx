import type { Metadata } from "next";
import { Manrope } from "next/font/google";
import "./globals.css";

const manrope = Manrope({
  subsets: ["cyrillic", "latin"],
  variable: "--font-main",
  display: "swap",
});

export const metadata: Metadata = {
  title: "V | Подбор фильма по 20 вопросам",
  description: "Сервис V помогает выбрать фильм под настроение через короткий квиз из 20 вопросов.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="ru">
      <body className={manrope.variable}>{children}</body>
    </html>
  );
}
