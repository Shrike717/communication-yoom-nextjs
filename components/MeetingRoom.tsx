import React, { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { cn } from "@/lib/utils";
import {
  CallControls,
  CallParticipantsList,
  CallStatsButton,
  CallingState,
  PaginatedGridLayout,
  SpeakerLayout,
  useCallStateHooks,
} from "@stream-io/video-react-sdk";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { LayoutListIcon, UsersIcon } from "lucide-react";
import EndCallButton from "./EndCallButton";
import Loader from "./Loader";

// Für unsere unterschiedlichen Layouts Styles brauchen wir Typ Definitionen
type CallLayoutType = "grid" | "speaker-left" | "speaker-right";

const MeetingRoom = () => {
  // Hier greifen wir auf die searchParaams zu, um herauszufinden, ob ein User der Besitzer eines private Room ist.
  const searchParams = useSearchParams();

  // Die beiden!! wandeln den Wert in ein Boolean um: "personal" ist truthy wenn es existiert. Also ist !"personal" false und !!"personal" true.
  // Wenn es undefined ist: !undefined = true, !!undefined = false
  const isPersonalRoom = !!searchParams.get("personal");

  // Dieses State brauchen wir um die Layoutkomponente, die der User auswählt tracken zu können
  const [layout, setLayout] = useState<CallLayoutType>("speaker-left");
  // Dieses State brauchen wir um die Teilnehmerliste anzuzeigen oder nicht
  const [showParticipants, setShowParticipants] = useState(false);

  // Das ist eine interessante Funktion vom Stream Team. Sie ermöglicht Zugang zu allen State Hawks
  const { useCallCallingState } = useCallStateHooks();
  // Hier holen wir uns den Calling State
  const callingState = useCallCallingState();

  // Mit dem Router können wir den User zurück zur Homepage leiten
  const router = useRouter();

  // Mit dem callingState können wir herausfinden, ob der User dem Call beigetreten ist. Wenn nicht, zeigen wir einen Loader
  if (callingState !== CallingState.JOINED) return <Loader />;

  // Diese Komponente rendert uns verschiedeene Layouts basierend auf dem state:
  const CallLayout = () => {
    switch (layout) {
      case "grid":
        return <PaginatedGridLayout />;
      case "speaker-right":
        return <SpeakerLayout participantsBarPosition="left" />; // Speaker ist rechts, Teilnehmer sind links
      default: // Default ist speaker-left
        return <SpeakerLayout participantsBarPosition="right" />; // Speaker ist links, Teilnehmer sind rechts
    }
  };

  return (
    <section className="relative h-screen w-full overflow-hidden pt-4 text-white">
      {/* relative: Positioniert das Element relativ zu seinem normalen Standort. */}
      {/* h-screen: Höhe des Elements entspricht der Höhe des Bildschirms. */}
      {/* w-full: Breite des Elements entspricht der vollen Breite des Elternelements. */}
      {/* overflow-hidden: Versteckt den überfließenden Inhalt des Elements. */}
      <div className="relative flex size-full items-center justify-center">
        {/* relative: Positioniert das Element relativ zu seinem normalen Standort. */}
        {/* flex: Wendet ein Flexbox-Layout an. */}
        {/* size-full: Setzt Höhe und Breite auf 100 % des Eltern Elements */}
        {/* items-center: Zentriert die Flex-Items vertikal innerhalb des Containers. */}
        {/* justify-center: Zentriert die Flex-Items horizontal innerhalb des Containers. */}
        <div className="flex size-full max-w-[1000px] flex-1 items-center">
          {/* max-w-[1000px]: Maximale Breite des Elements ist 1000px. */}
          {/* flex-1: Das Element wächst und schrumpft basierend auf dem Flex-Grow-Wert 1. */}

          {/* Hier wollen wir nun eine Layoutkomponente Rändern. Diese basiert auf dem Layout, was der User ausgewählt hat. */}
          <CallLayout />
        </div>
        {/* Hier werden die Teilnehmer gerendert */}
        <div
          // calc(100vh-86px) berechnet die Höhe des Elements. 100vh ist die Höhe des Bildschirms und 86px ist die Höhe des Headers. Diesen Wert subtrahieren wir von der Höhe des Bildschirms.
          // hidden: Versteckt das Element. Aber wir wollen es nur verstecken, wenn showParticipants false ist.
          className={cn("h-[calc(100vh-86px)] hidden ml-2", {
            "show-block": showParticipants,
          })}
        >
          {/* Das ist das Seiten Menü, das rechts aufgeht, wo man die Teilnehmer in der Liste sieht */}
          <CallParticipantsList onClose={() => setShowParticipants(false)} />
        </div>
      </div>

      {/* Hier werden die Kontrollelemente für den Video Stream angezeigt */}
      <div className="fixed bottom-0 flex w-full flex-wrap items-center justify-center gap-5">
        <CallControls
          onLeave={() => {
            // Nach Beendigung des Calls leiten wir den User zurück zur Homepage
            router.push("/");
          }}
        />

        {/* Dropdown für Layouts */}
        <DropdownMenu>
          <div className="flex items-center">
            <DropdownMenuTrigger className="cursor-pointer rounded-2xl bg-[#19232d] px-4 py-2 hover:bg-[#4C535B]">
              <LayoutListIcon size={20} className="text-white" />
            </DropdownMenuTrigger>
          </div>
          <DropdownMenuContent className="border-dark-1 bg-dark-1 text-white">
            {["Grid", "Speaker-Left", "Speaker-Right"].map((item, index) => (
              <div key={index}>
                <DropdownMenuItem
                  className="cursor-pointer"
                  onClick={() =>
                    setLayout(item.toLowerCase() as CallLayoutType)
                  }
                >
                  {item}
                </DropdownMenuItem>
                <DropdownMenuSeparator className="border-dark-1" />
              </div>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>

        {/* Das ist der Button für die Call Stats */}
        <CallStatsButton />

        {/* Das ist der Button, um die Liste der Teilnehmer anzuzeigen oder auszublenden */}
        <button
          onClick={() => setShowParticipants((prev) => !prev)} // Wenn der Button geklickt wird, wird der showParticipants State umgekehrt
        >
          <div className="cursor-pointer rounded-2xl bg-[#19232d] px-4 py-2 hover:bg-[#4C535B]">
            <UsersIcon size={20} className="text-white" />
          </div>
        </button>

        {/* Hier sitzt die Logik, um den and Call Button zu zeigen, falls der User der Meeting Owner ist und sich NICHT In einem Personal room befindet */}
        {!isPersonalRoom && <EndCallButton />}
      </div>
    </section>
  );
};

export default MeetingRoom;
