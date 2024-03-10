const DB = "backendapi";

const CREATE_PRODUCT = {
    text: `INSERT INTO ${DB}.products (product_name, product_price, product_discount, product_quantity, product_image_path, is_deleted)
        VALUES ($1, $2, $3, $4, $5, $6)
        RETURNING *;`
}

const DELETE_PRODUCT = {
    text: `UPDATE ${DB}.products
        SET is_deleted = true
        WHERE product_id = $1
        RETURNING product_id;`
}

const UPDATE_PRODUCT = async (body) => {
    try {
        let text = `UPDATE ${DB}.products SET`;

        console.log("BODY: ", body);

        for (const key in body) {
            if (Object.hasOwnProperty.call(body, key)) {
                const element = body[key];
                console.log(`KEY: ${key} and ELEMENT: ${element}`);
                text = text.concat(` ${key} = ${element},`);
            } 
        }

        const lastCommaIndex = text.lastIndexOf(',');
        text = text.substring(0, lastCommaIndex) + text.substring(lastCommaIndex + 1);

        text = text.concat(` WHERE product_id = ${body.product_id} RETURNING product_id`);

        return text;

    } catch (error) {
        console.log(error);
    }
}

const GET_PRODUCTS = {
    text: `SELECT * FROM ${DB}.products ORDER BY product_id ASC;`
}



module.exports = {
    CREATE_PRODUCT,
    DELETE_PRODUCT,
    UPDATE_PRODUCT,
    GET_PRODUCTS,
}