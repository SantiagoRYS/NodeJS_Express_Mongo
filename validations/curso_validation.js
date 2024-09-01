const Joi = require('@hapi/joi');

// Validaciones para el objeto curso
const schema = Joi.object({
    titulo: Joi.string()
      .min(3)
      .max(100)
      .required()
      .pattern(/^[A-Za-záéíóúñÁÉÍÓÚÑ0-9 ]{3,100}$/),
  
    descripcion: Joi.string()
      .max(500)
      .allow(''),
  
    alumnos: Joi.number()
      .integer()
      .min(0) 
      .default(0),
  
    calificacion: Joi.number()
      .min(1)
      .max(10)
      .default(0)
  });

  module.exports = schema;