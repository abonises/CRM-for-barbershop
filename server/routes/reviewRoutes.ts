import express from 'express'
const router = express.Router()
import reviewsController from '../controllers/reviewsController'

router.route('/')
    .get(reviewsController.getAllReviews)
    .post(reviewsController.createNewReview)
    .patch(reviewsController.updateReview)
    .delete(reviewsController.deleteReview)

export default router;