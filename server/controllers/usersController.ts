import User from '../models/User'
import Order from '../models/Order'
import bcrypt from 'bcrypt'
import { Request, Response } from "express";

// @desc Get all users
// @route GET /users
// @access Private
const getAllUsers = async (_req: Request, res: Response) => {
    // Get all users from MongoDB
    const users = await User.find().select('-password').lean()

    // If no users
    if (!users?.length) {
        return res.status(400).json({ message: 'No users found' })
    }

    res.json(users)
}

// @desc Create new user
// @route POST /users
// @access Private
const createNewUser = async (req: Request, res: Response) => {
    const { username, password, roles, phone } = req.body

    // Confirm data
    if (!username || !password) {
        return res.status(400).json({ message: 'All fields are required' })
    }

    // Check for duplicate username
    const duplicate = await User.findOne({ username }).collation({locale: 'en', strength: 2}).lean().exec()

    if (duplicate) {
        return res.status(409).json({ message: 'Duplicate username' })
    }

    // Hash password
    const hashedPwd = await bcrypt.hash(password, 10) // salt rounds

    const userObject = (!Array.isArray(roles) || !roles.length)
        ? { username, "password": hashedPwd, phone }
        : { username, "password": hashedPwd, roles, phone }

    // Create and store new user
    const user = await User.create(userObject)

    if (user) { //created
        res.status(201).json({ message: `New user ${username} created` })
    } else {
        res.status(400).json({ message: 'Invalid user data received' })
    }
}

// @desc Update a user
// @route PATCH /users
// @access Private
const updateUser = async (req: Request, res: Response) => {
    const { id, username, roles, active, password, rating, phone } = req.body

    // Confirm data
    if (!id || !username || !phone || !Array.isArray(roles) || !roles.length || typeof active !== 'boolean') {
        return res.status(400).json({ message: 'All fields except password are required' })
    }

    // Does the user exist to update?
    const user = await User.findById(id).exec()

    if (!user) {
        return res.status(400).json({ message: 'User not found' })
    }

    // Check for duplicate
    const duplicate = await User.findOne({ username }).collation({locale: 'en', strength: 2}).lean().exec()

    // Allow updates to the original user
    if (duplicate && duplicate?._id.toString() !== id) {
        return res.status(409).json({ message: 'Duplicate username' })
    }

    user.username = username
    user.roles = roles
    user.active = active
    user.rating = rating
    user.phone = phone

    if (password) {
        // Hash password
        user.password = await bcrypt.hash(password, 10) // salt rounds
    }

    const updatedUser = await user.save()

    res.json({ message: `${updatedUser.username} updated` })
}

// @desc Delete a user
// @route DELETE /users
// @access Private
const deleteUser = async (req: Request, res: Response) => {
    const { id } = req.body

    // Confirm data
    if (!id) {
        return res.status(400).json({ message: 'User ID Required' })
    }

    // Does the user still have assigned notes?
    const order = await Order.findOne({ user: id }).lean().exec()
    if (order) {
        return res.status(400).json({ message: 'User has assigned orders' })
    }

    // Does the user exist to delete?
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