import user_register from '../../../model/SUPER_ADMIN/user_register.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

class user {
    async dashboard(req, res) {
        try {
            const loginPerson = req.user.userID;
            console.log(loginPerson);
            const person = await user_register.findById(loginPerson);
            console.log({person});
            res.render('user/User_dashbord', { person });
        } catch (error) {
            console.log(error);
        }

    }

    async loginPage(req, res) {
        try {
            res.render('user/login');
        } catch (error) {
            console.log(error)
        }
    }

    async login(req, res) {
        try {
            const { email, password } = req.body;
            if (email && password) {
                const user = await user_register.findOne({ email: email });
                if (user) {
                    const isMatch = await bcrypt.compare(password, user.password);
                    if (isMatch && (user.email === email)) {
                        const token = jwt.sign({ userID: user._id }, process.env.JWT_SECRET_KEY, { expiresIn: '1h' });
                        res.cookie('token', token, { httpOnly: true });
                        res.redirect('/user/dashboard');
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

    async updatepage(req, res) {
        try {
            const { id } = req.params;
            const user = await user_register.findById(id);
            const person =user
          
            // const person = await register.findById(id);
            res.render('user/update', { person });
        } catch (error) {
            console.log(error);
        }
    }

    async update(req, res) {
        try {
            const { idd } = req.params;
            const { name, email, phone, idValue, AC_name, AC_bank, AC_number, AC_ifsc, AC_branch, AC_address } = req.body;
            await user_register.findByIdAndUpdate(idd, { name, email, phone, idValue, AC_name, AC_bank, AC_number, AC_ifsc, AC_branch, AC_address });
            res.redirect('/user/dashboard');
        } catch (error) {
            console.log(error);
        }
    }

    async logout(req, res) {
        try {
            res.clearCookie('token');
            res.redirect('/user/login');
        } catch (error) {
            console.log(error);
        }
    }
}


export default new user();