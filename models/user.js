const db = require('../config/config');
const bcrypt = require('bcryptjs');

const User = {};

User.findById = (idUser, result) => {
    const sql = 'SELECT U.idUsers, U.email, U.name, U.lastname, U.image, U.phone, U.password, JSON_ARRAYAGG(JSON_OBJECT("idRoles", CONVERT(R.idRoles, char), "name", R.name, "image", R.image, "route", R.route)) AS roles FROM users AS U INNER JOIN user_has_roles AS UHR ON UHR.idUsers = U.idUsers INNER JOIN roles AS R ON UHR.idRoles = R.idRoles WHERE U.idUsers = ? GROUP BY U.idUsers';
    db.query(sql,[idUser], (err, user) => {
        if(err){
            console.log('Error:', err);
            result(err, null);
        }else {
            console.log('Usuario obtenido:', user[0]);
            result(null, user[0]);
        }
    });
}

User.findByEmail = (email, result) => {
    const sql = 'SELECT U.idUsers, U.email, U.name, U.lastname, U.image, U.phone, U.password, JSON_ARRAYAGG(JSON_OBJECT("idRoles", CONVERT(R.idRoles, char), "name", R.name, "image", R.image, "route", R.route)) AS roles FROM users AS U INNER JOIN user_has_roles AS UHR ON UHR.idUsers = U.idUsers INNER JOIN roles AS R ON UHR.idRoles = R.idRoles WHERE email = ?  GROUP BY U.idUsers';
    db.query(sql,[email], (err, user) => {
        if(err){
            console.log('Error:', err);
            result(err, null);
        }else {
            console.log('Usuario obtenido:', user[0]);
            result(null, user[0]);
        }
    });
}

User.create = async (user, result) =>{

    const hash = await bcrypt.hash(user.password, 10);

    const sql = 'INSERT INTO users(email, name, lastname, phone, image, password, created_at, updated_at) VALUES (?, ?, ?, ?, ?, ?, ?, ?)';

    db.query(sql, [user.email, user.name, user.lastname, user.phone, user.image, hash, new Date(), new Date()], (err, res) =>{
        if(err){
            console.log('Error:', err);
            result(err, null);
        }else {
            console.log('Id del nuevo usuario:', res.insertId);
            result(null, res.insertId);
        }
    });
}

User.update = (user, result) => {
    const sql = 'UPDATE users SET name = ?, lastname = ?, phone = ?, image = ?, updated_at = ? WHERE idUsers = ?';

    db.query(sql, [user.name, user.lastname, user.phone, user.image, new Date(), user.idUsers], (err, res) =>{
        if(err){
            console.log('Error:', err);
            result(err, null);
        }else {
            console.log('Usuario actualizado:', user.idUsers);
            result(null, user.idUsers);
        }
    });
}

User.updateWithoutImage = (user, result) => {
    const sql = 'UPDATE users SET name = ?, lastname = ?, phone = ?, updated_at = ? WHERE idUsers = ?';

    db.query(sql, [user.name, user.lastname, user.phone, new Date(), user.idUser], (err, res) =>{
        if(err){
            console.log('Error:', err);
            result(err, null);
        }else {
            console.log('Usuario actualizado:', user.idUser);
            result(null, user.idUser);
        }
    });
}

module.exports = User;