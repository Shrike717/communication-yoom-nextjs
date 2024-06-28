import { cn } from '@/lib/utils';
import Image from 'next/image'; // Importiert die Image-Komponente von Next.js für optimierte Bilder.

interface HomeCardProps {
	// Definiert die Typen der Eigenschaften, die HomeCard akzeptiert.
	className: string; // CSS-Klassenname für Styling.
	img: string; // Bild-URL.
	title: string; // Titel des HomeCard-Elements.
	description: string; // Beschreibung des HomeCard-Elements.
	handleClick: () => void; // Funktion, die beim Klicken auf das Element aufgerufen wird. Die handleClick Funktion wird als void definiert, weil sie in diesem Kontext eine Aktion ausführt (z.B. das Öffnen eines Dialogs, das Navigieren zu einer anderen Seite oder das Aktualisieren eines Zustands), ohne einen Wert zurückzugeben. In TypeScript bedeutet void, dass eine Funktion keinen Rückgabewert hat, was hier angibt, dass der Hauptzweck der Funktion in ihrer Seiteneffekt ist (z.B. eine Zustandsänderung oder Navigation), nicht in der Rückgabe eines Wertes.
}

// Diese Komponente rendert eine Karte für die Startseite, die ein Bild, einen Titel und eine Beschreibung enthält.
const HomeCard = ({
	className,
	img,
	title,
	description,
	handleClick,
}: HomeCardProps) => {
	// Komponentenfunktion mit Destructuring der Props.
	return (
		// Die Funktion cn (häufig als Abkürzung für classnames verwendet) wird hier eingesetzt, um bedingt Klassen zusammenzuführen und zu verwalten. In diesem spezifischen Fall kombiniert sie eine festgelegte Liste von Klassen mit zusätzlichen Klassen, die über die className-Prop übergeben werden.
		// Die festgelegten Klassen definieren das grundlegende Styling des Elements, wie Hintergrundfarbe, Padding, Flexbox-Layout, maximale Breite, minimale Höhe, abgerundete Ecken und den Cursor-Stil. Die className-Prop ermöglicht es, dieses Styling dynamisch zu erweitern oder anzupassen, indem zusätzliche Klassen hinzugefügt werden, ohne die ursprünglichen Klassen zu überschreiben.
		// Zusammengefasst ermöglicht cn hier eine flexible Styling-Strategie, bei der standardmäßige Stile durch die Komponenten-Props erweitert oder modifiziert werden können.
		<div
			className={cn(
				'bg-orange-1 px-4 py-6 flex flex-col justify-between w-full xl:max-w-[270px] min-h-[260px] rounded-[14px] cursor-pointer',
				className
			)}
			onClick={handleClick}
		>
			{/*
              Haupt-Container:
              - `${className}`: Übernimmt den übergebenen Klassennamen für spezifisches Styling.
              - `px-4 py-6`: Setzt horizontalen und vertikalen Padding.
              - `flex flex-col`: Aktiviert Flexbox mit vertikaler Ausrichtung der Kinder.
              - `justify-between`: Verteilt die Kinder gleichmäßig im Container, mit Platz dazwischen.
              - `w-full`: Breite nimmt den gesamten verfügbaren Platz ein.
              - `xl:max-w-[270px]`: Maximale Breite von 270px für Viewports über 1280px Breite.
              - `min-h-[260px]`: Minimale Höhe von 260px.
              - `rounded-[14px]`: Abgerundete Ecken mit einem Radius von 14px.
              - `cursor-pointer`: Ändert den Cursor zu einem Zeiger, um Klickbarkeit anzuzeigen.
            */}
			<div className='flex justify-center items-center glassmorphism size-12 rounded-[10px]'>
				{/*
                  Bild-Container:
                  - `flex justify-center items-center`: Zentriert das Bild sowohl horizontal als auch vertikal.
                  - `glassmorphism`: Spezifischer Stil für Glas-Effekt, definiert in CSS.
                  - `size-12`: Spezifische Größe, definiert in CSS.
                  - `rounded-[10px]`: Abgerundete Ecken mit einem Radius von 10px.
                */}
				<Image src={img} alt={title} width={27} height={27} />
				{/* Bild-Element mit dynamischen Quellen- und Alt-Text. */}
			</div>
			<div className='flex flex-col gap-2'>
				{/*
                  Text-Container:
                  - `flex flex-col`: Aktiviert Flexbox mit vertikaler Ausrichtung der Kinder.
                  - `gap-2`: Setzt einen Abstand von 0.5rem (8px) zwischen den Kind-Elementen.
                */}
				<h1 className='text-2xl font-bold'>{title}</h1>
				{/* Titel-Element: Große, fettgedruckte Schrift. */}
				<p className='text-lg font-normal'>{description}</p>
				{/* Beschreibungs-Element: Große, normale Schrift. */}
			</div>
		</div>
	);
};

export default HomeCard; // Exportiert die Komponente für die Verwendung in anderen Teilen der Anwendung.
