const express = require('express');
const usuarioController = require('../controllers/usuarios_controller'); // Importa los controladores
const router = express.Router();

// Listar usuarios activos
/**
 * @swagger
 * /api/usuarios:
 *   get:
 *     summary: Lista todos los usuarios activos
 *     tags:
 *       - Usuarios
 *     responses:
 *       200:
 *         description: Lista de usuarios activos
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: string
 *                     example: "12345"
 *                   nombre:
 *                     type: string
 *                     example: "Juan Pérez"
 *                   email:
 *                     type: string
 *                     example: "juan.perez@example.com"
 *                   estado:
 *                     type: boolean
 *                     example: true
 */
router.get('/', usuarioController.listarUsuarioActivos);

// Listar cursos del usuario
/**
 * @swagger
 * /api/usuarios/{usuarioId}/cursos:
 *   get:
 *     summary: Lista todos los cursos asociados a un usuario
 *     tags:
 *       - Usuarios
 *     parameters:
 *       - in: path
 *         name: usuarioId
 *         schema:
 *           type: string
 *         required: true
 *         description: ID del usuario
 *     responses:
 *       200:
 *         description: Lista de cursos del usuario
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: string
 *                     example: "66d05dddb025aa6e32e1654b"
 *                   titulo:
 *                     type: string
 *                     example: "Introducción a React.JS"
 *                   descripcion:
 *                     type: string
 *                     example: "Curso básico sobre React.JS"
 *                   estado:
 *                     type: boolean
 *                     example: true
 *       404:
 *         description: Usuario no encontrado
 */
router.get('/:usuarioId/cursos', usuarioController.listarCursosDeUsuario);

// Crear un usuario sin cursos (Usuarios frontend)
/**
 * @swagger
 * /api/usuarios:
 *   post:
 *     summary: Crea un nuevo usuario
 *     tags:
 *       - Usuarios
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nombre:
 *                 type: string
 *                 example: "Juan Pérez"
 *               email:
 *                 type: string
 *                 example: "juan.perez@example.com"
 *     responses:
 *       201:
 *         description: Usuario creado con éxito
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                   example: "12345"
 *                 nombre:
 *                   type: string
 *                   example: "Juan Pérez"
 *                 email:
 *                   type: string
 *                   example: "juan.perez@example.com"
 *       400:
 *         description: Error en la solicitud
 */
router.post('/', usuarioController.crearUsuario);

// Crear un usuario con cursos (Home frontend)
/**
 * @swagger
 * /api/usuarios/{email}/cursos:
 *   post:
 *     summary: Crea un nuevo usuario y le asigna cursos
 *     tags:
 *       - Usuarios
 *     parameters:
 *       - in: path
 *         name: email
 *         schema:
 *           type: string
 *         required: true
 *         description: Email del usuario
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               cursos:
 *                 type: array
 *                 items:
 *                   type: string
 *                 example: ["curso1", "curso2"]
 *     responses:
 *       201:
 *         description: Usuario creado con cursos asignados
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                   example: "12345"
 *                 nombre:
 *                   type: string
 *                   example: "Juan Pérez"
 *                 email:
 *                   type: string
 *                   example: "juan.perez@example.com"
 *                 cursos:
 *                   type: array
 *                   items:
 *                     type: string
 *                   example: ["curso1", "curso2"]
 *       400:
 *         description: Error en la solicitud
 */
router.post('/:email/cursos', usuarioController.agregarCursosAUsuario);

// Eliminar usuario
/**
 * @swagger
 * /api/usuarios/{email}:
 *   delete:
 *     summary: Desactiva un usuario existente
 *     tags:
 *       - Usuarios
 *     parameters:
 *       - in: path
 *         name: email
 *         schema:
 *           type: string
 *         required: true
 *         description: Email del usuario
 *     responses:
 *       200:
 *         description: Usuario desactivado con éxito
 *       404:
 *         description: Usuario no encontrado
 */
router.delete('/:email', usuarioController.desactivarUsuario);

// Guardar una colección de usuarios
/**
 * @swagger
 * /api/usuarios/coleccion:
 *   post:
 *     summary: Crea una colección de usuarios
 *     tags:
 *       - Usuarios
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: array
 *             items:
 *               type: object
 *               properties:
 *                 nombre:
 *                   type: string
 *                   example: "Juan Pérez"
 *                 email:
 *                   type: string
 *                   example: "juan.perez@example.com"
 *     responses:
 *       201:
 *         description: Colección de usuarios creada con éxito
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: string
 *                     example: "12345"
 *                   nombre:
 *                     type: string
 *                     example: "Juan Pérez"
 *                   email:
 *                     type: string
 *                     example: "juan.perez@example.com"
 *       400:
 *         description: Error en la solicitud
 */
router.post('/coleccion', usuarioController.guardarColeccionUsuarios);

// Actualizar un usuario
/**
 * @swagger
 * /api/usuarios/{email}:
 *   put:
 *     summary: Actualiza un usuario existente
 *     tags:
 *       - Usuarios
 *     parameters:
 *       - in: path
 *         name: email
 *         schema:
 *           type: string
 *         required: true
 *         description: Email del usuario
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nombre:
 *                 type: string
 *                 example: "Juan Pérez"
 *     responses:
 *       200:
 *         description: Usuario actualizado con éxito
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                   example: "12345"
 *                 nombre:
 *                   type: string
 *                   example: "Juan Pérez"
 *                 email:
 *                   type: string
 *                   example: "juan.perez@example.com"
 *       400:
 *         description: Error en la solicitud
 */
router.put('/:email', usuarioController.actualizarUsuario);

/**
 * @swagger
 * /api/usuarios/{email}/cursos:
 *   put:
 *     summary: Actualiza los cursos asignados a un usuario
 *     tags:
 *       - Usuarios
 *     parameters:
 *       - in: path
 *         name: email
 *         schema:
 *           type: string
 *         required: true
 *         description: Email del usuario cuyo curso se actualizará
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               cursos:
 *                 type: array
 *                 items:
 *                   type: string
 *                 example: ["curso1", "curso2"]
 *             description: Lista de IDs de cursos que se asignarán al usuario
 *     responses:
 *       200:
 *         description: Cursos actualizados con éxito para el usuario
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                   example: "12345"
 *                 email:
 *                   type: string
 *                   example: "juan.perez@example.com"
 *                 nombre:
 *                   type: string
 *                   example: "Juan Pérez"
 *                 cursos:
 *                   type: array
 *                   items:
 *                     type: string
 *                   example: ["curso1", "curso2"]
 *       400:
 *         description: Error en la solicitud, por ejemplo, si el email es inválido o la lista de cursos está mal formateada
 *       404:
 *         description: Usuario no encontrado
 */
router.put('/:email/cursos', usuarioController.actualizarCursosDeUsuario);

module.exports = router;







/*
const express = require('express');
const usuarioController = require('../controllers/usuarios_controller'); // Importa los controladores
const router = express.Router();

//Listar usuarios activos
router.get('/', usuarioController.listarUsuarioActivos);

//Listar cursos del usuario
router.get('/:usuarioId/cursos', usuarioController.listarCursosDeUsuario);

//Crear un usuario sin cursos Usuarios (frontend)
router.post('/', usuarioController.crearUsuario);

// Crear un usuario con cursos => Home (frontend)
router.post('/:email/cursos', usuarioController.agregarCursosAUsuario);

// Guardar una colección de usuarios
router.post('/coleccion', usuarioController.guardarColeccionUsuarios);

// Actualizar un usuario
router.put('/:email', usuarioController.actualizarUsuario);

// Eliminar usuario
router.delete('/:email', usuarioController.desactivarUsuario);

module.exports = router;
*/