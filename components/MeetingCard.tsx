"use client";

import Image from "next/image";

import { cn } from "@/lib/utils";
import { Button } from "./ui/button";
import { avatarImages } from "@/constants";
import { useToast } from "./ui/use-toast";

interface MeetingCardProps {
  title: string;
  date: string;
  icon: string;
  isPreviousMeeting?: boolean;
  buttonIcon1?: string;
  buttonText?: string;
  handleClick: () => void;
  link: string;
}

const MeetingCard = ({
  icon,
  title,
  date,
  isPreviousMeeting,
  buttonIcon1,
  handleClick,
  link,
  buttonText,
}: MeetingCardProps) => {
  const { toast } = useToast();

  return (
    // "min-h-[258px]": Setzt die minimale Höhe des Elements auf 258 Pixel.
    // "w-full": Setzt die Breite des Elements auf 100% des Elternelements.
    // "flex-col": Ordnet die Kinder-Elemente in einer vertikalen Spalte an.
    // "justify-between": Verteilt die Kinder-Elemente gleichmäßig im Container, mit dem ersten Element am Anfang und dem letzten am Ende.
    // "xl:max-w-[568px]": Setzt die maximale Breite des Elements auf 568 Pixel, aber nur auf Bildschirmen der Größe "xl" und größer.
    <section className="flex min-h-[258px] w-full flex-col justify-between rounded-[14px] bg-dark-1 px-5 py-8 xl:max-w-[568px]">
      <article className="flex flex-col gap-5">
        <Image src={icon} alt="upcoming" width={28} height={28} />
        <div className="flex justify-between">
          <div className="flex flex-col gap-2">
            <h1 className="text-2xl font-bold">{title}</h1>
            <p className="text-base font-normal">{date}</p>
          </div>
        </div>
      </article>
      <article className={cn("flex justify-center relative", {})}>
        {/*
        // Hier sitzen Avatar Bilder
        // "relative": Positioniert das Element relativ, ermöglicht die Positionierung von untergeordneten Elementen absolut in Bezug auf dieses Element.
        // "max-sm:hidden": Versteckt das Element auf Bildschirmen, die kleiner als die "sm" (small) Breakpoint sind. sm ist 640px
        */}
        <div className="relative flex w-full max-sm:hidden">
          {avatarImages.map((img, index) => (
            <Image
              key={index}
              src={img}
              alt="attendees"
              width={40}
              height={40}
              className={cn("rounded-full", { absolute: index > 0 })}
              style={{ top: 0, left: index * 28 }}
            />
          ))}
          <div className="flex-center absolute left-[136px] size-10 rounded-full border-[5px] border-dark-3 bg-dark-4">
            +5
          </div>
        </div>
        {/* Wenn das Meeting keines ist, was schon beendet wurde, zeigen wir die Buttons */}
        {!isPreviousMeeting && (
          <div className="flex gap-2">
            {/* Das ist der Button, um das Meeting oder das Recordng zu starten */}
            <Button onClick={handleClick} className="rounded bg-blue-1 px-6">
              {buttonIcon1 && ( // Hier wird das Icon angezeigt, wenn es existiert. Das ist nur der Fall, wenn es ein Recording ist
                <Image src={buttonIcon1} alt="feature" width={20} height={20} />
              )}
              &nbsp; {buttonText}
            </Button>
            {/* Das ist der Button, um den Link zu kopieren */}
            <Button
              onClick={() => {
                navigator.clipboard.writeText(link); // Hier kopieren wir den Link in die Zwischenablage Um ihn vor den Start des Meetings an Teilnehmer verschicken zu können
                toast({
                  title: "Link Copied",
                });
              }}
              className="bg-dark-4 px-6"
            >
              {/* Das ist das kleine Icon im Button */}
              <Image
                src="/icons/copy.svg"
                alt="feature"
                width={20}
                height={20}
              />
              &nbsp; Copy Link
            </Button>
          </div>
        )}
      </article>
    </section>
  );
};

export default MeetingCard;
