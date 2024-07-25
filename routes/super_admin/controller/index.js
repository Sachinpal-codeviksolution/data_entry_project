import register from '../../../model/SUPER_ADMIN/register.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import nodemailer from 'nodemailer';
import staff_register from '../../../model/SUPER_ADMIN/staff_register.js';
import user_register from '../../../model/SUPER_ADMIN/user_register.js';
import superAdmin_auth from '../../../model/SUPER_ADMIN/SuperadminAuth.js';



// import dotenv from 'dotenv';
class superAdmin {
    async dashboard(req, res) {
        try {
            const filterType = req.query.type;
            let user = await user_register.find({});
            let staff = await staff_register.find({});
            let data = [];

            if (filterType) {
                if (filterType === 'User') {
                    data = user;
                } else if (filterType === 'Staff') {
                    data = staff;
                } else {
                    data = user.concat(staff);
                }
            } else {
                data = user.concat(staff);
            }

            res.render('superAdmin/SA_dashbord', { data });
        } catch (error) {
            console.log(error);
            res.status(500).send('Server Error');
        }
    }

    async register(req, res) {
        try {
            const email = process.env.SUPER_ADMIN_EMAIL;
            const password = process.env.SUPER_ADMIN_PASSWORD;
            const salt = await bcrypt.genSalt(10);
            const hashPassword = await bcrypt.hash(password, salt);
            await superAdmin_auth.create({ email, password: hashPassword });
            res.status(200).json('registred succesfully');
        } catch (error) {
            console.log(error);
        }
    }

    async loginPage(req, res) {
        try {
            res.render('superadmin/login');
        } catch (error) {
            console.log(error)
        }
    }

    async login(req, res) {
        try {
            const { email, password } = req.body;
            console.log(email, password)
            if (email && password) {
                const user = await superAdmin_auth.findOne({ email: email });
                if (user) {
                    const isMatch = await bcrypt.compare(password, user.password);
                    if (isMatch && (user.email === email)) {
                        const token = jwt.sign({ userID: user._id }, process.env.JWT_SECRET_KEY, { expiresIn: '1h' });
                        res.cookie('token', token, { httpOnly: true });
                        console.log('successfully registered');
                        res.redirect('/superadmin/dashboard');

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

    async delete(req, res) {
        try {
            const { id } = req.params;
            const user = await user_register.findById(id);
            if (user) {
                await user_register.findByIdAndDelete(id);
            } else {
                const staff = await staff_register.findById(id);
                if (staff) {
                    await staff_register.findByIdAndDelete(id);
                } else {
                    console.log('something went wrong');
                }
            }
            res.redirect('/superadmin/dashboard')
        } catch (error) {
            console.log(error);
        }
    }

    async updatepage(req, res) {
        try {
            const { id } = req.params;
            const user = await user_register.findById(id);
            let person
            if (user) {
                person = user
            } else {
                const staff = await staff_register.findById(id);
                if (staff) {
                    person = staff
                }
            }

            // const person = await register.findById(id);
            res.render('superAdmin/update', { person });
        } catch (error) {
            console.log(error);
        }
    }

    async update(req, res) {
        try {
            const { id } = req.params;
            const { name, email, phone } = req.body;
            const user = await user_register.findById(id);
            let person
            if (user) {
                await user_register.findByIdAndUpdate(id, { name, email, phone });
            } else {
                const staff = await staff_register.findById(id);
                if (staff) {
                    await staff_register.findByIdAndUpdate(id, { name, email, phone });
                }
            }
            res.redirect('/superadmin/dashboard');
        } catch (error) {
            console.log(error);
        }
    }

    // async sendmail(email, subject, text, html) {
    //     try {
    //         let testAccount = await nodemailer.createTestAccount(); // if you don't have a real account
    //         let transporter = await nodemailer.createTransport({
    //             host: "smtp.ethereal.email",
    //             port: 587,
    //             auth: {
    //                 user: 'zechariah40@ethereal.email',
    //                 pass: 'E11fvFmn1t2nwks4Zk'
    //             },
    //         });

    //         let info = await transporter.sendMail({
    //             from: '"Vinod Thapa 👻" <alexane75@ethereal.email>', // sender address
    //             to: email,
    //             subject: subject,
    //             text: text,
    //             html: html
    //         });

    //         console.log("Message sent: %s", info.messageId);
    //         res.json(info);
    //     } catch (error) {
    //         console.log(error);
    //     }
    // }

    async staffRegisterPage(req, res) {
        try {
            res.render('superAdmin/staff_register');
        } catch (error) {
            console.log(error);
        }
    }

    async staffRegister(req, res) {
        try {
            const { name, phone, email, password, password_confirmation } = req.body;
            const user = await staff_register.findOne({ email: email });
            if (user) {
                res.status(400).json({ message: "Email already exists." });
            } else {
                if (name && phone && email && password && password_confirmation) {
                    if (password === password_confirmation) {
                        const salt = await bcrypt.genSalt(10);
                        const hashPassword = await bcrypt.hash(password, salt);
                        const doc = await staff_register.create({ name, email, phone, password: hashPassword });
                        const saved_user = staff_register.findOne({ email: email });

                        //generate JWT token 
                        const token = jwt.sign({ userID: saved_user._id }, process.env.JWT_SECRET_KEY, { expiresIn: '1d' });
                        res.redirect('/superadmin/dashboard');

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

    async userRegisterPage(req, res) {
        try {
            res.render('superAdmin/user_register');
        } catch (error) {
            console.log(error);
        }
    }

    async userRegister(req, res) {
        try {
            const { name, phone, email, password, password_confirmation } = req.body;
            const user = await user_register.findOne({ email: email });
            if (user) {
                res.status(400).json({ message: "Email already exists." });
            } else {
                if (name && phone && email && password && password_confirmation) {
                    if (password === password_confirmation) {
                        const salt = await bcrypt.genSalt(10);
                        const hashPassword = await bcrypt.hash(password, salt);
                        const doc = await user_register.create({ name, email, phone, password: hashPassword });
                        const saved_user = user_register.findOne({ email: email });
                        //generate JWT token 
                        const token = jwt.sign({ userID: saved_user._id }, process.env.JWT_SECRET_KEY, { expiresIn: '1d' });
                        res.redirect('/superadmin/dashboard');

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

    async logout(req, res) {
        try {
            res.clearCookie('token');
            res.redirect('/superadmin/login');
        } catch (error) {
            console.log(error);
        }
    }
}


export default new superAdmin();