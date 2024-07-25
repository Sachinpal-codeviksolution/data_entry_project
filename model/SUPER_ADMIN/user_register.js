import staff_register from './staff_register.js';
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
        default:'User'
    },
    password:{
        type: String,
        trim: true,
        required: true
    },
    id:{
        type: String,
        trim: true,
    },
    idValue:{
        type:String,
        trim:true
    },
    signature: {
        type: String,
    },
    AC_name: {
        type: String,
    },
    AC_bank: {
        type: String,
    },
    AC_number: {
        type: String,
    },
    AC_ifsc: {
        type: String,
    },
    AC_branch: {
        type: String,
    },
    AC_address: {
        type: String,
    },
    author:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'staff_register'
    }  
})

const  superAdmin_user = mongoose.model('superAdmin_user', registerSchema)

export default superAdmin_user;