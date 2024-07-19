import express from 'express';
import helmet from "helmet";
import cors from "cors";
import fs from 'fs';
import https from 'https';

import router from './src/routes/router.js';

import catch404errors from "./src/middlewares/catch404errors.js";
import catchAllErrors from "./src/middlewares/catchAllErrors.js";

const app = express();

app.use(helmet()); //sécurité
app.use(express.json()); //parse les données json
app.use(express.urlencoded({ extended: false })); //parse les données provenant de formulaire

// Configuration de CORS avec des options spécifiques
const corsOptions = {
  origin: 'http://localhost:3000', // autorise seulement cette origine
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true // autorise les envois de cookies
};

app.use(cors(corsOptions)); // applique les options de CORS
app.options('*', cors(corsOptions)); // pour les requêtes prévol

app.use('/api', router);

app.get('/api/', (req, res) => {
  res.json({'message': 'Welcome on config API'});
})

app.use(catch404errors);
app.use(catchAllErrors);

// Lisez les fichiers de certificat SSL
const privateKey = fs.readFileSync('certs/key.pem', 'utf8');
const certificate = fs.readFileSync('certs/cert.pem', 'utf8');
const credentials = { key: privateKey, cert: certificate };

// Créez un serveur HTTPS
const httpsServer = https.createServer(credentials, app);

// Démarrez le serveur HTTPS
export default httpsServer;