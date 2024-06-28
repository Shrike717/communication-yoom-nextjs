import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { ClerkProvider } from '@clerk/nextjs';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
	title: 'Yoom',
	description: 'A meeting scheduling app for everyone.',
	// So füge ich ein Favicons hinzu. Es ist ein .svg dass dann keinen weissen Hintergrund hat.
	icons: {
		icon: '/icons/logo.svg',
	},
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang='en'>
			<ClerkProvider
				appearance={{
					layout: {
						// `socialButtonsVariant`: Definiert das Design der Social-Media-Buttons. 'iconButton' bedeutet, dass die Buttons als Icons dargestellt werden.
						socialButtonsVariant: 'iconButton',
						// `logoImageUrl`: Pfad zum Logo-Bild. Hier wird das Logo von der angegebenen URL geladen.
						logoImageUrl: '/icons/yoom-logo.svg',
					},
					variables: {
						// `colorText`: Definiert die Textfarbe. '#fff' ist Weiß. Dies beeinflusst alle Textelemente, sofern nicht anders angegeben.
						colorText: '#fff',
						// `colorPrimary`: Primärfarbe der Anwendung, hier in Blau (#0E78F9). Wird für wichtige Elemente wie Buttons oder Links verwendet.
						colorPrimary: '#0E78F9',
						// `colorBackground`: Hintergrundfarbe der Anwendung. Dunkelgrau (#1C1F2E) bietet einen dunklen Modus.
						colorBackground: '#1C1F2E',
						// `colorInputBackground`: Hintergrundfarbe für Eingabefelder. Ein etwas helleres Grau (#252A41) hebt Eingabefelder vom restlichen Hintergrund ab.
						colorInputBackground: '#252A41',
						// `colorInputText`: Textfarbe in Eingabefeldern. Weiß (#fff) sorgt für Kontrast und Lesbarkeit auf dem dunkleren Eingabefeldhintergrund.
						colorInputText: '#fff',
					},
				}}
			>
				<body className={`${inter.className} bg-dark-2 text-white`}>
					{children}
				</body>
			</ClerkProvider>
		</html>
	);
}
