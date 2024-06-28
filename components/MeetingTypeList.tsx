'use client'; // Gibt an, dass dieser Code auf dem Client ausgeführt wird, nicht auf dem Server.
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import HomeCard from './HomeCard';

// Diese Komponente rendert eine Liste von Meeting-Typen, die der Benutzer erstellen oder beitreten kann.
const MeetingTypeList = () => {
	// Das ist der Router-Hook, der verwendet wird, um den Benutzer auf eine andere Seite weiterzuleiten.
	const router = useRouter();

	// Das ist das MeetingState, das den aktuellen Status des Meetings speichert.
	// Es wird verwendet, um zu bestimmen, welcher Typ von Meeting erstellt wird.
	// Mit TypeScript können wir den Typ der Variablen deklarieren, um sicherzustellen, dass sie nur bestimmte Werte annehmen kann.
	const [meetingState, setMeetingState] = useState<
		| 'isScheduleMeeting'
		| 'isJoiningMeeting'
		| 'isInstantMeeting'
		| undefined
	>();

	return (
		<section className='grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-4'>
			{/*
              Erstellt einen Abschnitt mit einer Grid-Layout.
              - 'grid': Aktiviert das Grid-Layout.
              - 'grid-cols-1': Definiert eine Spalte für Viewports unter 768px Breite.
              - 'gap-5': Setzt den Abstand zwischen den Grid-Elementen auf 1.25rem (20px).
              - 'md:grid-cols-2': Definiert zwei Spalten für Viewports ab 768px Breite.
              - 'xl:grid-cols-4': Definiert vier Spalten für Viewports ab 1280px Breite.
            */}
			<HomeCard
				img='/icons/add-meeting.svg' // Pfad zum Bild des Elements.
				title='New Meeting' // Titel des Elements.
				description='Start an instant meeting' // Beschreibung des Elements.
				className='bg-orange-1' // Fügt eine Hintergrundfarbe hinzu. Spezifische Farbe wird in CSS definiert.
				handleClick={() => setMeetingState('isInstantMeeting')} // Funktion, die aufgerufen wird, wenn auf das Element geklickt wird.
			/>
			<HomeCard
				img='/icons/join-meeting.svg'
				title='Join Meeting'
				description='via invitation link'
				className='bg-blue-1' // Fügt eine blaue Hintergrundfarbe hinzu. Spezifische Farbe wird in CSS definiert.
				handleClick={() => setMeetingState('isJoiningMeeting')}
			/>
			<HomeCard
				img='/icons/schedule.svg'
				title='Schedule Meeting'
				description='Plan your meeting'
				className='bg-purple-1' // Fügt eine lila Hintergrundfarbe hinzu. Spezifische Farbe wird in CSS definiert.
				handleClick={() => setMeetingState('isScheduleMeeting')}
			/>
			<HomeCard
				img='/icons/recordings.svg'
				title='View Recordings'
				description='Meeting Recordings'
				className='bg-yellow-1' // Fügt eine gelbe Hintergrundfarbe hinzu. Spezifische Farbe wird in CSS definiert.
				handleClick={() => router.push('/recordings')} // Leitet den Benutzer zur Seite '/recordings' weiter.
			/>
		</section>
	);
};

export default MeetingTypeList;
