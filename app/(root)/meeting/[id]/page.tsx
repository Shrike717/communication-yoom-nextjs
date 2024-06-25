// Importiert React von der React-Bibliothek
import React from 'react';

// Definiert eine Komponente namens Meeting, die Props als Argument erhält.
// Die Props enthalten ein Objekt namens params, welches wiederum eine Eigenschaft id vom Typ string hat.
const Meeting = ({ params }: { params: { id: string } }) => {
	// Gibt ein JSX-Element zurück, das eine div mit dem Text "Meeting Room: #" und der id aus den Props darstellt.
	return <div>Meeting Room: #{params.id}</div>;
};

// Exportiert die Meeting-Komponente als Standardmodul, damit sie in anderen Dateien verwendet werden kann.
export default Meeting;
