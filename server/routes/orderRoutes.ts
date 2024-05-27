import express from 'express'
const router = express.Router()
import ordersController from '../controllers/ordersController'

router.route('/')
    .get(ordersController.getAllOrders)
    .post(ordersController.createNewOrder)
    .patch(ordersController.updateOrder)
    .delete(ordersController.deleteOrder)

export default router;