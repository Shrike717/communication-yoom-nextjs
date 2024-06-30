"use client";

import { ReactNode, useEffect, useState } from "react";
import { StreamVideoClient, StreamVideo } from "@stream-io/video-react-sdk";
import { useUser } from "@clerk/nextjs";

import { tokenProvider } from "@/actions/stream.actions";
import Loader from "@/components/Loader";

const API_KEY = process.env.NEXT_PUBLIC_STREAM_API_KEY;

// Diese Funktion ist ein Provider für den Stream Client. Wir wrappen unsere App in diesem Provider, um den Client in der App zu benutzen. Im Partial Layout haben wir das schon gemacht.
const StreamVideoProvider = ({ children }: { children: ReactNode }) => {
  // Diese State brauchen wir, um einen Client erstellen zu können:
  const [videoClient, setVideoClient] = useState<StreamVideoClient>();
  // Hier holen wir unser eingeloggten User mit einer Funktion von Clerk:
  const { user, isLoaded } = useUser();

  // Hier wird der Client erstellt:
  useEffect(() => {
    if (!isLoaded || !user) return; // Wenn es keinen User gibt, brechen wir ab.
    if (!API_KEY) throw new Error("Stream API key is missing");

    // Wenn wir einen User haben, erstellen wir den Client:
    const client = new StreamVideoClient({
      apiKey: API_KEY,
      user: {
        id: user?.id,
        name: user?.username || user?.id,
        image: user?.imageUrl,
      },
      tokenProvider, // Hier holen wir uns den Token von Stream über unsere Server Action, den wir für den Client brauchen.
    });

    setVideoClient(client); // Hier setzen wir den Client in den State.
  }, [user, isLoaded]);

  // Loader für den Fall, dass der Client noch nicht erstellt wurde:
  if (!videoClient) return <Loader />;

  // Hier geben wir den Client zurück:
  return <StreamVideo client={videoClient}>{children}</StreamVideo>;
};

export default StreamVideoProvider;
