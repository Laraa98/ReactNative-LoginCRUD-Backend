const db = require('../config/config');

const Rol = {};

Rol.create = (idUsers, idRoles, result) => {
    const sql = 'INSERT INTO user_has_roles(idUsers, idRoles, created_at, updated_at) VALUES (?, ? ,? ,?)';
    db.query(sql, [idUsers, idRoles, new Date(), new Date()], (err, res) => {
        if(err){
            console.log('Error:', err);
            result(err, null);
        }else {
            console.log('Usuario obtenido:', res.insertId);
            result(null, res.insertId);
        }
    });
}

module.exports = Rol;