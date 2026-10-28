const { Product } = require("../model/Product");



exports.createProduct = async (req, res) => {
    ////this product we have to get from API body
    // console.log(req.body);

    const product = new Product(req.body)
    // console.log(product);

    // const response = await product.save();
    // console.log(response);

    try {
        const doc = await product.save();
        // res.status(201).json(doc)
        res.status(201).json(doc)

    } catch (err) {
        res.status(400).json(err);
    }


    // if (err) {
    //     res.status(400).json(err);
    // } else {
    //     res.status(201).json(doc)
    // }

};

exports.fetchallproduct = async (req, res) => {
    //// here we need all query string

    ///// filter ={"category":["Beauty",frangrance]}
    // sort={_sort:"price",_order="desc"}
    ///pagination ={_price:1,_limit=10}     ////_page=1&_limit=10

    ////TODO:we have to try with multiple Category and brands after change in front-end

    // console.log(req.body);
    let condition = {}
    if (req.query.admin) {
        condition.deleted = { $ne: true }
    }
    let query = Product.find(condition);
    let totalProductsQuery = Product.find({ deleted: { $ne: true } });


    if (req.query.category) {
        query = query.find({ category: req.query.category });
        totalProductsQuery = totalProductsQuery.find(condition);
    }

    if (req.query.brand) {
        query = query.find({ brand: req.query.brand });
        totalProductsQuery = totalProductsQuery.find({ brand: req.query.brand });
    }
    ///TODO: how to get sort on discounted Price not on actual price
    if (req.query._sort && req.query._order) {
        query = query.sort({ [req.query._sort]: req.query._order })

    }
    const totalDocs = await totalProductsQuery.countDocuments().exec();
    console.log({ totalDocs });



    if (req.query._page && req.query._limit) {
        const pageSize = req.query._limit;
        const page = req.query._page
        query = query.skip(pageSize * (page - 1)).limit(pageSize);
    }


    try {
        const docs = await query.exec();
        res.set('X-Total-Count', totalDocs);////set me hum header ka nam de sakte hai 
        // console.log(docs);

        res.status(200).json(docs)
    } catch (err) {
        res.status(400).json(err);
    }




};


exports.fetchProductById = async (req, res) => {
    const { id } = req.params  /// id come from parms

    try {
        const product = await Product.findById(id)

        res.status(200).json(product)
    } catch (err) {
        res.status(400).json(err);
    }

}

exports.updateProduct = async (req, res) => {
    const { id } = req.params  /// id come from parms

    try {
        const product = await Product.findByIdAndUpdate(id, req.body, { new: true })

        res.status(200).json(product)
    } catch (err) {
        res.status(400).json(err);
    }

}