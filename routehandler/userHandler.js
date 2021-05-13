const mongoose = require('mongoose')
const router = require('express').Router()
const User = require('../models/user')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')


router.post('/signup', async (req, res, next) => {
    try {

        const hashPassword = await bcrypt.hash(req.body.password, 10)
        const newUser = new User({
            username: req.body.username,
            email: req.body.email,
            password: hashPassword
        })
        await newUser.save()
        res.status(200).json({
            message: 'Signup successful'
        })

    } catch (e) {
        console.log(e)
        res.status(500).json({
            message: 'Signup Fail'
        })
    }
})

router.post('/login', async (req, res, next) => {
    try {
        const user = await User.find({ username: req.body.username })
        if (user && user.length > 0) {
            const isValidPassword = await bcrypt.compare(req.body.password, user[0].password)
            if (isValidPassword) {
                const token = jwt.sign({
                    username: user[0].username,
                    email: user[0].email,
                    userId:user[0]._id
                }, process.env.JWT_SECRET, {
                    expiresIn: '1h'
                })
                res.status(200).json({
                    "access_token": token,
                    message: 'Login success'
                })
            } else {
                res.status(401).json({
                    message: 'Authentication fail'
                })
            }
        } else {
            res.status(401).json({
                message: 'Authentication fail'
            })
        }
    } catch (e) {
        console.log(e)
        res.status(500).json({
            message:'Authentication fail'
        })
    }
})

module.exports = router