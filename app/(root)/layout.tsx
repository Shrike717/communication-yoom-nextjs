import React, { ReactNode } from "react";
import { Metadata } from "next";
import StreamVideoProvider from "@/providers/StreamClientProvider";

export const metadata: Metadata = {
  title: "Yoom",
  description: "A meeting scheduling app for everyone.",
  // So füge ich ein Favicons hiu. Es ist ein .svg dass dann keinen weissen Hintergrund hat.
  icons: {
    icon: "/icons/logo.svg",
  },
};

// Das ist das Unter-Layout für unserer Pages in der (root) Gruppe
const RootLayout: React.FC<{ children: ReactNode }> = ({ children }) => {
  return (
    <main>
      {/* Hier wrappen, wir unsere App in den VideoStreamProvider */}
      <StreamVideoProvider>{children}</StreamVideoProvider>
    </main>
  );
};

export default RootLayout;
