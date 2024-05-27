import Review from '../models/Review'
import User from '../models/User'
import { Request, Response } from "express";

// @desc Get all orders
// @route GET /orders
// @access Private
const getAllReviews = async (_req: Request, res: Response) => {
    // Get all reviews from MongoDB
    const reviews = await Review.find().lean()

    // If no orders
    if (!reviews?.length) {
        return res.status(400).json({ message: 'No reviews found' })
    }

    // Add username to each order before sending the response
    // You could also do this with a for...of loop
    const reviewsWithUser = await Promise.all(reviews.map(async (review) => {
        const user = await User.findById(review.user).lean().exec()
        return { ...review, username: user!.username }
    }))

    res.json(reviewsWithUser)
}

// @desc Create new review
// @route POST /reviews
// @access Private
const createNewReview = async (req: Request, res: Response) => {
    const { user, title, text, rating } = req.body

    // Confirm data
    if (!user || !title || !text || !rating) {
        return res.status(400).json({ message: 'All fields are required' })
    }

    // Create and store the new user
    const review = await Review.create({ user, title, text, rating })

    if (review) { // Created
        return res.status(201).json({ message: 'New review created' })
    } else {
        return res.status(400).json({ message: 'Invalid order data received' })
    }

}

// @desc Update a review
// @route PATCH /reviews
// @access Private
const updateReview = async (req: Request, res: Response) => {
    const { id, user, title, text, rating } = req.body

    // Confirm data
    if (!id || !user || !title || !text || !rating) {
        return res.status(400).json({ message: 'All fields are required' })
    }

    // Confirm review exists to update
    const review = await Review.findById(id).exec()

    if (!review) {
        return res.status(400).json({ message: 'Review not found' })
    }

    review.user = user
    review.title = title
    review.text = text
    review.rating = rating

    const updatedReview = await review.save()

    res.json(`Review for ${updatedReview.title} updated`)
}

// @desc Delete a review
// @route DELETE /reviews
// @access Private
const deleteReview = async (req: Request, res: Response) => {
    const { id } = req.body

    // Confirm data
    if (!id) {
        return res.status(400).json({ message: 'Review ID required' })
    }

    // Confirm review exists to delete
    const review = await Review.findById(id).exec()

    if (!review) {
        return res.status(400).json({ message: 'review not found' })
    }

    const result = await review.deleteOne()


    res.json(result)
}

export default  {
    getAllReviews,
    createNewReview,
    updateReview,
    deleteReview
}