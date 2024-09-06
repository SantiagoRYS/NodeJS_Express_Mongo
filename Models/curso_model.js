const mongoose = require('mongoose');

const cursoSchema = new mongoose.Schema({
  titulo: {
    type: String,
    required: true
  },
  descripcion: {
    type: String,
    required: false
  },
  estado: {
    type: Boolean,
    default: true
  },
  imagen: {
    type: String,
    required: false
  },
  alumnos: {
    type: [String],
    required: false
  },
  calificacion: {
    type: Number,
    default: 0
  }
});

module.exports = mongoose.model('Curso', cursoSchema);