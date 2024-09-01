const Usuario = require('../Models/usuario_model');

// Función asíncrona para crear un objeto de tipo usuario
async function crearUsuario(body) {
    try {
        // Verificar si el correo ya existe
        let usuarioExistente = await Usuario.findOne({ email: body.email });
        if (usuarioExistente) {
            throw new Error('El correo electrónico ya está en uso.');
        }

        let usuario = new Usuario({
            email: body.email,
            nombre: body.nombre,
            password: body.password
        });

        return await usuario.save();
    } catch (error) {
        throw new Error(`Error al crear el usuario: ${error.message}`);
    }
}

// Función para actualizar el usuario
async function actualizarUsuario(email, body) {
    try {
        // Verificar si el correo ya está en uso por otro usuario
        let usuarioExistente = await Usuario.findOne({ email: body.email });
        if (usuarioExistente && usuarioExistente.email !== email) {
            throw new Error('El correo electrónico ya está en uso por otro usuario.');
        }

        let usuario = await Usuario.findOneAndUpdate(
            { "email": email },
            {
                $set: {
                    nombre: body.nombre,
                    password: body.password
                }
            },
            { new: true }
        );

        return usuario;
    } catch (error) {
        throw new Error(`Error al actualizar el usuario: ${error.message}`);
    }
}



async function desactivarUsuario(email) {
    try{
        let usuario = await Usuario.findOneAndUpdate({"email":email},{
            $set:{
                estado: false
            }
        },
        {new:true}
        );
        return usuario;    
    } catch (error) {
        throw new Error(`Error al desactivar el usuario: ${error.message}`);
    }
}

//Funcion asincrona para listar todos los usuarios activos
async function listarUsuariosActivos() {
    try{
        let usuarios = await Usuario.find({"estado": true});
    return usuarios;
    } catch (error) {
        throw new Error(`Error al listar el usuario: ${error.message}`);
    }

}

module.exports ={
    crearUsuario,
    actualizarUsuario,
    desactivarUsuario,
    listarUsuariosActivos
}