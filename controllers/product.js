const db = require("../database/calls/product");

const createProduct = async (req, res) => {
    try {
        const create_product = await db.createProduct(req);

        if (!create_product) {
            res.status(400).json({ message: "Product already exists!"});
        } else {
            res.status(200).json({ 
                message: "Product created!",
                data: create_product
            });
        }
    } catch (error) {
        console.log(error);
    }
}

const deleteProduct = async (req, res) => {
    try {
        for (const key in req.body) {
            if (Object.hasOwnProperty.call(req.body, key)) {
                const element = req.body[key];
                if (!element) {
                    res.status(400).json({message: "Invalid syntax!"});
                }
            }
        }

        const delete_product = await db.deleteProduct(req);

        if (!delete_product) {
            res.status(400).json({ message: "Product doesn't exist!"});
        } else {
            res.status(200).json({ 
                message: "Product deleted.",
                data: delete_product
            });
        }
    } catch (error) {
        console.log(error);
    }
}

const updateProduct = async (req, res) => {
    try {
        for (const key in req.body) {
            if (Object.hasOwnProperty.call(req.body, key)) {
                const element = req.body[key];
                if (!element) {
                    res.status(400).json({message: "Invalid syntax!"});
                }
            }
        }

        const update_product = await db.updateProduct(req);

        if (!update_product) {
            res.status(400).json({ message: "Product doesn't exist!"});
        } else {
            res.status(200).json({ 
                message: `Product of ID ${update_product} succesfully updated!`,
            });
        }
    } catch (error) {
        console.log(error);
    }
}

const getProducts = async (req, res) => {
    try {
        const get_products = await db.getProducts(req);

        if (!get_products) {
            res.status(400).json({ message: "No products recorded yet!"});
        } else {
            res.status(200).json(get_products);
        }
    } catch (error) {
        console.log(error);
    }
}



module.exports = {
    createProduct,
    deleteProduct,
    updateProduct,
    getProducts,
}