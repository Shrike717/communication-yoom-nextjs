"use client";
import React from "react";
import { useCall, useCallStateHooks } from "@stream-io/video-react-sdk";
import { Button } from "./ui/button";
import { useRouter } from "next/navigation";

const EndCallButton = () => {
  // Als erstes brauchen wir Zugang zur Information über den Call
  // Dafür importieren wir useCall Hook:
  const call = useCall();

  // Als zweites brauchen wir einen anderen Hook um den User zu bekommen, der den Call erstellt hat
  const { useLocalParticipant } = useCallStateHooks();
  // Jetzt können wir Zugang zu diesem LocalParticipant herstellen:
  const localParticipant = useLocalParticipant();

  // Falls wir den Call beenden, müssen wir zur Homepage zurück navigieren
  // Dafür importieren wir useRouter Hook:
  const router = useRouter();

  // Hier checken wir jetzt, ob dieser User der Meeting Owner ist:
  const isMeetingOwner =
    localParticipant &&
    call?.state.createdBy &&
    localParticipant.userId === call.state.createdBy.id;

  // Fail-Safe: Wenn der User nicht der Owner ist, dann wird der Button nicht gerendert
  if (!isMeetingOwner) return null; // null bedeutet, dass der Button nicht gerendert wird

  return (
    <Button
      onClick={async () => {
        // Hier beenden wir den Call
        await call.endCall();
        // Hier navigieren wir zurück zur Homepage
        router.push("/");
      }}
      className="bg-red-500"
    >
      End call for everyone
    </Button>
  );
};

export default EndCallButton;
