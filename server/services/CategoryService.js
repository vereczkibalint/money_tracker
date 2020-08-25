const CategoryModel = require('../models/Category');

class CategoryService {
    fetchAllCategories = (userId, error, success) => {
        try {
            CategoryModel.find({ createdBy: userId }, (err, res) => {
                if(err || !res) {
                    error({ status_code: 'ERR_CAT_NO_CATEGORIES', errors: [ {msg: 'Nincsenek kategóriák!'}] });
                } else {
                    success(res);
                }
            });
        } catch (err) {
            console.error(err.message);
            error({ status_code: 'ERR_INTERNAL_SERVER', errors: [ {msg: 'Szerver hiba!'} ] });
        }    
    }

    fetchCategoryById = (categoryData, error, success) => {
        try {
            const { categoryId, userId } = categoryData;
            CategoryModel.findById({ _id: categoryId, createdBy: userId }, {}, (err, res) => {
                if(err || !res) {
                    error({ status_code: 'ERR_CAT_CATEGORY_NOTFOUND', errors: [ {msg: 'A kategória nem található!'}] });
                } else {
                    success(res);
                }
            });
        } catch (err) {
            if(err.kind === "ObjectId") {
                error({ status_code: 'ERR_CAT_CATEGORY_NOTFOUND', errors: [ {msg: 'A kategória nem található!'}] });
            }
            error({ status_code: 'ERR_INTERNAL_SERVER', errors: [ {msg: 'Szerver hiba!' }] });
        }
    }

    insertCategory = (category, error, success) => {
        try {
            const newCategory = new CategoryModel(category);

            newCategory.save({}, (err, res) => {
                if(err || !res) {
                    error({ status_code: 'ERR_CAT_FAILED_INSERT', errors: [ {msg: 'A kategória felvitele során hiba történt!'}] });
                } else {
                    success(res);
                }
            });
        } catch (err) {
            console.error(err.message);
            error({ status_code: 'ERR_INTERNAL_SERVER', errors: [ {msg: 'Szerver hiba!'}] });
        }
    }

    updateCategory = (category, error, success) => {
        try {
            CategoryModel.findOneAndUpdate({ _id: category.id, createdBy: category.createdBy }, {
                name: category.name,
                color: category.color
            }, {returnOriginal:false}, (err, res) => {
                if(err || !res) {
                    error({ status_code: 'ERR_CAT_FAILED_UPDATE', errors: [ {msg: 'A kategória módosítása során hiba történt!'}] });
                } else {
                    success(res);
                }
            });
        } catch (err) {
            if(err.kind === "ObjectId") {
                error({ status_code: 'ERR_CAT_CATEGORY_NOTFOUND', errors: [ {msg: 'A kategória nem található!'}] });
            }
            console.error(err.message);
            error({ status_code: 'ERR_INTERNAL_SERVER', errors: [ {msg: 'Szerver hiba!'}] });
        }
    }

    deleteCategory = (categoryData, error, success) => {
        try {
            const { categoryId, userId } = categoryData;
            CategoryModel.findOneAndDelete({ _id: categoryId, createdBy: userId }, (err, res) => {
                if(err || !res || res === null) {
                    error({ status_code: 'ERR_CATEGORY_FAILED_DELETE', errors: [ {msg: 'A kategória törlése során hiba történt!'}] });
                } else {
                    success({ msg: 'Sikeres törlés!' });
                }
            });
        } catch (err) {
            if(err.kind === "ObjectId") {
                error({ status_code: 'ERR_CAT_CATEGORY_NOTFOUND', errors: [ {msg: 'A kategória nem található!'}] });
            }
            console.error(err.message);
            error({ status_code: 'ERR_INTERNAL_SERVER', errors: [ { msg: 'Szerver hiba!'}] });
        }
    }
}

module.exports = new CategoryService();