const Category = require('../models/category');
const storage = require('../utils/cloud_storage');

module.exports = {

    async getAll(req, res) {
        Category.getAll((err, data) => {
            if(err){
                return res.status(501).json({
                    success: false,
                    message: 'Hubo un error al momento de listar las categorias',
                    error: err
                });
            }
            return res.status(201).json(data);
        });
    },

    async create(req, res) {
        const category = JSON.parse(req.body.category);  //capturo los datos que me envie el cliente
        const files = req.files;
        if(files.length > 0){
            const path = `image_${Date.now()}`;
            const url = await storage(files[0], path);
            if(url != undefined && url != null){
                category.image = url;
            }
        }
        Category.create(category, (err, idCategory) =>{
            if(err){
                return res.status(501).json({
                    success: false,
                    message: 'Hubo un error con la creacion de la categoria',
                    error: err
                });
            }
            return res.status(201).json({
                success: true,
                message: 'la categoria se agrego correctamente',
                data: `${idCategory}`
            });
        });
    },
    async updateWithImage(req, res) {
        const category = JSON.parse(req.body.category);  //capturo los datos que me envie el cliente
        const files = req.files;
        if(files.length > 0){
            const path = `image_${Date.now()}`;
            const url = await storage(files[0], path);
            if(url != undefined && url != null){
                category.image = url;
            }
        }
        Category.update(category, (err, idCategory) =>{
            if(err){
                return res.status(501).json({
                    success: false,
                    message: 'Hubo un error con la actualizacion de la categoria',
                    error: err
                });
            }
            return res.status(201).json({
                success: true,
                message: 'la categoria se actualizo correctamente',
                data: `${idCategory}`
            });
        });
    },
    async update(req, res) {
        const category = req.body;  //capturo los datos que me envie el cliente
        console.log('CATEGORIA: ', category)

        Category.update(category, (err, idCategory) =>{
            if(err){
                return res.status(501).json({
                    success: false,
                    message: 'Hubo un error con la actualizacion de la categoria',
                    error: err
                });
            }
            return res.status(201).json({
                success: true,
                message: 'la categoria se actualizo correctamente',
                data: `${idCategory}`
            });
        });
    },
    async delete(req, res){
        const idCategories = req.params.idCategories;
        Category.delete(idCategories, (err, data) => {
            if(err){
                return res.status(501).json({
                    success: false,
                    message: 'Hubo un error al momento de eliminar una categoria',
                    error: err
                });
            }
            return res.status(201).json({
                success: true,
                message: 'la categoria se elimino correctamente',
                data: `${idCategories}`
            });
        });
    }
}