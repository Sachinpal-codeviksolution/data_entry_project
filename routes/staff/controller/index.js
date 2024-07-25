import user_register from '../../../model/SUPER_ADMIN/user_register.js';
import staff_register from '../../../model/SUPER_ADMIN/staff_register.js';

import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

class staff {
    async dashboard(req, res) {
        try {
            let data = await user_register.find({author:req.user.userID});
            // console.log(req.user.userID);
            res.render('staff/staff_dashboard', { data });
        } catch (error) {
            console.log(error);
        }
    }

    async register(req, res) {
        try {
            const { name, phone, email, password, password_confirmation } = req.body;
            let userId=req.user.userID;
            const user = await user_register.findOne({ email: email });
            if (user) {
                res.status(400).json({ message: "Email already exists." });
            } else {
                if (name && phone && email && password && password_confirmation) {
                    if (password === password_confirmation) {
                        const salt = await bcrypt.genSalt(10);
                        const hashPassword = await bcrypt.hash(password, salt);
                        const data={ name, email, phone, author:userId,password: hashPassword }
                        console.log(data);
                        await user_register.create(data);
                        res.redirect('/staff/dashboard');
                    } else {
                        res.status(400).json({ message: "Password and password confirmation must be same." });
                    }
                } else {
                    res.status(400).json({ message: "Please fill all fields." });
                }
            }

        } catch (error) {
            console.log(error);
        }
    }

    async loginPage(req, res) {
        try {
            res.render('staff/login');
        } catch (error) {
            console.log(error);
        }
    }

    async login(req, res) {
        try {
            const { email, password } = req.body;
            if (email && password) {
                const user = await staff_register.findOne({ email: email });
                if (user && (user.type === 'Staff')) {
                    const isMatch = await bcrypt.compare(password, user.password);
                    if (isMatch && (user.email === email)) {
                        const token = jwt.sign({ userID: user._id }, process.env.JWT_SECRET_KEY, { expiresIn: '1h' });
                        res.cookie('token', token, { httpOnly: true });
                        res.redirect('/staff/dashboard');

                    } else {
                        res.status(400).json({ message: "Invalid email or password." })
                    }

                } else {
                    res.status(400).json({ message: "You are not a registered user" });
                }
            } else {
                res.status(400).json({ message: "Please fill all fields." })
            }
        } catch (error) {
            console.log(error)
        }
    }

    async add(req, res) {
        try {
            res.render('./staff/register');
        } catch (error) {
            console.log(error)
        }
    }

    async delete(req, res) {
        try {
            const { id } = req.params;
            await user_register.findByIdAndDelete(id);
            console.log("delete successfully ");
            res.redirect('/staff/dashboard')
        } catch (error) {
            console.log(error);
        }
    }

    async updatepage(req, res) {
        try {
            const { id } = req.params;
            const person = await user_register.findById(id);
            res.render('staff/update', { person });
        } catch (error) {
            console.log(error);
        }
    }

    async update(req, res) {
        try {
            const { idd } = req.params;
            const { name, email, phone, idValue, AC_name, AC_bank, AC_number, AC_ifsc, AC_branch, AC_address } = req.body;
            await user_register.findByIdAndUpdate(idd, { name, email, phone, idValue, AC_name, AC_bank, AC_number, AC_ifsc, AC_branch, AC_address });
            res.redirect('/staff/dashboard');
        } catch (error) {
            console.log(error);
        }
    }

    async logout(req,res){
        try {
            res.clearCookie('token');
            res.redirect('/staff/login');
        } catch (error) {
            console.log(error);
        }
    }
}

export default new staff();