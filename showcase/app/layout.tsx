import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Todo App — React Native Task Manager",
  icons: { icon: "/icon-app.png" },
  description:
    "A showcase of the React Native Todo App built for the Apple Academy Mobile Computing assignment.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link 
          rel="stylesheet" 
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Rounded:opsz,wght,FILL,GRAD@24,400,0,0&display=swap" 
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
