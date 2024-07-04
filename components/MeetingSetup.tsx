/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import React, { useEffect, useState } from "react";
import {
  DeviceSettings,
  VideoPreview,
  useCall,
} from "@stream-io/video-react-sdk";
import { Button } from "./ui/button";

const MeetingSetup = ({
  setIsSetupComplete,
}: {
  setIsSetupComplete: (value: boolean) => void;
}) => {
  // https://getstream.io/video/docs/react/ui-cookbook/replacing-call-controls/
  // Dieses State ist dafür da, um Zugriff auf die Kamera und das Mikrofon zu bekommen
  const [isMicCamToggledOn, setIsMicCamToggledOn] = useState(false);

  // Hier wird auf Den Call zugegriffen. Das funktioniert jetzt einfach, weil wir den Call in der StreamCall Komponente haben. Dort hatten wir ja diese Infos über den custom Hook geholt.
  // Und dieser Call ermöglicht uns Zugriff auf Mikrofon und Kamera
  const call = useCall();

  // Fail-Safe, falls der Call nicht existiert
  if (!call)
    throw new Error("useCall must be used within a StreamCall component");

  // Hier überwachen, wie sich der Zustand von isMicCamToggledOn ändert. Wenn sich der Zustand ändert, wird die Kamera und das Mikrofon aktiviert oder deaktiviert.
  useEffect(() => {
    // Hier toggeln wir das State
    if (isMicCamToggledOn) {
      call.camera.enable();
      call.microphone.enable();
    } else {
      call.camera.disable();
      call.microphone.disable();
    }
  }, [isMicCamToggledOn]);

  return (
    <div className="flex h-screen w-full flex-col items-center justify-center gap-3 text-white">
      <h1 className="text-2xl font-bold">Setup</h1>
      {/* Diese Komponente Ist die erste Videokomponente, die wir hier brauchen  */}
      <VideoPreview />
      {/* Checkboxen */}
      <div className="flex h-16 items-center justify-center gap-3">
        <label className="flex items-center justify-center gap-2 font-medium">
          <input
            type="checkbox"
            checked={isMicCamToggledOn}
            onChange={(e) => setIsMicCamToggledOn(e.target.checked)}
          />
          Check to enable cam and mic. Or join without
        </label>
        {/* Diese Komponente sollte die Einstellung für die Kamera und das Mikrofon anzeigen. */}
        <DeviceSettings />
      </div>

      {/* Button */}
      <Button
        className="rounded-md bg-green-500 px-4 py-2.5"
        onClick={() => {
          call.join(); // Hier wird der Call beigetreten. .join() ist eine Methode, die von der Call-Instanz bereitgestellt wird.
          setIsSetupComplete(true);
        }}
      >
        Join Meeting
      </Button>
    </div>
  );
};

export default MeetingSetup;
