import Order from '../models/Order'
import User from '../models/User'
import { Request, Response } from "express";

const getAllOrders = async (_req: Request, res: Response) => {
    const orders = await Order.find().lean()

    if (!orders?.length) {
        return res.status(400).json({ message: 'No orders found' })
    }

    const ordersWithUser = await Promise.all(orders.map(async (order) => {
        const user = await User.findById(order.user).lean().exec()
        return { ...order, username: user!.username, nameBarber: user!.username }
    }))

    res.json(ordersWithUser)
}
const createNewOrder = async (req: Request, res: Response) => {
    const { user, name, nameBarber, surname, phone, time } = req.body

    if (!user || !name || !nameBarber || !surname || !phone || !time) {
        return res.status(400).json({ message: 'All fields are required' })
    }

    const duplicateTime = await Order.findOne({ time }).collation({locale: 'en', strength: 2}).lean().exec()

    if (duplicateTime) {
        return res.status(409).json({ message: 'Duplicate time' })
    }

    const order = await Order.create({ user, name, nameBarber, surname, phone, time })

    if (order) { 
        return res.status(201).json({ message: 'New order created' })
    } else {
        return res.status(400).json({ message: 'Invalid order data received' })
    }

}

const updateOrder = async (req: Request, res: Response) => {
    const { id, user, name, nameBarber, surname, phone, time } = req.body

    if (!id || !user || !name || !nameBarber || !surname || !phone || !time) {
        return res.status(400).json({ message: 'All fields are required' })
    }

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

const deleteOrder = async (req: Request, res: Response) => {
    const { id } = req.body

    if (!id) {
        return res.status(400).json({ message: 'Order ID required' })
    }

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