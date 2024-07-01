// Importiert die notwendigen Hooks und Typen aus React und dem Stream Video SDK
import { useEffect, useState } from "react";
import { Call, useStreamVideoClient } from "@stream-io/video-react-sdk";

// Definiert einen benutzerdefinierten Hook, der eine Call-ID (als String oder Array von Strings) entgegennimmt.
// Der Hook gibt den Call und den Ladezustand zurück.
export const useGetCallById = (id: string | string[]) => {
  // Zustandsvariablen für den Call und den Ladezustand
  const [call, setCall] = useState<Call>();
  const [isCallLoading, setIsCallLoading] = useState(true); // Damit wir wissen, ob wir gerade einen Call laden oder nicht

  // Verwendet den Hook aus dem Stream Video SDK, um auf den Video-Client zuzugreifen
  const client = useStreamVideoClient();

  // useEffect Hook, der bei Änderungen von `client` oder `id` ausgeführt wird
  useEffect(() => {
    // Wenn kein Client vorhanden ist, wird die Funktion frühzeitig beendet
    if (!client) return;

    // Asynchrone Funktion zum Laden des Calls
    const loadCall = async () => {
      try {
        // Ruft die Methode `queryCalls` des Clients auf, um Calls basierend auf Filterbedingungen abzufragen
        const { calls } = await client.queryCalls({
          filter_conditions: { id },
        });

        // Wenn Calls gefunden wurden, wird der erste Call im Zustand gespeichert
        if (calls.length > 0) setCall(calls[0]);

        // Setzt den Ladezustand auf false, da der Ladevorgang abgeschlossen ist
        setIsCallLoading(false);
      } catch (error) {
        // Bei einem Fehler wird der Fehler in der Konsole ausgegeben und der Ladezustand auf false gesetzt
        console.error(error);
        setIsCallLoading(false);
      }
    };

    // Ruft die asynchrone Funktion `loadCall` auf. Die Konstruktion, dass man erste Funktion schreibt und unten gleich aufruft, muss man immer machen, wenn man in Use Effekt async Code verwendet. Sonst geht das nicht.
    loadCall();
    // Abhängigkeiten des useEffect Hooks, bei deren Änderung der Hook erneut ausgeführt wird
  }, [client, id]);

  // Gibt den Call und den Ladezustand für den Call zurück
  return { call, isCallLoading };
};
