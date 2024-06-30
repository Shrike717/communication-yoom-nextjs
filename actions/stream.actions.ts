"use server";

import { currentUser } from "@clerk/nextjs/server";
import { StreamClient } from "@stream-io/node-sdk";

// Hier holen wir den API Key aus den Umgebungsvariablen:
const apiKey = process.env.NEXT_PUBLIC_STREAM_API_KEY;
// Hier holen wir uns im Server, unser Secret Key für den Stream Client:
const apiSecret = process.env.STREAM_SECRET_KEY;

// Diese asynchrone Funktion erstellt uns den Token von Stream, den wir für den Client brauchen
export const tokenProvider = async () => {
  // Hier holen wir uns die ID des eingeloggten Users von Clerk:
  const user = await currentUser();

  // Fail Safes:
  if (!user) throw new Error("User is not logged in");
  if (!apiKey) throw new Error("No Stream API Key provided");
  if (!apiSecret) throw new Error("No Stream API Secret Key provided");

  // Hier erstellen wir jetzt einen so genannten Stream Client. Dieser muss von NodeJS kommen, da wir auf der Server Seite sind.
  // Wären wie in einer normalen React App müssten wir dafür einen Node Express Server aufsetzen. WAberar in NextJS geht das mit dem Next Server aus einer Hand.
  // Wir müssen dafür dieses npm stream-io/node-sdk Paket installieren
  const client = new StreamClient(apiKey, apiSecret);

  // Für die Tortenerstellung brauchen wir noch diese zwei Dinger
  // Zuerst brauchen wir für den Token ein Verfallsdatum
  const exp = Math.round(new Date().getTime() / 1000) + 60 * 60; // Hier setzen wir das Verfallsdatum auf eine Stunde in der Zukunft
  // Als Nächstes müssen wir herausfinden, wann der Token erstellt wurde:
  const issued = Math.floor(new Date().getTime() / 1000) - 60; // Hier setzen wir das Erstellungsdatum auf eine Minute in der Vergangenheit

  // Jetzt können wir den Token erstellen:
  const token = client.createToken(user.id, exp, issued);

  // Jetzt geben wir den Token zurück:
  console.log("[action tokenProvider] token: ", typeof token);
  return token;
};
