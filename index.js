const express = require("express");
const mongoose = require("mongoose");

// Conexión a la base de datos mongodb
mongoose.connect("mongodb://localhost:27017/userscoursesdb")
  .then(() => console.log("Conectado a MongoDB..."))
  .catch(err => console.log("No se pudo conectar con MongoDB...", err));

// Middleware
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log("API REST Ok, y ejecutándose...");
});