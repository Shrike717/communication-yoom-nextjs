import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server';

// Hier definieren wir die Routes, die wir schützen möchten.
const protectedRoute = createRouteMatcher([
	'/',
	'/upcoming',
	'/meeting(.*)',
	'/previous',
	'/recordings',
	'/personal-room',
]);

export default clerkMiddleware((auth, req) => {
	if (protectedRoute(req)) auth().protect(); // Verwendet die geschützten Routes und aktiviert den Schutz, wenn die Anfrage einer der definierten Routes entspricht.
});

export const config = {
	matcher: ['/((?!.*\\..*|_next).*)', '/', '/(api|trpc)(.*)'], // Definiert Muster für Routes, die von diesem Middleware behandelt werden sollen.
};
