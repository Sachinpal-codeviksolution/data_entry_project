import mongoose from "mongoose"
const authSchema = new mongoose.Schema({
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
    }
})

const Auth = mongoose.model('', authSchema)

export default Auth;