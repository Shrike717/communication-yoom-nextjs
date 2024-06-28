'use client'; // Gibt an, dass dieser Code nur auf dem Client ausgeführt werden soll, nicht auf dem Server.
import { ReactNode } from 'react'; // Importiert den Typ ReactNode aus React für die Verwendung in den Props.
import { Dialog, DialogContent } from './ui/dialog'; // Importiert Dialog und DialogContent Komponenten für modale Dialoge.
import { cn } from '@/lib/utils'; // Importiert eine Hilfsfunktion zur Klassenname-Zusammenführung.
import { Button } from './ui/button'; // Importiert die Button-Komponente für wiederverwendbare Buttons.
import Image from 'next/image'; // Importiert die Image-Komponente von Next.js für optimierte Bilder.

// Definiert die Props, die die MeetingModal-Komponente erwartet.
interface MeetingModalProps {
	isOpen: boolean; // Bestimmt, ob das Modal geöffnet ist.
	onClose: () => void; // Funktion, die aufgerufen wird, um das Modal zu schließen.
	title: string; // Der Titel des Modals.
	className?: string; // Optionale zusätzliche CSS-Klassen für den Titel.
	children?: ReactNode; // Optionale Kinder-Elemente, die innerhalb des Modals gerendert werden.
	handleClick?: () => void; // Optionale Funktion, die beim Klicken des Buttons aufgerufen wird.
	buttonText?: string; // Optionaler Text für den Button.
	instantMeeting?: boolean; // Optionales Flag, das für sofortige Meetings verwendet werden könnte.
	image?: string; // Optionaler Bildpfad für ein Bild im Modal.
	buttonClassName?: string; // Optionale zusätzliche CSS-Klassen für den Button.
	buttonIcon?: string; // Optionaler Bildpfad für ein Icon im Button.
}

const MeetingModal = ({
	isOpen,
	onClose,
	title,
	className,
	children,
	handleClick,
	buttonText,
	instantMeeting,
	image,
	buttonClassName,
	buttonIcon,
}: MeetingModalProps) => {
	return (
		<Dialog open={isOpen} onOpenChange={onClose}>
			{/* Rendert ein Dialog-Element, das geöffnet oder geschlossen werden
			kann. */}
			<DialogContent className='flex w-full max-w-[520px] flex-col gap-6 border-none bg-dark-1 px-6 py-9 text-white'>
				{/* Dialog-Inhalt mit Styling. */}
				{/* flex: Aktiviert Flexbox-Layout. */}
				{/* w-full: Breite ist 100% des Elternelements. */}
				{/* max-w-[520px]: Maximale Breite ist 520px. */}
				{/* flex-col: Elemente werden in einer Spalte angeordnet. */}
				{/* gap-6: Abstand von 6 Einheiten zwischen den Elementen. */}
				{/* border-none: Kein Rand. */}
				{/* bg-dark-1: Dunkler Hintergrund (benutzerdefinierte Klasse). */}

				<div className='flex flex-col gap-6'>
					{/* Container für den Inhalt mit Flexbox-Layout. */}
					{image && (
						<div className='flex justify-center'>
							{/* Container für das Bild, zentriert. */}
							<Image
								src={image}
								alt='checked'
								width={72}
								height={72}
							/>

							{/* Bildkomponente mit Quelle, Alternativtext und
							Größe. */}
						</div>
					)}
					<h1
						className={cn(
							'text-3xl font-bold leading-[42px]',
							className
						)} // Titel mit dynamischen und festen Stilklassen.
						// text-3xl: Schriftgröße 3xl.
						// font-bold: Fette Schrift.
						// leading-[42px]: Zeilenhöhe von 42px.
					>
						{title}
					</h1>

					{/* Rendert Kind Elemente, wenn vorhanden */}
					{children}
					<Button
						className={
							'bg-blue-1 focus-visible:ring-0 focus-visible:ring-offset-0'
						} // Button mit Styling.
						// bg-blue-1: Hintergrundfarbe Blau (benutzerdefinierte Klasse).
						// focus-visible:ring-0: Kein Fokus-Ring.
						// focus-visible:ring-offset-0: Kein Fokus-Ring-Offset.
						onClick={handleClick} // Funktion, die beim Klicken aufgerufen wird.
					>
						{/* Optional: Bildkomponente für das Button-Icon. */}
						{buttonIcon && (
							<Image
								src={buttonIcon}
								alt='button icon'
								width={13}
								height={13}
							/>
						)}
						&nbsp;
						{/* Wenn wir ein Icon für den Button haben, müssen wir einen kleinen Abstand zwischen Icon und Text im Button haben */}
						{buttonText || 'Schedule Meeting'}
					</Button>
				</div>
			</DialogContent>
		</Dialog>
	);
};

export default MeetingModal;
