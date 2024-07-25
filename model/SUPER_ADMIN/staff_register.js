import mongoose from "mongoose"
const registerSchema = new mongoose.Schema({
    name: {
        type: String,
        trim: true,
        required: true
    },
    phone: {
        type: String,
        trim: true,
        required: true
    },
    email: {
        type: String,
        trim: true,
        required: true
    },
    type: {
        type: String,
        trim: true,
        required: true,
        default:'Staff'
    },
    password:{
        type: String,
        trim: true,
        required: true
    }
   
})

const superAdmin_staff= mongoose.model('superAdmin_staff', registerSchema)

export default superAdmin_staff;