const Curso = require('../models/curso_model');

// Función asíncrona para crear un curso
async function crearCurso(body) {
    try {
        // Verificar si el título ya existe
        let cursoExistente = await Curso.findOne({ titulo: body.titulo });
        if (cursoExistente) {
            throw new Error('El título del curso ya está en uso.');
        }

        let curso = new Curso({
            titulo: body.titulo,
            descripcion: body.descripcion,
            alumnos: body.alumnos,
            calificacion: body.calificacion
        });

        return await curso.save();
    } catch (error) {
        throw new Error(`Error al crear el curso: ${error.message}`);
    }
}

// Función asíncrona para actualizar un curso
async function actualizarCurso(id, body) {
    try {
        // Verificar si el título ya está en uso por otro curso
        let cursoExistente = await Curso.findOne({ titulo: body.titulo });
        if (cursoExistente && cursoExistente._id.toString() !== id) {
            throw new Error('El título del curso ya está en uso por otro curso.');
        }

        let curso = await Curso.findByIdAndUpdate(
            id,
            {
                $set: {
                    titulo: body.titulo,
                    descripcion: body.descripcion,
                    alumnos: body.alumnos,
                    calificacion: body.calificacion
                }
            },
            { new: true }
        );

        return curso;
    } catch (error) {
        throw new Error(`Error al actualizar el curso: ${error.message}`);
    }
}


//Funcion asincrona para Desacticar cursos
async function desactivarCurso(id){
    try{
        let curso = await Curso.findByIdAndUpdate(id,{
        $set:{
            estado:false
        }
        },{new:true});
        return curso;
    } catch (error) {
        throw new Error(`Error al desactivar el curso: ${error.message}`);
    }

}

//Funcion asincrona para listar los cursos activos
async function listarCursosActivos() {
    try{
        let cursos = await Curso.find({"estado": true});
        return cursos;
    } catch (error) {
        throw new Error(`Error al listar el curso: ${error.message}`);
    }
    
}

module.exports={
    crearCurso,
    actualizarCurso,
    desactivarCurso,
    listarCursosActivos
}