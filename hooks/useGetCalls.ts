import { useEffect, useState } from "react";
import { useUser } from "@clerk/nextjs";
import { Call, useStreamVideoClient } from "@stream-io/video-react-sdk";

// Das ist der Hook, der unsere Calls von Stream aus der Datenbank holt und zurück gibt:
export const useGetCalls = () => {
  const [calls, setCalls] = useState<Call[]>([]); // Hier speichern wir die Calls rein. Typ: Call[] imortiert von @stream-io/video-react-sdk
  const client = useStreamVideoClient(); // Hier holen wir uns den Client von Stream. Dieser wird benötigt, um die Calls zu holen. Das istt quasi unser API-Client
  const [isLoading, setIsLoading] = useState(false); // Hier speichern wir, ob die Calls gerade geladen werden oder nicht. das ist ja ein asynchroner Prozess
  const { user } = useUser(); // Haben wir auch Calls für einen speziellen User holen müssen, brauchen wir auch den User.

  useEffect(() => {
    const loadCalls = async () => {
      if (!client || !user?.id) return; //  Fail Safe: Wenn der Client oder der User nicht existieren, dann brechen wir hier ab

      setIsLoading(true); // Hier setzen wir isLoading auf true, wenn die Calls geladen werden

      try {
        // https://getstream.io/video/docs/react/guides/querying-calls/#filters
        // Hier holen wir uns die Calls von Stream. Wir holen uns alle Calls, die entweder von dem User erstellt wurden oder an denen der User beteiligt ist.
        const { calls } = await client.queryCalls({
          // Hier holen wir uns die Calls von Stream. Siehe in Docs
          sort: [{ field: "starts_at", direction: -1 }], // Hier sortieren wir die Calls nach dem Startdatum absteigend
          filter_conditions: {
            starts_at: { $exists: true }, // Hier filtern wir die Calls, die ein Startdatum haben
            $or: [
              { created_by_user_id: user.id }, // Hier holen wir uns die Calls, die von dem User erstellt wurden. Das ist der User, der aktuell eingeloggt ist
              { members: { $in: [user.id] } }, // Hier holen wir uns die Calls, an denen der User beteiligt ist
            ],
          },
        });

        setCalls(calls); // Hier speichern wir die Calls in den State
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false); // Hier setzen wir isLoading auf false, wenn die Calls geladen wurden
      }
    };

    loadCalls(); // Hier rufen wir die Funktion leich auf, die die Calls holt. Das war der Trick, um async funktionalität in US Effects einbinden zu können
  }, [client, user?.id]); // Hier wird der Effekt ausgeführt, wenn sich der Client oder der User ändert

  // Dadurch, dass wir nun hier unten die Calls filtern und in variablen speichern, machen wir den Hook reusable. Wir können ihn in verschiedenen Komponenten verwenden

  const now = new Date(); // Das Aktuelle Datum brauchen wir um die Calls zu filtern

  // Definiert eine Konstante `endedCalls`, die eine gefilterte Liste von Anrufen (`calls`) enthält.
  // Diese Liste enthält nur Anrufe, die bereits begonnen haben oder beendet sind.
  const endedCalls = calls?.filter(({ state: { startsAt, endedAt } }: Call) => {
    // Überprüft, ob der Anruf bereits begonnen hat (startsAt ist kleiner als das aktuelle Datum `now`)
    // oder ob der Anruf beendet ist (`endedAt` ist definiert). !!endedAt wandelt `endedAt` in einen Boolean um.
    return (startsAt && new Date(startsAt) < now) || !!endedAt;
  });

  // Definiert eine Konstante `upcomingCalls`, die eine gefilterte Liste von Anrufen (`calls`) enthält.
  // Diese Liste enthält nur Anrufe, die in der Zukunft beginnen werden.
  const upcomingCalls = calls?.filter(({ state: { startsAt } }: Call) => {
    // Überprüft, ob der Startzeitpunkt des Anrufs (`startsAt`) in der Zukunft liegt.
    return startsAt && new Date(startsAt) > now; // Das && ist ein logischer Operator. Wenn beide Bedingungen erfüllt sind, wird true zurückgegeben. Also geht der Call in die Liste upcomingCalls
  });

  // Gibt ein Objekt zurück, das die gefilterten Listen `endedCalls` und `upcomingCalls` enthält,
  // zusätzlich die ursprüngliche Liste aller Anrufe (`calls`) als `callRecordings` und den Ladezustand `isLoading`.
  return { endedCalls, upcomingCalls, callRecordings: calls, isLoading };
};
