const express = require('express');
const ruta = express.Router();
const logic = require('../logic/curso_logic');
const schema = require('../validations/curso_validation');

// Endpoint de tipo POST para el recurso CURSOS
ruta.post('/', async (req, res) => {
    const { error, value } = schema.validate(req.body);

    if (!error) {
        try {
            let curso = await logic.crearCurso(value);
            res.json({
                curso
            });
        } catch (err) {
            res.status(400).json({
                message: 'Error al crear el curso',
                error: err.message
            });
        }
    } else {
        res.status(400).json({
            error: error.details[0].message
        });
    }
});

// Endpoint de tipo PUT para actualizar los cursos
ruta.put('/:id', async (req, res) => {
    const { error, value } = schema.validate(req.body);

    if (!error) {
        try {
            let curso = await logic.actualizarCurso(req.params.id, value);
            res.json(curso);
        } catch (err) {
            res.status(400).json({
                message: 'Error al actualizar el curso',
                error: err.message
            });
        }
    } else {
        res.status(400).json({
            error: error.details[0].message
        });
    }
});

// Endpoint de tipo DELETE para desactivar cursos
ruta.delete('/:id', async (req, res) => {
    try {
        let curso = await logic.desactivarCurso(req.params.id);
        res.json(curso);
    } catch (err) {
        res.status(400).json({
            message: 'Error al desactivar el curso',
            error: err.message
        });
    }
});

// Endpoint tipo GET para listar los cursos activos
ruta.get('/', async (req, res) => {
    try {
        let cursos = await logic.listarCursosActivos();
        res.json(cursos);
    } catch (err) {
        res.status(400).json({
            message: 'Error al listar los cursos activos',
            error: err.message
        });
    }
});

module.exports = ruta;