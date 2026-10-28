const { Cart } = require("../model/Cart");

exports.fetchCartByUser = async (req, res) => {
    console.log("user_Data", req.user);

    const { id } = req.user;
    try {
        const cartItems = await Cart.find({ user: id }).populate('product') //// populate mean get all information of user
        res.status(200).json(cartItems)
    } catch (err) {
        res.status(400).json(err);
    }
}
exports.addToCart = async (req, res) => {
    ////this brand we have to get from API body
    // console.log(req.body);

    const cart = new Cart(req.body)
    // console.log(brand);

    try {
        const doc = await cart.save();
        const result = await doc.populate('product')

        res.status(201).json(result)
    } catch (err) {
        res.status(400).json(err);
    }
};



exports.addToCart = async (req, res) => {
    ////this brand we have to get from API body
    // console.log(req.body);
    const { id } = req.user;
    const cart = new Cart({ ...req.body, user: id })
    // console.log(brand);

    try {
        const doc = await cart.save();
        const result = await doc.populate('product');
        res.status(201).json(result);
    } catch (err) {
        res.status(400).json(err);
    }
};

////////////

exports.deleteFromCart = async (req, res) => {
    const { id } = req.params  /// id come from parms 
    try {
        const doc = await Cart.findByIdAndDelete(id);
        res.status(200).json(doc)
    } catch (err) {
        res.status(400).json(err);
    }
};

exports.updateCart = async (req, res) => {
    const { id } = req.params  /// id come from parms
    try {
        const cart = await Cart.findByIdAndUpdate(id, req.body, { new: true })
        const result = await doc.populate('product')

        res.status(200).json(result)

    } catch (err) {
        res.status(400).json(err);
    }

}