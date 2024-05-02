const Product = require('../models/product');

const getProducts = async(req, res) => {

    const products = await Product.find({});
    res.send({count: products.length, products: products}).status(200); 
}

const createProduct = async(req, res) => {

    const product = req.body;
    const newProduct = await Product.create(product);
    res.send(newProduct).status(201);
}

const getProductById = async(req, res) => {

    const id = req.params.id;
    try {
        const product = await Product.findById({'_id': id});

        if(!product){
            return res.send({'error': `No product with id ${id} found`}).status(404);
        }

        res.send(product).status(200);
    } catch (error) {
        console.log(error);
        return res.status(500).send({'error': 'Internal server error'});
    }
}

const updateProduct = async(req, res) => {
    const id = req.params.id;
    const data = req.body

    try {
        
        const product = await Product.findByIdAndUpdate(id, {...data}, {new : true});

        if(!product){

            return res.send({'error': `No item with id ${id} found`}).status(404);

        }

        res.send(product).status(201);
    } catch (error) {
        console.log(error);
        return res.send({'error': 'Internal server error'}).status(500);
    }

}


const deleteProduct = async(req, res) => {
    const id = req.params.id;
    
    try {
        const deletedProduct = await Product.findByIdAndDelete({'_id': id})

        if(!deletedProduct){
            return res.send({'error': `No product with id ${id} found`}).status(404);
        }

        res.send({'success': 'Product deleted successfully'}).status(200);
    } catch (error) {
        console.log(error);
        return res.send({'error': 'Internal server error'}).status(500);
    }

}

module.exports = {
    getProducts, 
    createProduct,
    getProductById,
    updateProduct,
    deleteProduct
}