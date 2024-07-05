"use client";

import { useUser } from "@clerk/nextjs";
import { useStreamVideoClient } from "@stream-io/video-react-sdk";
import { useRouter } from "next/navigation";

import { useGetCallById } from "@/hooks/useGetCallById";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";

// Hier erstellen wir eine wiederverwenbare Tabelle, die die Informationen über das Meeting anzeigt
const Table = ({
  title,
  description,
}: {
  title: string;
  description: string;
}) => {
  return (
    <div className="flex flex-col items-start gap-2 xl:flex-row">
      <h1 className="text-base font-medium text-sky-1 lg:text-xl xl:min-w-32">
        {title}:
      </h1>
      <h1 className="truncate text-sm font-bold max-sm:max-w-[320px] lg:text-xl">
        {description}
      </h1>
    </div>
  );
};

const PersonalRoom = () => {
  const router = useRouter(); // Hier holen wir uns den Router, um den User zu der Meeting Seite zu leiten
  const { user } = useUser(); // Hier holen wir uns den User, um die User ID zu bekommen
  const client = useStreamVideoClient(); // Hier holen wir uns den Stream Client, um den Call zu starten
  const { toast } = useToast();

  const meetingId = user?.id; // Hier setzen wir die Meeting ID auf die User ID

  const { call } = useGetCallById(meetingId!); // Hier holen wir uns den Call, um zu überprüfen, ob es schon einen Call gibt

  // Hier erstellen wir eine Funktion, die den Call startet
  const startRoom = async () => {
    if (!client || !user) return; // Fail safe, falls der Client oder der User nicht existiert

    const newCall = client.call("default", meetingId!); // Hier erstellen wir einen neuen Call mit der Meeting ID des Users

    // Hier überprüfen wir, ob es schon einen Call gibt. Wenn nicht, erstellen wir einen neuen
    if (!call) {
      await newCall.getOrCreate({
        data: {
          starts_at: new Date().toISOString(), // Hier setzen wir das Startdatum auf das aktuelle Datum
        },
      });
    }

    router.push(`/meeting/${meetingId}?personal=true`); // Hier leiten wir den User zur Meeting Seite
  };

  const meetingLink = `${process.env.NEXT_PUBLIC_BASE_URL}/meeting/${meetingId}?personal=true`; // Hier erstellen wir den Link, den der User kopieren kann

  return (
    <section className="flex size-full flex-col gap-10 text-white">
      <h1 className="text-xl font-bold lg:text-3xl">Personal Meeting Room</h1>
      {/* Das ist das Div für die Text Zeilen */}
      <div className="flex w-full flex-col gap-8 xl:max-w-[900px]">
        <Table title="Topic" description={`${user?.username}'s meeting room`} />
        {/* Da dieser Raum für den User personalisiert ist, nehmen wir die User ID statt die zuvor eine selbst erzeugte ID. Mit dem ! Sagen wir Type Skript: Alles ok damit */}
        <Table title="Meeting ID" description={meetingId!} />
        <Table title="Invite Link" description={meetingLink} />
      </div>
      {/* Das ist das Div für die Buttons */}
      <div className="flex gap-5">
        <Button className="bg-blue-1" onClick={startRoom}>
          Start Meeting
        </Button>
        <Button
          className="bg-dark-3"
          onClick={() => {
            navigator.clipboard.writeText(meetingLink);
            toast({
              title: "Link Copied",
            });
          }}
        >
          Copy Invitation
        </Button>
      </div>
    </section>
  );
};

export default PersonalRoom;
