const logic = require('../logic/curso_logic');
const { cursoSchemaValidation } = require('../validations/curso_validation');

// Controlador para listar los cursos activos
const listarCursosActivos = async (req, res) => {
    try {
        const cursosActivos = await logic.listarCursosActivos();
        if (cursosActivos.length === 0) {
            return res.status(204).send(); // 204 No Content
        }
        res.json(cursosActivos);
    } catch (err) {
        res.status(500).json({ error: 'Error interno del servidor' });
    }
};

// Controlador para crear un curso
const crearCurso = async (req, res) => {
    const body = req.body;
    const { error, value } = cursoSchemaValidation.validate({
        titulo: body.titulo,
        descripcion: body.descripcion,
        estado: body.estado,
        imagen: body.imagen,
        alumnos: body.alumnos,
        calificacion: body.calificacion
    });
    if (error) {
        return res.status(400).json({ error: error.details[0].message });
    }
    try {
        const nuevoCurso = await logic.crearCurso(value);
        res.status(201).json(nuevoCurso);
    } catch (err) {
        if (err.message === 'El curso con este título ya existe') {
            return res.status(409).json({ error: err.message });
        }
        res.status(500).json({ error: 'Error interno del servidor' });
    }
};

// Controlador para actualizar un curso
const actualizarCurso = async (req, res) => {
    const { id } = req.params;
    const body = req.body;
    const { error, value } = cursoSchemaValidation.validate({
        titulo: body.titulo,
        descripcion: body.descripcion,
        estado: body.estado,
        imagen: body.imagen,
        alumnos: body.alumnos,
        calificacion: body.calificacion
    });
    if (error) {
        return res.status(400).json({ error: error.details[0].message });
    }
    try {
        const cursoActualizado = await logic.actualizarCurso(id, value);
        if (!cursoActualizado) {
            return res.status(404).json({ error: 'Curso no encontrado' });
        }
        res.json(cursoActualizado);
    } catch (err) {
        res.status(500).json({ error: 'Error interno del servidor' });
    }
};

// Controlador para desactivar un curso
const desactivarCurso = async (req, res) => {
    const { id } = req.params;
    try {
        const cursoDesactivado = await logic.desactivarCurso(id);
        if (!cursoDesactivado) {
            return res.status(404).json({ error: 'Curso no encontrado' });
        }
        res.json(cursoDesactivado);
    } catch (err) {
        res.status(500).json({ error: 'Error interno del servidor' });
    }
};

// Controlador para guardar una colección de cursos
const guardarColeccionCursos = async (req, res) => {
    const cursos = req.body;

    // Validación de cada curso en la colección
    for (let curso of cursos) {
        const { error } = cursoSchemaValidation.validate({
            titulo: curso.titulo,
            descripcion: curso.descripcion,
            estado: curso.estado,
            imagen: curso.imagen,
            alumnos: curso.alumnos,
            calificacion: curso.calificacion
        });
        if (error) {
            return res.status(400).json({ error: `Error en curso "${curso.titulo}": ${error.details[0].message}` });
        }
    }
    try {
        // Guardar la colección de cursos
        const resultados = await logic.guardarCursos(cursos);
        res.status(201).json({ message: 'Cursos guardados exitosamente', cursos: resultados });
    } catch (err) {
        res.status(500).json({ error: 'Error interno del servidor al guardar cursos', details: err.message });
    }
};

// Controlador para buscar un curso por su ID
const obtenerCursoPorId = async (req, res) => {
    const { id } = req.params;
    try {
        const curso = await logic.buscarCursoPorId(id);
        if (!curso) {
            return res.status(404).json({ error: `Curso con ID ${id} no encontrado` });
        }
        res.json(curso);
    } catch (err) {
        res.status(500).json({ error: `Error interno del servidor al buscar el curso: ${err.message}` });
    }
};

// Controlador para buscar usuarios asociados a un curso
const obtenerUsuariosPorCurso = async (req, res) => {
    const { id } = req.params;
    try {
        const usuarios = await logic.buscarUsuariosPorCurso(id);
        if (!usuarios || usuarios.length === 0) {
            return res.status(404).json({ error: `No se encontraron usuarios para el curso con ID ${id}` });
        }
        res.json(usuarios);
    } catch (err) {
        res.status(500).json({ error: `Error interno del servidor al buscar los usuarios del curso: ${err.message}` });
    }
};

// Exportar los controladores
module.exports = {
    listarCursosActivos,
    crearCurso,
    actualizarCurso,
    desactivarCurso,
    guardarColeccionCursos,
    obtenerCursoPorId,
    obtenerUsuariosPorCurso
};