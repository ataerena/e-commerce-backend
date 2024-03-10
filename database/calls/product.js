const {
    CREATE_PRODUCT,
    DELETE_PRODUCT,
    UPDATE_PRODUCT,
    GET_PRODUCTS,
} = require('../queries/product');

const { pool } = require('../connection');


const createProduct = async (req, res) => {
    try {
        let body = [];

        for (const key in req.body) {
            if (Object.hasOwnProperty.call(req.body, key)) {
                const element = req.body[key];
                body.push(element);
            }
        }

        var client = await pool.connect();

        const create_product = await client.query(CREATE_PRODUCT, body);

        return create_product.rows[0]

    } catch (error) {
        console.log(error);
    } finally {
        client.release();
    }
}

const deleteProduct = async (req, res) => {
    try {
        var client = await pool.connect();

        const delete_product = await client.query(DELETE_PRODUCT, [req.body.product_id]);

        return delete_product.rows[0];

    } catch (error) {
        console.log(error);
    } finally {
        client.release();
    }
}

const updateProduct = async (req, res) => {
    try {
        var client = await pool.connect();

        const query = await UPDATE_PRODUCT(req.body);

        const result = await client.query(query);

        return result;

    } catch (error) {
        console.log(error);
    } finally {
        client.release();
    }
}

const getProducts = async (req, res) => {
    try {
        var client = await pool.connect();

        const get_products = await client.query(GET_PRODUCTS);

        console.log("PRODUCTS: ", get_products);

        return get_products.rows;
    } catch (error) {
        console.log(error);
    } finally {
        client.release();
    }
}


module.exports = {
    createProduct,
    deleteProduct,
    updateProduct,
    getProducts,
}