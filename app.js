import express from 'express';
import saveData from './utility/savefile.js';
import * as fs from 'fs/promises'

const app = express();
const PORT = 2698;
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Endpoint para recibir datos
app.post('/info-totem', (req, res) => {
    const { body } = req;
    if (!body) {
        return res.status(400).json({ error: 'Cuerpo de solicitud ausente' });
    }
    const expectedKeys = ['id','hostname', 'CPU', 'Memoria', 'Direccion IP', 'URL'];
    const missingKeys = expectedKeys.filter(key => !(key in body));
    if (missingKeys.length > 0) {
        return res.status(400).json({ error: `Faltan las siguientes claves en el cuerpo de la solicitud: ${missingKeys.join(', ')}` });
    }
    saveData(body);
    res.status(200).json({ success: 'Solicitud procesada con éxito' });
});

app.get('/info-totem', async (req, res) => {
    try {
        const data = await fs.readFile('./data.json', 'utf8');
        const jsonData = JSON.parse(data);
        res.status(200).json(jsonData);

    } catch (error) {
        console.error('Error al leer el archivo JSON', error);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
});

app.post('/delete', async (req, res) => {
    const { body } = req;

    if (body.msn === 'sucess' && body.key === 'r9#cxnOE11') {
        try {
            await fs.writeFile('./data.json', '[]', 'utf8');
            res.status(200).json({ success: 'Datos eliminados con éxito' });
        } catch (error) {
            console.error('Error al limpiar el archivo JSON', error);
            res.status(500).json({ error: 'Error interno del servidor' });
        }
    } else {
        res.status(403).json({ error: 'Credenciales inválidas' });
    }
});
app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto: ${PORT}`);
});
