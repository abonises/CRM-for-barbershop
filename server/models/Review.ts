import mongoose from 'mongoose'

const reviewSchema = new mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: 'User'
        },
        title: {
            type: String,
            required: true
        },
        text: {
            type: String,
            required: true
        },
        rating: {
            type: String,
            required: true
        }
    },
    {
        timestamps: true
    }
)


export default mongoose.model('Review', reviewSchema)