const userModel = require("../Models/UserSchema")
const bcrypt = require('bcrypt');

const userController = {
    getSingleUser: async (req, res) => {
        const { id } = req.params

        const user = await userModel.findById(id)

        if (!user) {
            res.json({
                message: "User not found",
                status: false
            })
        } else {
            res.json({
                message: "User found",
                data: user,
                status: true
            })
        }
    },
    getAllUsers: async (req, res) => {
        const users = await userModel.find()
        if (users.length > 0) {
            res.json({
                message: "Users found",
                data: users,
                status: true
            })
        } else {
            res.json({
                message: "No users found",
                status: false
            })
        }
    },
    signupUser: async (req, res) => {
        const { name, role, email, password } = req.body
          // Validate the data
        if (!name || !role || !email || !password) {
            res.json({
                message: "Please fill in all fields",
                status: false
            })
        } else {
            // Hash the password
            const hashPassword = await bcrypt.hash(password, 10)

            // Check if user already exists
            const user = await userModel.findOne({ email })
            if (user) {
                res.json({
                    message: "User already exists with this email address",
                    status: false
                })
            } else {
                // Create new user
                const newUser = new userModel({
                    name,
                    role,
                    email,
                    password: hashPassword
                })

                newUser.save()
                res.json({
                    message: "User created successfully",
                    data: newUser,
                    status: true
                })

            }
        }

    },
    loginUser: async (req, res) => {
        const { email, password } = req.body

        // Validate the data
        if (!email || !password) {
            res.json({
                message : "Please fill in all fields",
                status: false
            })
        } else {
            // Check if user already exists
            const user = await userModel.findOne({ email })
            if (user) {
                const comparePassword = await bcrypt.compare(password,user.password)

                // Check if password matches
                if (comparePassword) {
                    res.json({
                        message: "Logged in successfully",
                        data: user,
                        status: true
                    })
                } else {
                    res.json({
                        message: "Incorrect password",
                        status: false
                    })
                }

            } else {

                res.json({
                    message: "account doesnot exist please signup first",
                    status: false
                })

            }
        }

    },
    updateUser: async (req, res) => {
        const { id } = req.params
        const { name, role, email, password,contact } = req.body

        const objToSend = { name, role, email, password,contact }
        const updateUser = await userModel.findByIdAndUpdate(id, objToSend, { new: true })
        if (updateUser) {
            res.json({
                message: "User updated successfully",
                data: updateUser,
                status: true
            })
        } else {
            res.json({
                message: "something went wrong",
                status: false
            })
        }
    },
    deleteUser: async (req, res) => {
        const { id } = req.params
        const deleteUser = await userModel.findByIdAndDelete(id)

        if (deleteUser) {
            res.json({
                message: "User deleted successfully",
                data: deleteUser,
                status: true
            })
        } else {
            res.json({
                message: "something went wrong",
                status: false
            })
        }
    },
}


module.exports = userController