'use client';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { sidebarLinks } from '@/constants';
import { cn } from '@/lib/utils';

// In dieser Komponente handeln wir die ganzen Routes auf der linken Seite.
const Sidebar = () => {
	// Dieser Hook gibt uns den Pfadnamen der aktuellen Seite zurück.
	// Da wir einen Hook einsetzen, müssen wir die Komponente auf use client setzen.
	const pathname = usePathname();

	return (
		<section className='sticky left-0 top-0 flex h-screen w-fit flex-col  justify-between  bg-dark-1 p-6 pt-28 text-white max-sm:hidden lg:w-[264px]'>
			{/*
            - `sticky`: Die Komponente bleibt beim Scrollen an ihrer Position.
            - `left-0 top-0`: Positioniert die Komponente ganz links oben.
            - `flex h-screen`: Die Komponente nimmt die volle Bildschirmhöhe ein und verwendet Flexbox.
            - `w-fit`: Die Breite der Komponente passt sich ihrem Inhalt an.
            - `flex-col`: Die Flex-Items werden vertikal gestapelt.
            - `justify-between`: Verteilt die Flex-Items gleichmäßig im Container, mit dem ersten Item am Anfang und dem letzten am Ende.
            - `bg-dark-1`: Setzt die Hintergrundfarbe.
            - `p-6 pt-28`: Setzt den Innenabstand (Padding) auf allen Seiten auf 6 und oben auf 28.
            - `text-white`: Setzt die Textfarbe auf Weiß.
            - `max-sm:hidden`: Versteckt die Komponente auf kleinen Bildschirmen unter 640px.
            - `lg:w-[264px]`: Setzt die Breite auf 264px auf großen Bildschirmen ab 1024px.
            */}
			<div className='flex flex-1 flex-col gap-6'>
				{/*
                - `flex flex-1`: Die Komponente nimmt den verfügbaren Platz ein und verwendet Flexbox.
                - `flex-col`: Die Flex-Items werden vertikal gestapelt.
                - `gap-6`: Setzt den Abstand zwischen den Flex-Items auf 6.
                */}
				{sidebarLinks.map((item) => {
					// Hier wird geprüft, ob der Pfadname mit dem Pfadnamen des Items übereinstimmt. Das wird dann als aktive Klasse hinzugefügt.
					const isActive =
						// Hier wird geprüft, ob der Pfadname mit dem Pfadnamen des Items übereinstimmt.
						pathname === item.route ||
						// startsWith() prüft, ob der Pfadname mit dem Pfadnamen des Items übereinstimmt.
						pathname.startsWith(`${item.route}/`);

					return (
						<Link
							href={item.route} // Hier wird der Pfadname des Items als href verwendet.
							key={item.label}
							// cn() ist eine Hilfsfunktion, die uns hilft, Klassenbedingungen zu erstellen.
							// Konkret prüft sie, ob isActive true ist, und fügt nur dann die Klasse hinzu.
							className={cn(
								'flex gap-4 items-center p-4 rounded-lg justify-start',
								{
									'bg-blue-1': isActive,
								}
							)}
						>
							{/*
                            - `flex gap-4 items-center`: Verwendet Flexbox, setzt den Abstand zwischen den Items auf 4 und zentriert die Items vertikal.
                            - `p-4`: Setzt den Innenabstand (Padding) auf allen Seiten auf 4.
                            - `rounded-lg`: Setzt abgerundete Ecken.
                            - `justify-start`: Platziert die Items am Anfang des Containers.
                            - `bg-blue-1`: Setzt die Hintergrundfarbe auf Blau, wenn das Item aktiv ist.
                            */}
							<Image
								src={item.imgURL}
								alt={item.label}
								width={24}
								height={24}
							/>
							{/* Das Bild des Links */}
							<p className='text-lg font-semibold max-lg:hidden'>
								{/*
                                - `text-lg`: Setzt die Textgröße auf groß.
                                - `font-semibold`: Setzt die Schriftstärke auf halbfett.
                                - `max-lg:hidden`: Versteckt den Text ab einer Breite kleiner als 1024px.
                                */}
								{item.label}
							</p>
						</Link>
					);
				})}
			</div>
		</section>
	);
};

export default Sidebar;
