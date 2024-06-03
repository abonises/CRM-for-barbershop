import User from '../models/User'
import Order from '../models/Order'
import bcrypt from 'bcrypt'
import { Request, Response } from "express";

const getAllUsers = async (_req: Request, res: Response) => {
    const users = await User.find().select('-password').lean()

    if (!users?.length) {
        return res.status(400).json({ message: 'No users found' })
    }

    res.json(users)
}

const createNewUser = async (req: Request, res: Response) => {
    const { username, password, roles, phone, rating } = req.body

    if (!username || !password || !phone || !rating) {
        return res.status(400).json({ message: 'All fields are required' })
    }
    
    const duplicate = await User.findOne({ username }).collation({locale: 'en', strength: 2}).lean().exec()

    if (duplicate) {
        return res.status(409).json({ message: 'Duplicate username' })
    }

    const hashedPwd = await bcrypt.hash(password, 10)

    const userObject = (!Array.isArray(roles) || !roles.length)
        ? { username, "password": hashedPwd, phone, rating }
        : { username, "password": hashedPwd, roles, phone, rating }

    const user = await User.create(userObject)

    if (user) {
        res.status(201).json({ message: `New user ${username} created` })
    } else {
        res.status(400).json({ message: 'Invalid user data received' })
    }
}

const updateUser = async (req: Request, res: Response) => {
    const { id, username, roles, active, password, rating, phone } = req.body

    if (!id || !username || !phone || !Array.isArray(roles) || !roles.length || typeof active !== 'boolean') {
        return res.status(400).json({ message: 'All fields except password are required' })
    }

    const user = await User.findById(id).exec()

    if (!user) {
        return res.status(400).json({ message: 'User not found' })
    }

    const duplicate = await User.findOne({ username }).collation({locale: 'en', strength: 2}).lean().exec()

    if (duplicate && duplicate?._id.toString() !== id) {
        return res.status(409).json({ message: 'Duplicate username' })
    }

    user.username = username
    user.roles = roles
    user.active = active
    user.rating = rating
    user.phone = phone

    if (password) {
        user.password = await bcrypt.hash(password, 10)
    }

    const updatedUser = await user.save()

    res.json({ message: `${updatedUser.username} updated` })
}

const deleteUser = async (req: Request, res: Response) => {
    const { id } = req.body

    if (!id) {
        return res.status(400).json({ message: 'User ID Required' })
    }

    const order = await Order.findOne({ user: id }).lean().exec()
    if (order) {
        return res.status(400).json({ message: 'User has assigned orders' })
    }

    const user = await User.findById(id).exec()

    if (!user) {
        return res.status(400).json({ message: 'User not found' })
    }

    const result = await user.deleteOne()


    res.json(result)
}

export default {
    getAllUsers,
    createNewUser,
    updateUser,
    deleteUser
}