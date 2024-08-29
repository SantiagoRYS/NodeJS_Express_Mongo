const express = require('express');

const ruta = express.Router();

const logic = require('../logic/usuario_logic');

const schema = require('../validations/usuario_validation');

/*
ruta.get('/', (req,res)=>{
    res.json('Respuesta a peticion GET se USUARIOS funcionando correctamente...')
})*/

//Endpoint de tipo post para el recurso USUARIOS
ruta.post('/', async (req, res) => {
    let body = req.body;
    const {error, value} = schema.validate({nombre: body.nombre, email: body.email, password: body.password});
    if (!error){
        try{
            let resultado = await logic.crearUsuario(body);
            res.json({
                valor: resultado
            })
        }catch(err) {
            res.status(400).json({
                error: err.message
            });
        }
    }else{
        res.status(400).json({
            error: error.details[0].message
        })
    }
});

//Endpoint de tipo put para actualizar los datos del usuario
ruta.put('/:email', async (req, res) =>{
    const {error, value} =schema.validate({nombre: req.body.nombre})
    if(!error){
        try{
            let resultado = await logic.actualizarUsuario(req.params.email, req.body);
            res.json({
                message:'Usuario actualizado exitosamente',
                data: resultado
            });
        }catch (err) {
            res.status(400).json({
                message: 'Error al actualizar el usuario',
                error: err.message
            });
        }
    } else {
        res.status(400).json({
            error: error.details[0].message
        });
    }
});

//Endpoint de tipo DELETE para el recurso USUARIOS
ruta.delete('/:email', async (req, res)=>{
    try {
        let resultado = await logic.desactivarUsuario(req.params.email);
        res.json({
            message: 'Éxito al desactivar al usuario',
            usuario: resultado
        });
    } catch (err) {
        res.status(400).json({
            message: 'Error al desactivar al usuario',
            error: err.message
        });
    }
});

//Endpoint de tipo GET para el recurso usuarios. Lista todos los usuarios
ruta.get('/', async (req, res)=>{
    try {
        let usuarios = await logic.listarUsuariosActivos();
        res.json(usuarios);
    } catch (err) {
        res.status(400).json({
            message: 'Error al listar los usuarios activos',
            error: err.message
        });
    }
});

module.exports = ruta;