import Order from '../models/Order'
import User from '../models/User'
import { Request, Response } from "express";

// @desc Get all orders
// @route GET /orders
// @access Private
const getAllOrders = async (_req: Request, res: Response) => {
    // Get all orders from MongoDB
    const orders = await Order.find().lean()

    // If no orders
    if (!orders?.length) {
        return res.status(400).json({ message: 'No orders found' })
    }

    // Add username to each order before sending the response
    // You could also do this with a for...of loop
    const ordersWithUser = await Promise.all(orders.map(async (order) => {
        const user = await User.findById(order.user).lean().exec()
        return { ...order, username: user!.username, nameBarber: user!.username }
    }))

    res.json(ordersWithUser)
}

// @desc Create new order
// @route POST /orders
// @access Private
const createNewOrder = async (req: Request, res: Response) => {
    const { user, name, nameBarber, surname, phone, time } = req.body

    // Confirm data
    if (!user || !name || !nameBarber || !surname || !phone || !time) {
        return res.status(400).json({ message: 'All fields are required' })
    }

    // Create and store the new user 
    const order = await Order.create({ user, name, nameBarber, surname, phone, time })

    if (order) { // Created
        return res.status(201).json({ message: 'New order created' })
    } else {
        return res.status(400).json({ message: 'Invalid order data received' })
    }

}

// @desc Update a order
// @route PATCH /orders
// @access Private
const updateOrder = async (req: Request, res: Response) => {
    const { id, user, name, nameBarber, surname, phone, time } = req.body

    // Confirm data
    if (!id || !user || !name || !nameBarber || !surname || !phone || !time) {
        return res.status(400).json({ message: 'All fields are required' })
    }

    // Confirm order exists to update
    const order = await Order.findById(id).exec()

    if (!order) {
        return res.status(400).json({ message: 'Order not found' })
    }

    order.user = user
    order.name = name
    order.nameBarber = nameBarber
    order.surname = surname
    order.phone = phone
    order.time = time

    const updatedOrder = await order.save()

    res.json(`Order for ${updatedOrder.name} updated`)
}

// @desc Delete a order
// @route DELETE /orders
// @access Private
const deleteOrder = async (req: Request, res: Response) => {
    const { id } = req.body

    // Confirm data
    if (!id) {
        return res.status(400).json({ message: 'Order ID required' })
    }

    // Confirm order exists to delete
    const order = await Order.findById(id).exec()

    if (!order) {
        return res.status(400).json({ message: 'Order not found' })
    }

    const result = await order.deleteOne()


    res.json(result)
}

export default  {
    getAllOrders,
    createNewOrder,
    updateOrder,
    deleteOrder
}