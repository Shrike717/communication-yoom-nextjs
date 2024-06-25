import { Metadata } from 'next';
import { Inter } from 'next/font/google';
import React, { ReactNode } from 'react';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
	title: 'Create Next App',
	description: 'Generate a new Next.js project in seconds.',
};

const RootLayout: React.FC<{ children: ReactNode }> = ({ children }) => {
	return (
		<html lang='en'>
			<body className={`${inter.className} bg-dark-2 text-white`}>
				<main>{children}</main>;
			</body>
		</html>
	);
};

export default RootLayout;
