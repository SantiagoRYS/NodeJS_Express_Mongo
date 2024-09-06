require('dotenv').config();

const express = require ('express');
const https = require ('https');
const fs = require ('fs');
const path =require ('path');
const mongoose = require('mongoose');
const cors = require ('cors'); //importa el middleware de CORS
const { swaggerUi, swaggerSpec } = require('./swagger/swagger'); // Importa Swagger

// Importa las rutas
const usuarios = require('./routes/usuario_route');
const cursos = require('./routes/curso_route');

const connection = process.env.conexion;

mongoose.connect(connection)
  .then(() => console.log('Conectando a MongoDB...'))
  .catch(err => console.log('No se pudo conectar con MongoDB...', err));

//middle
const app = express();

// Configurar CORS
//app.use(cors()); // Habilita CORS con configuración predeterminada

const corsOptions = {
  origin: '*', // Reemplaza con el dominio permitido
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'], // Métodos permitidos
  allowedHeaders: ['Content-Type', 'Authorization'], // Encabezados permitidos
};

app.use(cors(corsOptions)); // Habilita CORS con las opciones específicas
app.options('*', cors(corsOptions)); //Enabling CORS Pre-Flight

// Rutas de Swagger
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Cargar el certificado SSL y la clave privada
const options = {
  key: fs.readFileSync(path.join(__dirname, 'ssl', 'privatekey.pem')),
  cert: fs.readFileSync(path.join(__dirname, 'ssl', 'certificate.pem')),
};


app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Monta las rutas
app.use('/api/usuarios', usuarios);
app.use('/api/cursos', cursos);

const port = process.env.PORT || 3000;
https.createServer(options, app).listen(port, () => {
  console.log('Servidor HTTPS corriendo en https://localhost:3000');
  console.log('Api REST Ok, y ejecutándose...');
});

