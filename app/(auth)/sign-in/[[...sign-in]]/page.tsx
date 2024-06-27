import { SignIn } from '@clerk/nextjs'; // Importiert die SignIn-Komponente von @clerk/nextjs für die Authentifizierung.
import React from 'react'; // Importiert React, eine Bibliothek für den Aufbau von Benutzeroberflächen.

// Definiert eine funktionale Komponente namens SignInPage.
const SignInPage = () => {
	return (
		// Erstellt einen Hauptcontainer für die SignIn-Seite.
		<main className='flex h-screen w-full items-center justify-center'>
			{/* Die CSS-Klassen bedeuten folgendes:
          'flex': Wendet Flexbox-Layout an, um Inhalte flexibel zu positionieren.
          'h-screen': Setzt die Höhe des Containers auf 100% der Viewporthöhe.
          'w-full': Setzt die Breite des Containers auf 100% der Viewportbreite.
          'items-center': Zentriert die Inhalte vertikal im Flex-Container.
          'justify-center': Zentriert die Inhalte horizontal im Flex-Container.
          Diese Kombination von Klassen zentriert die SignIn-Komponente sowohl vertikal als auch horizontal auf der Seite. */}
			<SignIn />{' '}
			{/* Fügt die SignIn-Komponente ein, die das Anmeldeformular bereitstellt. */}
		</main>
	);
};

export default SignInPage; // Exportiert SignInPage für die Verwendung in anderen Teilen der Anwendung.
