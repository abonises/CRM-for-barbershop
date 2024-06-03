import mongoose from 'mongoose'

const orderSchema = new mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: 'User'
        },
        name: {
            type: String,
            required: true
        },
        nameBarber: {
            type: String,
            required: true
        },
        surname: {
            type: String,
            required: true
        },
        phone: {
            type: String,
            required: true
        },
        time: {
            type: String,
            required: true
        }
    },
    {
        timestamps: true
    }
)


export default mongoose.model('Order', orderSchema)