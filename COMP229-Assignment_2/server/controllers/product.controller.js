import Product from '../models/product.model.js'

const create = async (req, res) => {
	try {
        const newProduct = new Product(req.body);
        const savedProduct = await newProduct.save();
        res.status(201).json(savedProduct);
    } catch (error) {
        res.status(500).json({ message: 'Error creating product' });
    }
}
const list = async (req, res) => {
	const user = new Product(req.body)
	try {
        const products = await Product.find();
        res.json(products);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching products' });
    }
}
const productByID = async (req, res, next, id) => {
	try {
		let product = await Product.findById(id)
		if (!product)
			return res.status('400').json({
				error: "Product not found"
			})
		req.profile = product
		next()
	} catch (err) {
		return res.status('400').json({
			error: "Could not retrieve product"
		})
	}
}

const read = (req, res) => {
	return res.json(req.profile)
}

const update = async (req, res) => {
	try {
        const product = req.profile
        const updatedProduct = await Product.findByIdAndUpdate(product, req.body, { new: true });
        if (!updatedProduct) {
            return res.status(404).json({ message: 'Product not found' });
        }
        res.json(updatedProduct);
    } catch (error) {
        res.status(500).json({ message: 'Error updating product' });
    }
}
const remove = async (req, res) => {
	try {
        const product = req.profile
        const deletedProduct = await Product.findByIdAndDelete(product);
        if (!deletedProduct) {
            return res.status(404).json({ message: 'Product not found' });
        }
        res.json({ message: 'Product deleted' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting product' });
    }
}

const deleteAll = async (req,res) => {
    try {
        await Product.deleteMany({});
        res.json({ message: 'All products deleted' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting products' });
    }
}

const listByName = async (req, res) => {
    const keyword = req.query.kw;
    try {
        const products = await Product.find({ name: { $regex: keyword, $options: 'i' } });
        res.json(products);
    } catch (error) {
        res.status(500).json({ message: 'Error searching for products' });
    }
};
export default { create, productByID, read, list, remove, deleteAll, update, listByName }
