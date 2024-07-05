"use client";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet"; // Importiert Sheet-Komponenten für ein modales/ausziehbares Navigationsmenü.

import { sidebarLinks } from "@/constants"; // Importiert die Links für die Seitenleiste aus einer Konstanten-Datei.
import { cn } from "@/lib/utils"; // Importiert eine Hilfsfunktion zur Klassenname-Zusammenführung.

const MobileNav = () => {
  const pathname = usePathname(); // Nutzt den usePathname Hook, um den aktuellen Pfad zu erhalten.

  return (
    <section className="w-full max-w-[264px]">
      {/* Definiert einen Bereich mit voller Breite, aber maximal 264px breit. */}
      <Sheet>
        {/* Start des Sheet-Komponenten-Containers für das modale Menü. */}

        <SheetTrigger asChild>
          {/* Definiert den Auslöser für das Sheet. Bei Klick auf Hamburger */}
          <Image
            src="/icons/hamburger.svg"
            width={36}
            height={36}
            alt="hamburger icon"
            className="cursor-pointer sm:hidden" // Zeigt den Cursor als Zeiger und verbirgt das Element auf Viewports über sm (640px).
          />
        </SheetTrigger>

        <SheetContent side="left" className="border-none bg-dark-1">
          <SheetClose asChild>
            {/* Schließmechanismus für das Sheet wenn Auf das obere Logo geklickt wird. Kommt von mir. */}
            {/* Inhalt des Sheets, erscheint von der linken Seite, ohne Rahmen, mit dunklem Hintergrund. */}
            <Link href="/" className="flex items-center gap-1">
              {/* Link zur Startseite, flexibles Layout mit zentrierten Elementen und einem Abstand von 1. */}
              <Image
                src="/icons/logo.svg"
                width={32}
                height={32}
                alt="yoom logo"
                className="max-sm:size-10" // Setzt die Größe auf 10 auf kleinen Bildschirmen.
              />
              <p className="text-[26px] font-extrabold text-white">
                {/* Paragraph mit 26px Schriftgröße, extra fett, in weißer Farbe. */}
                YOOM
              </p>
            </Link>
          </SheetClose>
          <div className="flex h-[calc(100vh-72px)] flex-col justify-between overflow-y-auto">
            {/* Flex-Container, Höhe berechnet als Bildschirmhöhe minus 72px, vertikale Ausrichtung, Inhalt scrollt bei Überlauf. 72px ist die Höhe der Navbar. Muss man abziehen */}
            <SheetClose asChild>
              <section className=" flex h-full flex-col gap-6 pt-16 text-white">
                {/* Bereich mit voller Höhe, vertikaler Ausrichtung, Abstand zwischen Elementen von 6, oberer Abstand von 16, in weißer Farbe. */}
                {sidebarLinks.map((item) => {
                  // Iteriert über die Links der Seitenleiste.
                  const isActive = pathname === item.route; // Prüft, ob der aktuelle Pfad mit dem Link übereinstimmt.

                  return (
                    // Schließmechanismus für jedes Link-Element. Wenn man auf den Link klickt, wird das Sheet geschlossen.
                    <SheetClose asChild key={item.route}>
                      <Link
                        href={item.route} // Pfad für den Link.
                        key={item.label}
                        className={cn(
                          "flex gap-4 items-center p-4 rounded-lg w-full max-w-60", // Flex-Layout, Abstand zwischen Elementen von 4, zentrierte Elemente, Padding von 4, abgerundete Ecken, volle Breite, maximal 60px breit.
                          {
                            "bg-blue-1": isActive, // Wenn der Link aktiv ist, verwende einen blauen Hintergrund.
                          }
                        )}
                      >
                        <Image
                          src={item.imgURL}
                          alt={item.label}
                          width={20}
                          height={20}
                        />
                        <p className="font-semibold">{item.label}</p>
                      </Link>
                    </SheetClose>
                  );
                })}
              </section>
            </SheetClose>
          </div>
        </SheetContent>
      </Sheet>
    </section>
  );
};

export default MobileNav;
