import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import MobileNav from './MobileNav';
import { SignedIn, UserButton } from '@clerk/nextjs';

const Navbar: React.FC = () => {
	return (
		<nav className='flex-between fixed top-0 z-50 w-full bg-dark-1 px-6 py-4 lg:px-10'>
			{/* flex-between: Selbst definiert in globals.css. Bewirkt, dass das Yoom Logo links und der Hamburger rechts sitzt.
                fixed: Positioniert die Navbar fixiert am oberen Rand des Viewports.
                top-0: Setzt die obere Position auf 0, sodass die Navbar ganz oben ist.
                z-50: Setzt die z-Index-Ebene auf 50, um die Überlappungsreihenfolge zu steuern.
                w-full: Macht die Navbar so breit wie den Viewport.
                bg-dark-1: Wendet eine dunkle Hintergrundfarbe an, vermutlich definiert in einem CSS-Framework oder benutzerdefinierten Styles.
                px-6: Setzt den horizontalen Padding auf 6 Einheiten.
                py-4: Setzt den vertikalen Padding auf 4 Einheiten.
                lg:px-10: Erhöht den horizontalen Padding auf 10 Einheiten auf großen Bildschirmen ab 1024px */}
			<Link href='/' className='flex items-center gap-1'>
				{/* flex: Wendet Flexbox an, um Kinder nebeneinander anzuordnen.
                    items-center: Zentriert die Kinder vertikal innerhalb des Flex-Containers.
                    gap-1: Setzt einen Abstand von 1 Einheit zwischen den Kindern. */}
				<Image
					src='/icons/logo.svg'
					width={32}
					height={32}
					alt='Yoom Logo'
					className='max-sm:size-10'
				/>
				{/* max-sm:size-10: Wendet eine Größenanpassung an, vermutlich bis zu einem Breakpoint 'sm' (small). */}
				<p className='text-[26px] font-extrabold text-white max-sm:hidden'>
					{/* text-[26px]: Setzt die Textgröße auf 26px.
                        font-extrabold: Wendet eine sehr fette Schriftstärke an.
                        text-white: Setzt die Textfarbe auf Weiß.
                        max-sm:hidden: Versteckt den Text auf kleinen Bildschirmen unter 640px. */}
					Yoom
				</p>
			</Link>

			{/* Mobile Nav */}
			<div className='flex-between gap-5'>
				{/* flex-between: Selbst definiert in globals.css.
                    gap-5: Setzt einen Abstand von 5 Einheiten zwischen den Kindern. */}
				{/* Clerk User Management */}
				<SignedIn>
					<UserButton />
				</SignedIn>

				<MobileNav />
			</div>
		</nav>
	);
};

export default Navbar;
