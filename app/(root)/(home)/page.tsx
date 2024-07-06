import React from "react";
import MeetingTypeList from "@/components/MeetingTypeList";
import DateTimeDisplay from "@/components/DateTimeDisplay";

const Home: React.FC = () => {
  return (
    // Hauptsektion mit flexibler Anordnung, voller Höhe und Breite, vertikaler Ausrichtung und weißer Textfarbe
    <section className="flex size-full flex-col gap-10 text-white">
      {/* Banner-Bereich mit Hintergrundbild, Höhe von 300px, voller Breite, abgerundeten Ecken von 20px und Hintergrundabdeckung */}
      <div className="h-[300px] w-full rounded-[20px] bg-hero bg-cover">
        {/* Flex-Container für Inhalte des Banners, mit Abständen für verschiedene Viewport-Breiten: 5px horizontal und 8px vertikal für max-md: Dieser Breakpoint bezieht sich auf Bildschirmbreiten, die kleiner als der md Breakpoint sind, also kleiner als 768px.  lg: Dieser Breakpoint bezieht sich auf Bildschirmbreiten ab 1024px. */}
        <div className="flex h-full flex-col justify-between max-lg:p-11 max-md:px-5 max-md:py-8 lg:p-11">
          {/* Stilisierter Textbereich für das nächste Meeting, mit Glas-Effekt, maximaler Breite von 270px, abgerundeten Ecken, 2 Einheiten vertikalem Abstand, zentriertem Text, Basis-Schriftgröße und normaler Schriftstärke */}
          <h2 className="glassmorphism max-w-[270px] rounded py-2 text-center text-base font-normal">
            Upcoming Meeting at: 12:30 PM
          </h2>

          {/* Container für Uhrzeit und Datum, mit 2 Einheiten Abstand zwischen den Elementen */}
          <div className="flex flex-col gap-2">
            {/* DateTimeDisplay-Komponente, die die aktuelle Zeit und das aktuelle Datum anzeigt, mit spezifischen Formatierungsoptionen */}
            <DateTimeDisplay
              dateFormat={{
                weekday: "long",
                year: "numeric",
                month: "long",
                day: "numeric",
              }}
              timeFormat={{
                hour: "2-digit",
                minute: "2-digit",
                // second: "2-digit",
                hour12: false,
              }}
            />
          </div>
        </div>
      </div>

      {/* Das ist die Komponente, die uns die Cards auf der Homepage zeigt. */}
      <MeetingTypeList />
    </section>
  );
};

export default Home;
