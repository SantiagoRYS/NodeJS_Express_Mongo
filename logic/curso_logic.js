const Curso =  require('../models/curso_model');
const Joi = require('@hapi/joi');

// Validaciones para el objeto curso
const Schema = Joi.object({
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

//Funcin asincrona para crear cursos
async function crearCurso(body){
    let curso = new Curso({
        titulo  :body.titulo,
        descripcion : body.descripcion,
        alumnos     : body.alumnos,
        calificacion : body.calificacion
    })
    return await curso.save();
}

//Funcion asincrona para actualizar cursos
async function actualizarCurso(id, body){
    let curso = await Curso.findByIdAndUpdate(id,{
        $set:{
            titulo: body.titulo,
            descripcion: body.descripcion
        }
    },{new:true});
return curso;
}

//Funcion asincrona para Desacticar cursos
async function desactivarCurso(id){
    let curso = await Curso.findByIdAndUpdate(id,{
        $set:{
            estado:false
        }
    },{new:true});
return curso;
}

//Funcion asincrona para listar los cursos activos
async function listarCursosActivos() {
    let cursos = await Curso.find({"estado": true});
    return cursos;
    
}

module.exports={
    Schema,
    crearCurso,
    actualizarCurso,
    desactivarCurso,
    listarCursosActivos
}