import express from 'express'
const router = express.Router()
import ordersController from '../controllers/ordersController'
import verifyJWT from '../middleware/verifyJWT'

router.use(verifyJWT)

router.route('/')
    .get(ordersController.getAllOrders)
    .post(ordersController.createNewOrder)
    .patch(ordersController.updateOrder)
    .delete(ordersController.deleteOrder)

export default router;