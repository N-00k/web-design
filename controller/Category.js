const { Category } = require("../model/Category");

exports.fetchCategories = async (req, res) => {


    try {
        const categories = await Category.find({}).exec()
        res.status(200).json(categories)

    } catch (err) {
        res.status(400).json(err);
    }
}
exports.createCategory = async (req, res) => {
    ////this category we have to get from API body
    // console.log(req.body);

    const category = new Category(req.body)
    console.log(category);

    try {
        const doc = await category.save();
        res.status(201).json(doc)
    } catch (err) {
        res.status(400).json(err);
    }
};
