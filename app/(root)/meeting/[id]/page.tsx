"use client";
// import { useUser } from "@clerk/nextjs"; // Das haben wir erst mal nicht gebraucht
import { StreamCall, StreamTheme } from "@stream-io/video-react-sdk";
import React, { useState } from "react";

import MeetingRoom from "@/components/MeetingRoom";
import MeetingSetup from "@/components/MeetingSetup";
import { useGetCallById } from "@/hooks/useGetCallById";
import { useParams } from "next/navigation";
import Loader from "@/components/Loader";

// Die Meeting-Komponente ist die Hauptkomponente, die die gesamte Meeting-Logik enthält.
const Meeting = ({ params }: { params: { id: string } }) => {
  // Die ID wird aus den params geholt.
  const { id } = useParams();

  // Zuerst brauchen wir unseren authentifizierten User. isLoaded zeigt an, ob der User bereits geladen wurde. ACHTUNG: Wurde erst mal nicht gebraucht.
  //   const { user, isLoaded } = useUser();
  // Das State brauchen wir, um tracken zu können ab der Audio und Video Setup des Users komplett ist oder nicht
  const [isSetupComplete, setIsSetupComplete] = useState(false);

  // Hier holen wir uns den Call und den Ladezustand des Calls aus unserem custom Hook. Die ID wird aus den params geholt.
  const { call, isCallLoading } = useGetCallById(id);

  // Wenn der Call noch geladen wird, wird ein Ladebildschirm angezeigt
  if (!call || isCallLoading) return <Loader />;

  return (
    <main className="h-screen w-full">
      {/*  Hier wird der Call-Objekt übergeben, das wir aus der Call-ID erhalten über unseren custom Hook erhalten. */}
      {/* Wir müssen wissen, in welchem Call wir uns befinden */}
      <StreamCall call={call}>
        <StreamTheme>
          {/* Hier wollen wir nun zuerst wissen, ob der Audio und Video Setup des Zeus das schon komplettiert wurde oder nicht */}
          {!isSetupComplete ? (
            <MeetingSetup setIsSetupComplete={setIsSetupComplete} /> // Wir geben den Setter als Prop an die MeetingSetup Komponente
          ) : (
            <MeetingRoom />
          )}
        </StreamTheme>
      </StreamCall>
    </main>
  );
};

export default Meeting;
