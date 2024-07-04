"use client"; // Gibt an, dass dieser Code auf dem Client ausgeführt wird, nicht auf dem Server.
import { useRouter } from "next/navigation";
import { useState } from "react";
import HomeCard from "./HomeCard";
import MeetingModal from "./MeetingModal";
import { useUser } from "@clerk/nextjs";
import { Call, useStreamVideoClient } from "@stream-io/video-react-sdk";

import { useToast } from "@/components/ui/use-toast"; // Hier importieren wir den Toast-Hook.
import { Textarea } from "./ui/textarea";

import ReactDatePicker from "react-datepicker"; // Hier importieren wir den Datepicker.

// Diese Komponente rendert eine Liste von Meeting-Typen, die der Benutzer erstellen oder beitreten kann.
const MeetingTypeList = () => {
  // Das ist der Router-Hook, der verwendet wird, um den Benutzer auf eine andere Seite weiterzuleiten.
  const router = useRouter();
  // Hier holen wir uns den Toast-Hook:
  const { toast } = useToast();

  // Das ist das MeetingState, das den aktuellen Status des Meetings speichert.
  // Es wird verwendet, um zu bestimmen, welcher Typ von Meeting erstellt wird.
  // Mit TypeScript können wir den Typ der Variablen deklarieren, um sicherzustellen, dass sie nur bestimmte Werte annehmen kann.
  const [meetingState, setMeetingState] = useState<
    "isScheduleMeeting" | "isJoiningMeeting" | "isInstantMeeting" | undefined
  >();

  // Dieses State brauchen wir für die Parameter unseres Meetings beim Erzeugen des Calls:
  const [values, setValues] = useState({
    dateTime: new Date(), // Hier setzen wir die Startzeit auf das aktuelle Datum.
    description: "", // Hier setzen wir die Beschreibung des Meetings auf einen leeren String.
    link: "", // Hier setzen wir den Link des Meetings auf einen leeren String.
  });

  // Wie the State brauchen wir, nach dem wir den Call erzeugt haben, um die Details des Calls zu speichern:
  const [callDetails, setCallDetails] = useState<Call>();

  // Um einen Call auslösen zu können, müssen wir zuerst prüfen, ob wir einen User haben:
  const { user } = useUser(); // Hier holen wir uns den User von Clerk.
  // Auch müssen wir hier einen Client initialisieren, um einen Call auszulösen:
  const client = useStreamVideoClient(); // Hier intiialisieren wir uns den Client vom @stream-io/video-react-sdk Paket. Das ist jetzt Client Side

  // Diese Funktion wird aufgerufen, wenn der Benutzer auf den Button "Start Meeting" klickt.
  const createMeeting = async () => {
    // Fail Saves:
    if (!client || !user) return; // Wenn wir keinen Client oder User haben, brechen wir ab.

    // Hier erstellen wir einen Call. Da wir try catch nehmen muss oben aasync an die Funktion
    try {
      // Toast für den Fall dass kein Datum und keine Zeit ausgewählt wurde:
      if (!values.dateTime) {
        toast({ title: "Please select a date and a time" });
        return;
      }

      // Zuerst müssen wir eine zufällige, sichere ID für diesen Call erzeugen:
      const id = crypto.randomUUID(); // crypto ist ein eingebautes Modul, das uns hilft, sichere IDs zu erzeugen.

      // Hier erstellen wir den Call:
      const call = client.call("default", id); // Hier erstellen wir den Call am client. Der erste Parameter, die fault heißt, es ist ein eins zu eins Video Call mit Audio. Der zweite ist die ID des Calls.

      // Faill Save:
      if (!call) throw new Error("Failed to create call"); // Wenn der Call nicht erstellt werden konnte, werfen wir einen Error.

      // Wenn wir einen Call haben, brauchen wir zuerst die Zeit, zu welcher das Meeting gestartet wurde:
      const startsAt =
        values.dateTime.toISOString() || new Date(Date.now).toISOString(); // Hier holen wir uns die Startzeit des Meetings und formatieren sie in ein ISO-String. Wenn es keine gibt, nehmen wir die aktuelle Zeit.
      // Dann holen wir uns die Beschreibung des Meetings:
      const description = values.description || "Instant meeting"; // Hier holen wir uns die Beschreibung des Meetings. Wenn es keine gibt, nehmen wir "Instant meeting".

      // Schliesslich wenn Wir alles haben, können wir den Call starten:
      await call.getOrCreate({
        data: {
          starts_at: startsAt, // Hier setzen wir die Startzeit des Meetings.
          custom: {
            description, // Hier setzen wir die Beschreibung des Meetings.
          },
        },
      }); // Hier starten wir den Call mit der Startzeit und der Beschreibung.

      // Wenn der Call gestartet wurde, speichern wir die Details des Calls:
      setCallDetails(call);

      // Noch ein Fail Save:
      if (!values.description) router.push(`/meeting/${call.id}`); // Wenn es keine Beschreibung gibt, leiten wir den Benutzer zur Seite des Meetings weiter.

      // Wenn alles gut geht, zeigen wir eine Erfolgsmeldung an:
      toast({ title: "Meeting created successfully" });
    } catch (error) {
      console.log(error);
      toast({ title: "Failed to create meeting" });
    }
  };

  //  Hier holen wir uns den Meeting Link ür ein Scheduled Meeting aus dem Call Details, so dass er unten im Modal kopiert werden kann:
  const meetingLink = `${process.env.NEXT_PUBLIC_BASE_URL}/meeting${callDetails?.id} `; // Hier holen wir uns den Meeting-Link aus den Call-Details.

  return (
    <section className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-4">
      {/*
              Erstellt einen Abschnitt mit einer Grid-Layout.
              - 'grid': Aktiviert das Grid-Layout.
              - 'grid-cols-1': Definiert eine Spalte für Viewports unter 768px Breite.
              - 'gap-5': Setzt den Abstand zwischen den Grid-Elementen auf 1.25rem (20px).
              - 'md:grid-cols-2': Definiert zwei Spalten für Viewports ab 768px Breite.
              - 'xl:grid-cols-4': Definiert vier Spalten für Viewports ab 1280px Breite.
            */}
      <HomeCard
        img="/icons/add-meeting.svg" // Pfad zum Bild des Elements.
        title="New Meeting" // Titel des Elements.
        description="Start an instant meeting" // Beschreibung des Elements.
        className="bg-orange-1" // Fügt eine Hintergrundfarbe hinzu. Spezifische Farbe wird in CSS definiert.
        handleClick={() => setMeetingState("isInstantMeeting")} // Funktion, die aufgerufen wird, wenn auf das Element geklickt wird.
      />
      <HomeCard
        img="/icons/join-meeting.svg"
        title="Join Meeting"
        description="via invitation link"
        className="bg-blue-1" // Fügt eine blaue Hintergrundfarbe hinzu. Spezifische Farbe wird in CSS definiert.
        handleClick={() => setMeetingState("isJoiningMeeting")}
      />
      <HomeCard
        img="/icons/schedule.svg"
        title="Schedule Meeting"
        description="Plan your meeting"
        className="bg-purple-1" // Fügt eine lila Hintergrundfarbe hinzu. Spezifische Farbe wird in CSS definiert.
        handleClick={() => setMeetingState("isScheduleMeeting")}
      />
      <HomeCard
        img="/icons/recordings.svg"
        title="View Recordings"
        description="Meeting Recordings"
        className="bg-yellow-1" // Fügt eine gelbe Hintergrundfarbe hinzu. Spezifische Farbe wird in CSS definiert.
        handleClick={() => router.push("/recordings")} // Leitet den Benutzer zur Seite '/recordings' weiter.
      />

      {/* Hier sitzt das wiederverwertbare Modal */}
      {/* Wir prüfen jetzt, ob es schon callDetails gibt. Nur wenn nicht, erstellen wir ein neues Meeting. */}
      {!callDetails ? (
        <MeetingModal
          isOpen={meetingState === "isScheduleMeeting"} // Hier prüfen wir, ob der MeetingState auf "isScheduleMeeting" gesetzt ist.
          onClose={() => setMeetingState(undefined)} // Hier setzen wir den MeetingState auf 'undefined', wenn das Modal geschlossen wird.
          title="Create Meeting" // Hier setzen wir den Titel des Modals.
          handleClick={createMeeting} // Hier setzen wir die Funktion, die aufgerufen wird, wenn der Button geklickt wird.
        >
          <div className="flex flex-col gap-2.5">
            <label className="text-base font-normal leading-[22px] text-sky-2">
              Add a description
            </label>
            <Textarea
              // Die Fokus Regeln überschreiben die Standard Fokus Regeln von Tailwind. So bildet sich kein weißer and um das Feld
              className="border-none bg-dark-3 focus-visible:ring-0 focus-visible:ring-offset-0"
              onChange={(e) =>
                setValues({ ...values, description: e.target.value })
              }
            />
          </div>
          {/* Kalender */}
          <div className="flex w-full flex-col gap-2.5">
            <label className="text-base font-normal leading-[22px] text-sky-2">
              Select Date and Time
            </label>
            <ReactDatePicker
              selected={values.dateTime} // Hier setzen wir das Datum und die Zeit des Meetings.
              onChange={(date) => setValues({ ...values, dateTime: date! })} // Hier setzen wir die Funktion, die aufgerufen wird, wenn das Datum und die Zeit geändert werden.
              showTimeSelect // Hier zeigen wir die Zeitauswahl an.
              timeFormat="HH:mm" // Hier setzen wir das Zeitformat.
              timeIntervals={15} // Hier setzen wir die Zeitintervalle auf 15 Minuten.
              timeCaption="time" // Hier setzen wir die Beschriftung für die Zeit.
              dateFormat="MMMM d, yyyy h:mm aa" // Hier setzen wir das Datumsformat.
              className="w-full rounded bg-dark-3 p-2 focus:outline-none"
            />
          </div>
        </MeetingModal>
      ) : (
        <MeetingModal
          isOpen={meetingState === "isScheduleMeeting"} // Hier prüfen wir, ob der MeetingState auf "isInstantMeeting" gesetzt ist.
          onClose={() => setMeetingState(undefined)} // Hier setzen wir den MeetingState auf 'undefined', wenn das Modal geschlossen wird.
          title="Meeting created" // Hier setzen wir den Titel des Modals.
          className="text-center"
          handleClick={() => {
            navigator.clipboard.writeText(meetingLink); // Hier kopieren wir den Meeting-Link in die Zwischenablage.
            toast({ title: "Meeting link copied" }); // Hier zeigen wir eine Erfolgsmeldung an.
          }} // Hier setzen wir die Funktion, die aufgerufen wird, wenn der Button geklickt wird.
          image="/icons/checked.svg" // Hier setzen wir das Bild des Modals.
          buttonIcon="/icons/copy.svg" // Hier setzen wir das Icon des Buttons.
          buttonText="Copy Meeting Link" // Hier setzen wir den Titel des Buttons.
        />
      )}

      <MeetingModal
        isOpen={meetingState === "isInstantMeeting"} // Hier prüfen wir, ob der MeetingState auf "isInstantMeeting" gesetzt ist.
        onClose={() => setMeetingState(undefined)} // Hier setzen wir den MeetingState auf 'undefined', wenn das Modal geschlossen wird.
        title="Start an Instant Meeting" // Hier setzen wir den Titel des Modals.
        className="text-center"
        buttonText="Start Meeting" // Hier setzen wir den Text des Buttons.
        handleClick={createMeeting} // Hier setzen wir die Funktion, die aufgerufen wird, wenn der Button geklickt wird.
      />
    </section>
  );
};

export default MeetingTypeList;
