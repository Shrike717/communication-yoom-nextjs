"use client";
import { useGetCalls } from "@/hooks/useGetCalls";
import { Call, CallRecording } from "@stream-io/video-react-sdk";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import MeetingCard from "./MeetingCard";
import Loader from "./Loader";
import { useToast } from "./ui/use-toast";

const CallList = ({ type }: { type: "ended | upcoming | recordings" }) => {
  // Hier holen wir uns die Calls von Stream. Das ist der Hook, den wir dafür geschrieben haben
  const { endedCalls, upcomingCalls, callRecordings, isLoading } =
    useGetCalls();

  // Für die Recordings brauchen wir ein eigenes State:
  const [recordings, setRecordings] = useState<CallRecording[]>([]);

  // Wir müssen rausfinden, auf welcher Seite wir uns gerade befinden, um die richtigen Calls holen zu können. Dafür nutzen wir den Router.
  const router = useRouter();

  // Gebrauch von Toasts, um Fehlermeldungen anzuzeigen
  const { toast } = useToast();

  // Hier holen wir uns die Calls, die wir anzeigen wollen. Das hängt davon ab, ob wir auf der Upcoming, Ended oder Recordings Seite sind
  const getCalls = () => {
    switch (type) {
      case "ended":
        return endedCalls.slice(0, 10); // Hier Habe ich die Anzahl der Previous Meeting auf zehn begrenzt. Sonst zu lange Liste
      case "recordings":
        return recordings;
      case "upcoming":
        return upcomingCalls;
      default:
        return [];
    }
  };

  // Hier erstellen wir eine Funktion, die uns jeweils eine Nachricht zurück gibt, wenn es keine Calls gibt
  const getNoCallsMessage = () => {
    switch (type) {
      case "ended":
        return "No Previous Meetings";
      case "upcoming":
        return "No Upcoming Meetings";
      case "recordings":
        return "No Recordings";
      default:
        return "";
    }
  };

  // Hier holen wir uns die Calls, die wir anzeigen wollen indem wir die Funktion getCalls aufrufen
  const calls = getCalls();
  // Hier holen wir uns die Nachricht, die wir anzeigen wollen, wenn es keine Calls gibt
  const noCallsMessage = getNoCallsMessage();

  // Hier brauchen wir eine Logik, die uns die Recordings holt und extrahiert:
  useEffect(() => {
    const fetchRecordings = async () => {
      try {
        // Hier holen wir uns ALLE Recordings aus den Calls
        const callData = await Promise.all(
          callRecordings?.map((meeting) => meeting.queryRecordings()) ?? []
        );

        const recordings = callData // Hier holen wir uns die Recordings aus den Calls
          .filter((call) => call.recordings.length > 0) // Hier filtern wir die Calls, die Recordings haben
          .flatMap((call) => call.recordings); // flatMap ist eine Methode, die uns ein Array von Arrays in ein Array umwandelt

        setRecordings(recordings); // Hier speichern wir die Recordings in den State
      } catch (error) {
        toast({
          title: "Try again later", // Wenn man zu oft versucht, die Recordings zu laden, kommt dieser Fehler
        });
      }
    };

    if (type === "recordings") {
      fetchRecordings(); // Hier rufen wir die Funktion auf, die uns die Recordings holt. Das passiert nur, wenn wir auf der Recordings Seite sind
    }
  }, [type, callRecordings]);

  // Hier setzen wir einen Loader, damit man am Anfang nicht ganz kurz no Meetings sieht.
  if (isLoading) return <Loader />;

  return (
    <div className="grid grid-cols-1 gap-5 xl:grid-cols-2">
      {calls && calls.length > 0 ? (
        calls.map((meeting: Call | CallRecording) => (
          <MeetingCard
            key={(meeting as Call).id} // Hier holen wir uns die ID des Calls, um sie als Key zu verwenden
            icon={
              // Hier holen wir uns das Icon, das wir anzeigen wollen. Das hängt davon ab, ob es ein Call oder ein Recording ist
              type === "ended"
                ? "/icons/previous.svg"
                : type === "upcoming"
                  ? "/icons/upcoming.svg"
                  : "/icons/recordings.svg"
            }
            title={
              // Hier holen wir uns den Titel des Calls, den wir anzeigen wollen. Das hängt davon ab, ob es ein Call oder ein Recording ist
              // meeting as Call).state?.custom?.description bedeutet, dass wir den Titel des Calls holen, wenn es ein Call ist. Wir müssen Type Skript sagen, dass es ein Call ist und es Zugang zu dem State hat.
              // (meeting as CallRecording).filename?.substring(0, 20) bedeutet, dass wir den Titel des Recordings holen, wenn es ein Recording ist. Wir schneiden den Titel auf 20 Zeichen ab
              (meeting as Call).state?.custom?.description ||
              (meeting as CallRecording).filename?.substring(0, 20) ||
              "No Description"
            }
            date={
              (meeting as Call).state?.startsAt
                ?.toLocaleString("en-US", {
                  //   weekday: "short", // z.B. Montag
                  year: "numeric",
                  month: "2-digit", // Änderung zu 2-digit für Konsistenz
                  day: "2-digit",
                  hour: "2-digit",
                  minute: "2-digit",
                  //   second: "2-digit",
                  //   timeZoneName: "short", // z.B. MEZ
                })
                .replace(/\//g, ".") ||
              new Date((meeting as CallRecording).start_time)
                .toLocaleString("en-US", {
                  //   weekday: "short", // z.B. Montag
                  year: "numeric",
                  month: "2-digit", // Änderung zu 2-digit für Konsistenz
                  day: "2-digit",
                  hour: "2-digit",
                  minute: "2-digit",
                  //   second: "2-digit",
                  //   timeZoneName: "short", // z.B. MEZ
                })
                .replace(/\//g, ".") // Ersetzt Schrägstriche durch Punkte
            }
            isPreviousMeeting={type === "ended"} // Hier setzen wir isPreviousMeeting auf true, wenn es ein Call ist. Dann bekommt die Card keine Buttons
            // link: Hier holen wir uns den Link, den wir anzeigen wollen. Das hängt davon ab, ob es ein Call oder ein Recording ist
            link={
              type === "recordings"
                ? (meeting as CallRecording).url // Das ist der Link zu einem Recording
                : `${process.env.NEXT_PUBLIC_BASE_URL}/meeting/${(meeting as Call).id}` // Das ist der Link zu einem zukünftigen Call
            }
            // Hier holen wir uns das Icon und den Text für den Button, den wir anzeigen wollen wenn es ein Recording ist
            buttonIcon1={type === "recordings" ? "/icons/play.svg" : undefined}
            buttonText={type === "recordings" ? "Play" : "Start"} // Hier holen wir uns den Text für den Button, den wir anzeigen wollen wenn es ein Recording oder ein Call ist
            // Die handleClick schickt uns entweder zur Recording Seite, wenn es ein Recording ist, ansonsten zum Meeting Room, wenn wir in der Meeting Card auf Start klicken
            handleClick={
              type === "recordings"
                ? () =>
                    window.open(`${(meeting as CallRecording).url}`, "_blank") // Hier öffnen wir das Recording in einem neuen Tab, wenn es ein Recording ist
                : () => router.push(`/meeting/${(meeting as Call).id}`) // Hier schicken wir uns zum Meeting Room, wenn es ein Call ist
            }
          />
        ))
      ) : (
        <h1 className="text-2xl font-bold text-white">{noCallsMessage}</h1> // Hier zeigen wir die Nachricht an, wenn es keine Calls gibt
      )}
    </div>
  );
};

export default CallList;
