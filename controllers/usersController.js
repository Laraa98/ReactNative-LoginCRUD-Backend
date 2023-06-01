const User = require('../models/user');
const Rol = require('../models/rol');
const bcrypt = require ('bcryptjs');
const jwt = require('jsonwebtoken');
const keys = require('../config/keys');
const storage = require('../utils/cloud_storage');

module.exports = {
    login(req, res) {
        const email = req.body.email;
        const password = req.body.password;


        User.findByEmail(email, async (err, myUser) => {
            if(err){
                return res.status(501).json({
                    success: false,
                    message: 'Hubo un error con el registro del usuario',
                    error: err
                });
            }
            if(!myUser){
                return res.status(401).json({ //el cliente no tiene autorizacion para realizar esta peticion
                    success: false,
                    message: 'El email no fue encontrado',
                });
            }
            const isPasswordValid = await bcrypt.compare(password, myUser.password);
            if(isPasswordValid){
                const token = jwt.sign({idUsers: myUser.idUsers, email: myUser.email}, keys.secretOrKey, { });
                const data = {
                    idUsers: myUser.idUsers,
                    name: myUser.name,
                    lastname: myUser.lastname,
                    email: myUser.email,
                    phone: myUser.phone,
                    image: myUser.image,
                    session_token: `JWT ${token}`,
                    roles: myUser.roles
                }
                return res.status(201).json({
                    success: true,
                    message: 'El usuario fue autenticado con exito',
                    data: data //el id del nuevo usuario que se registro
                });
            }else {
                return res.status(401).json({
                    success: false,
                    message: 'El usuario o constraseña son incorrectos'
                })
            }
        });
    },
    register(req, res) {
        const user = req.body; //capturo los datos que me envie el cliente
        User.create(user, (err, data) =>{
            if(err){
                return res.status(501).json({
                    success: false,
                    message: 'Hubo un error con el registro del usuario',
                    error: err
                });
            }
            return res.status(201).json({
                success: true,
                message: 'El registro se realizo correctamente',
                data: data //el id del nuevo usuario que se registro
            });
        });
    },
    async registerWithImage(req, res) {
        const user = JSON.parse(req.body.user);  //capturo los datos que me envie el cliente
        const files = req.files;
        if(files.length > 0){
            const path = `image_${Date.now()}`;
            const url = await storage(files[0], path);
            if(url != undefined && url != null){
                user.image = url;
            }
        }
        User.create(user, (err, data) =>{
            if(err){
                return res.status(501).json({
                    success: false,
                    message: 'Hubo un error con el registro del usuario',
                    error: err
                });
            }
            
            user.idUsers = `${data}`;
            const token = jwt.sign({idUsers: user.idUsers, email: user.email}, keys.secretOrKey, { });
            user.session_token = `JWT ${token}`;

            Rol.create(user.idUsers, 1, (err, data) => {
                if(err){
                    return res.status(501).json({
                        success: false,
                        message: 'Hubo un error con el registro del rol usuario',
                        error: err
                    });
                }
                return res.status(201).json({
                    success: true,
                    message: 'El registro se realizo correctamente',
                    data: user
                });
            });
        });
    },
    async updateWithImage(req, res) {
        const user = JSON.parse(req.body.user);  //capturo los datos que me envie el cliente
        const files = req.files;
        if(files.length > 0){
            const path = `image_${Date.now()}`;
            const url = await storage(files[0], path);
            if(url != undefined && url != null){
                user.image = url;
            }
        }
        User.update(user, (err, data) =>{
            if(err){
                return res.status(501).json({
                    success: false,
                    message: 'Hubo un error en la actualizacion del usuario',
                    error: err
                });
            }

            return res.status(201).json({
                success: true,
                message: 'El usuario se actualizo correctamente',
                data: user
            });
        });
    },
    async updateWithoutImage(req, res) {
        const user = req.body.user;  //capturo los datos que me envie el cliente
        console.log('DATA DEL CLIENTE ', user);
        
        User.updateWithoutImage(user, (err, data) =>{
            if(err){
                return res.status(501).json({
                    success: false,
                    message: 'Hubo un error en la actualizacion del usuario',
                    error: err
                });
            }

            return res.status(201).json({
                success: true,
                message: 'El usuario se actualizo correctamente',
                data: user
            });
        });
    }
}