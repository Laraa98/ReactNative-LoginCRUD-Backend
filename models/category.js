const db = require('../config/config');
const Category = {};

Category.getAll = (result) => {
    const sql = `SELECT idCategories, name, description, image FROM categories ORDER BY name`;
    db.query(sql, (err, data) => {
        if(err){
            console.log('Error:', err);
            result(err, null);
        }else {
            console.log('Id de la nueva categoria:', data);
            result(null, data);
        }
    });
}

Category.create = (category, result) => {
    const sql = `INSERT INTO categories(name, description, image, created_at, updated_at) VALUES (?, ?, ?, ?, ?)`;
    db.query (sql, [category.name, category.description, category.image, new Date(), new Date() ], (err, res) => {
        if(err){
            console.log('Error:', err);
            result(err, null);
        }else {
            console.log('Id de la nueva categoria:', res.insertId);
            result(null, res.insertId);
        }
    });
}

Category.update = (category, result) => {
    const sql = `UPDATE categories SET name = ?, description = ?, image = ?, updated_at= ? WHERE idCategories = ?`;
    db.query(sql, [category.name, category.description, category.image, new Date(), category.idCategories], (err, res) => {
        if(err){
            console.log('Error:', err);
            result(err, null);
        }else {
            console.log('Id de la categoria actualizada:', category.idCategories);
            result(null, category.idCategories);
        }
    });
}

Category.delete = (idCategories, result) => {
    const sql = `DELETE FROM categories WHERE idCategories = ? `;
    db.query(sql, idCategories, (err, res) => {
        if(err){
            console.log('Error:', err);
            result(err, null);
        }else {
            console.log('Id de la categoria eliminada:', idCategories);
            result(null, idCategories);
        }
    })
}

module.exports = Category;