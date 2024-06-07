import {Router} from "express";
const router = Router();


import ProductManager from "../app.js/productsManager.js";

const productManager = new ProductManager('./src/data/products.json');

import {productValidator} from '../middlewares/productValidator.js'

router.get('/', async (req, res)=>{
    try {
        const products = await productManager.getProducts();
        res.json(products);
    } catch (error) {
        next(error)
    }
})

router.post('/', productValidator, async (req, res)=>{
    try {
       const product = await productManager.addProduct(req.body)
       res.status(200).json(product)
    } catch (error) {
        next(error)
    }
})

router.get('/:id', async (req, res)=>{
    try {
        const {id}= req.params;
        const product = await productManager.getProductById(id);
        if(!product) res.status(404).json({msg: 'producto no encontrado'});
        else res.status(200).json(product)
    } catch (error) {
        next(error)
    }
})

router.put('/:id', async (req, res)=>{
    try {
        const {id}= req.params;
        const productUpd = await productManager.updateProduct(req.body, id);
        if (!productUpd) res.status(404).json({ msg: "Error al actualizar el producto" });
    res.status(200).json(productUpd);
    } catch (error) {
        next(error)
    }
})


router.delete('/:id', async (req,res)=>{
    try {
        const {id} = req.params;
        const delProduct = await productManager.deleteProduct(id);
        if(!delProduct) res.status(404).json({ msg: `Producto con id: ${id} eliminado correctamente`});
        res.status(200).json({msg:"Producto eliminado"})
        } catch (error) {
        next(error)
    }
})

export default router;