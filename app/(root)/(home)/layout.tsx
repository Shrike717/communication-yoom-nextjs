import React from 'react';
import Navbar from '@/components/Navbar';
import Sidebar from '@/components/Sidebar';

const HomeLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
	return (
		// Der Hauptcontainer des Layouts, positioniert seine Kinder relativ zu ihm.
		<main className='relative'>
			{/* Fügt die Navigationsleiste am oberen Rand ein */}
			<Navbar />
			<div className='flex'>
				{/* Fügt die Seitenleiste am linken Rand ein. */}
				<Sidebar />
				{/* Hauptinhalt-Bereich, der flexibel den verbleibenden Platz einnimmt.
                    'min-h-screen': Stellt sicher, dass der Bereich mindestens so hoch wie der Bildschirm ist.
                    'flex-1': Erlaubt dem Element, den verfügbaren Platz im Flex-Container einzunehmen.
                    'max-md:pb-14': Wirkt nur für iewportbrreiten von 768 und kleiner.
                    'sm:px-14': Breakpoint auf Viewports mit einer Mindestbreite von 640px. Stile, die mit diesem Präfix versehen sind, werden also nur auf Bildschirmen angewendet, deren Breite 640px oder mehr beträgt. */}
				<section className='flex min-h-screen flex-1 flex-col px-6 pb-6 pt-28 max-md:pb-14 sm:px-14'>
					{/* Container für den Seiteninhalt, nimmt die volle Breite seines Elternelements ein. */}
					<div className='w-full'>{children}</div>
				</section>
			</div>
		</main>
	);
};

export default HomeLayout;
