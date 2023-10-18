import * as fs from 'fs';

const saveData = (data) => {
    const jsonData = JSON.stringify(data, null, 2);

    // Leer el contenido actual del archivo
    fs.readFile('./data.json', 'utf8', (readErr, currentData) => {
        if (readErr) {
            console.error('Error al leer data.json', readErr);
            return;
        }

        // Inicializar parsedData como un array vaci­o si el archivo esta vaci­o o no es JSON valido
        let parsedData = [];

        // Intentar analizar el contenido actual como JSON
        try {
            if (currentData.trim() !== '') {
                parsedData = JSON.parse(currentData);

                // Si el contenido actual no es un array, lo convertimos en un array
                if (!Array.isArray(parsedData)) {
                    parsedData = [parsedData];
                }
            }
        } catch (parseErr) {
            console.error('Error al analizar el JSON existente', parseErr);
            return;
        }

        // Agregar el nuevo objeto al array
        parsedData.push(data);

        // Escribir el archivo con los datos actualizados
        fs.writeFile('./data.json', JSON.stringify(parsedData, null, 2), (writeErr) => {
            if (writeErr) {
                console.error('Error al guardar en data.json', writeErr);
            } else {
                console.log('Datos agregados y guardados en data.json');
            }
        });
    });
}

export default saveData;
