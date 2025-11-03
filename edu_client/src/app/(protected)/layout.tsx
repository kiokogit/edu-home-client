'use client';
import { SessionProvider } from "next-auth/react";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
      <main>
        <SessionProvider>
            {children}
        </SessionProvider>
      </main>
  );
}
