import mongoose from 'mongoose'

interface IUser extends Document {
    username: string;
    password: string;
    roles: string[];
    active: boolean;
    rating: string;
    phone?: string;
}

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    roles: [{
        type: String,
        default: "Employee"
    }],
    active: {
        type: Boolean,
        default: true
    },
    rating: {
        type: String,
        default: "0" as unknown as () => string
    },
    phone: {
        type: String,
    }
})

export default mongoose.model<IUser>('User', userSchema);