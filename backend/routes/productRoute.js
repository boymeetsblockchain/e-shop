import express from 'express'
import { createProduct, deleteProduct, getProductById, getProducts, updateProduct,createProductReview,getTopProducts} from '../controllers/productController.js'
import {protect,admin} from '../middlewares/authMiddleware.js'
const router= express.Router()

router.route('/').get(getProducts).post(protect, admin, createProduct);
 router.get('/top',getTopProducts)
router.get('/:id',getProductById)
router.put('/:id',protect,admin,updateProduct)
router.delete('/:id',protect,admin,deleteProduct)
router.post('/:id/reviews',protect,createProductReview)
export default router