import mongoose from "mongoose"
const registerSchema = new mongoose.Schema({
    email: {
        type: String,
        trim: true,
        required: true
    },
    password:{
        type: String,
        trim: true,
        required: true
    }
   
})

const superAdmin_auth= mongoose.model('Superadmin_auth', registerSchema);

export default superAdmin_auth;