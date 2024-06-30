import React, { ReactNode } from "react";
import StreamVideoProvider from "@/providers/StreamClientProvider";

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
