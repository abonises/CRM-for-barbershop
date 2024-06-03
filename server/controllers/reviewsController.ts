import Review from '../models/Review'
import User from '../models/User'
import { Request, Response } from "express";

const getAllReviews = async (_req: Request, res: Response) => {
    const reviews = await Review.find().lean()

    if (!reviews?.length) {
        return res.status(400).json({ message: 'No reviews found' })
    }

    const reviewsWithUser = await Promise.all(reviews.map(async (review) => {
        const user = await User.findById(review.user).lean().exec()
        return { ...review, username: user!.username }
    }))

    res.json(reviewsWithUser)
}

const createNewReview = async (req: Request, res: Response) => {
    const { user, title, text, rating, nameBarber } = req.body

    if (!user || !title || !text || !rating || !nameBarber) {
        return res.status(400).json({ message: 'All fields are required' })
    }

    const review = await Review.create({ user, title, text, rating, nameBarber })

    if (review) {
        return res.status(201).json({ message: 'New review created' })
    } else {
        return res.status(400).json({ message: 'Invalid order data received' })
    }

}

const updateReview = async (req: Request, res: Response) => {
    const { id, user, title, text, rating, nameBarber } = req.body

    if (!id || !user || !title || !text || !rating || !nameBarber) {
        return res.status(400).json({ message: 'All fields are required' })
    }

    const review = await Review.findById(id).exec()

    if (!review) {
        return res.status(400).json({ message: 'Review not found' })
    }

    review.user = user
    review.title = title
    review.nameBarber = nameBarber
    review.text = text
    review.rating = rating

    const updatedReview = await review.save()

    res.json(`Review for ${updatedReview.title} updated`)
}

const deleteReview = async (req: Request, res: Response) => {
    const { id } = req.body

    if (!id) {
        return res.status(400).json({ message: 'Review ID required' })
    }

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