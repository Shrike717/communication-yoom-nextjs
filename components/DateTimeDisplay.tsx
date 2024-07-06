"use client";
import React, { useState, useEffect } from "react";

// Definiert die Typen der Props, die die Komponente akzeptiert
interface DateTimeDisplayProps {
  locale?: string; // Optional: Spracheinstellung für die Datums- und Zeitformatierung
  dateFormat?: Intl.DateTimeFormatOptions; // Optional: Formatierungsoptionen für das Datum
  timeFormat?: Intl.DateTimeFormatOptions; // Optional: Formatierungsoptionen für die Zeit
  className?: string; // Optional: CSS-Klassen für den übergeordneten Container
  timeClass?: string; // Optional: CSS-Klassen für die Zeitangabe
  dateClass?: string; // Optional: CSS-Klassen für die Datumsangabe
}

// Die Komponente zum Anzeigen von Datum und Zeit. Die Props sind als überschreibbare Optionen für die Formatierung von Datum und Zeit konfigurierbar.
const DateTimeDisplay: React.FC<DateTimeDisplayProps> = ({
  locale = "en-US", // Standardwert für die Spracheinstellung
  dateFormat = { dateStyle: "full" }, // Standardwert für das Datumformat
  timeFormat = { hour: "2-digit", minute: "2-digit", hour12: true }, // Standardwert für das Zeitformat
  className = "", // Standardwert für die CSS-Klasse des übergeordneten Containers
  timeClass = "text-4xl font-extrabold lg:text-7xl", // Standardwert für die CSS-Klasse der Zeitangabe
  dateClass = "text-lg font-medium text-sky-1 lg:text-2xl", // Standardwert für die CSS-Klasse der Datumsangabe
}) => {
  // Initialisiert den Zustand 'now' mit dem aktuellen Datum und Zeit
  const [now, setNow] = useState(new Date());

  // useEffect Hook, um Nebeneffekte zu handhaben
  useEffect(() => {
    // Erstellt ein Intervall, das jede Minute 'setNow' aufruft, um 'now' zu aktualisieren
    const intervalId = setInterval(() => {
      setNow(new Date());
    }, 60000); // Aktualisiert jede Minute

    // Bereinigungsfunktion, die beim Unmount der Komponente aufgerufen wird
    return () => clearInterval(intervalId); // Löscht das Intervall, um Speicherlecks zu vermeiden
  }, []); // Leeres Abhängigkeitsarray bedeutet, dass der Effekt nur beim Mounten ausgeführt wird

  // Formatierung des Datums basierend auf den Props 'locale' und 'dateFormat'
  const date = new Intl.DateTimeFormat(locale, dateFormat).format(now);
  // Formatierung der Zeit basierend auf den Props 'locale' und 'timeFormat'
  const time = new Intl.DateTimeFormat(locale, {
    ...timeFormat,
    hour12: true, // Stellt sicher, dass die 12-Stunden-Anzeige verwendet wird
  }).format(now);

  return (
    <div className={`flex flex-col gap-2 ${className}`}>
      <p className={timeClass}>{time}</p>
      <p className={dateClass}>{date}</p>
    </div>
  );
};

// Exportiert die Komponente für die Verwendung in anderen Teilen der Anwendung
export default DateTimeDisplay;
