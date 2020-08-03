const CategoryModel = require('../models/Category');

class CategoryService {
    fetchAllCategories = (error, success) => {
        try {
            CategoryModel.find((err, res) => {
                if(err || !res) {
                    error({ status_code: 'ERR_CAT_NO_CATEGORIES', message: 'Nincsenek kategóriák!' });
                } else {
                    success(res);
                }
            });
        } catch (err) {
            console.error(err.message);
            error({ status_code: 'ERR_INTERNAL_SERVER', message: 'Szerver hiba!' });
        }    
    }

    fetchCategoryById = (categoryId, error, success) => {
        try {
            CategoryModel.findById(categoryId, {}, (err, res) => {
                if(err || !res) {
                    error({ status_code: 'ERR_CAT_CATEGORY_NOTFOUND', message: 'A kategória nem található!' });
                } else {
                    success(res);
                }
            });
        } catch (err) {
            if(err.kind === "ObjectId") {
                error({ status_code: 'ERR_CAT_CATEGORY_NOTFOUND', message: 'A kategória nem található!' });
            }
            error({ status_code: 'ERR_INTERNAL_SERVER', message: 'Szerver hiba!' });
        }
    }

    insertCategory = (category, error, success) => {
        try {
            const newCategory = new CategoryModel(category);

            newCategory.save({}, (err, res) => {
                if(err || !res) {
                    error({ status_code: 'ERR_CAT_FAILED_INSERT', message: 'A kategória felvitele során hiba történt!', err });
                } else {
                    success(res);
                }
            });
        } catch (err) {
            console.error(err.message);
            error({ status_code: 'ERR_INTERNAL_SERVER', message: 'Szerver hiba!' });
        }
    }

    updateCategory = (category, error, success) => {
        try {
            CategoryModel.findOneAndUpdate({ _id: category.id }, {
                name: category.name,
                color: category.color
            }, (err, res) => {
                if(err || !res) {
                    error({ status_code: 'ERR_CAT_FAILED_UPDATE', message: 'A kategória módosítása során hiba történt!' });
                } else {
                    success(res);
                }
            });
        } catch (err) {
            if(err.kind === "ObjectId") {
                error({ status_code: 'ERR_CAT_CATEGORY_NOTFOUND', message: 'A kategória nem található!' });
            }
            console.error(err.message);
            error({ status_code: 'ERR_INTERNAL_SERVER', message: 'Szerver hiba!' });
        }
    }

    deleteCategory = (user, categoryId, error, success) => {
        try {
            CategoryModel.findOneAndDelete({ _id: categoryId, createdBy: user }, (err, res) => {
                if(err || !res || res === null) {
                    error({ status_code: 'ERR_CATEGORY_FAILED_DELETE', message: 'A kategória törlése során hiba történt!' });
                } else {
                    success({ message: 'Sikeres törlés!' });
                }
            });
        } catch (err) {
            if(err.kind === "ObjectId") {
                error({ status_code: 'ERR_CAT_CATEGORY_NOTFOUND', message: 'A kategória nem található!' });
            }
            console.error(err.message);
            error({ status_code: 'ERR_INTERNAL_SERVER', message: 'Szerver hiba!' });
        }
    }
}

module.exports = new CategoryService();