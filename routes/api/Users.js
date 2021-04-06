const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require("jsonwebtoken");
const bodyParser = require('body-parser');
const { check, body, validationResult } = require('express-validator');
const urlencodedParser = bodyParser.urlencoded({extended:false})
const secret = process.env.jwtSecret;

const User = require("../../models/User");

//INCREMENT WIN LOSS OR DRAW
router.post('/setuserdata' + '/:id', (req, res) => {
    console.log(req.body.data)
    if(req.params.id !== null && req.body.data !== null){
        User.findOne({_id: req.params.id})
            .then(user => {
                if(user){
                    user[req.body.data] += 1
                    user.save()
                        .then(user => res.json(user))
                }
            })
    }
})

//GET WIN LOSS DRAW FROM DATABASE
router.get('/userdata' + '/:id', (req, res) => {
    if(req.params.id !== null){
        User.findOne({_id: req.params.id})
            .then(user => {
                if(user){
                    res.json({
                        'wins': user.wins,
                        'losses': user.losses,
                        'draws': user.draws
                    })
                }
            })
    }
})

//@route POST api/users
//@desc Register new user
//@access Public
router.post('/', urlencodedParser, [
    check('name', 'Enter a username')
    .not().isEmpty()
    .bail()
    .custom(value => {
        return User.findOne({name: value}).then(user =>{
            if(user){
                return Promise.reject('Name already in use')
            }
        });
    }),
    check('email')
        .not().isEmpty()
        .withMessage('Enter an email')
        .bail()
        .isEmail()
        .normalizeEmail()
        .withMessage('Email is not valid')
        .bail()
        .custom(value => {
        return User.findOne({email: value}).then(user =>{
            if(user){
                return Promise.reject('E-mail already in use')
            }
        });
    }),
    check('password')
        .not().isEmpty()
        .withMessage('Enter a password')
        .bail()
        .if(body('confirmPassword').not().isEmpty())
        .if(body('password').not().isEmpty())
        .custom((value, { req }) => {
        if (value !== req.body.confirmPassword) {
           
          throw new Error('Passwords do not match');
        }
        return true
      }),
    check('confirmPassword')
    .not().isEmpty()
    .withMessage('Confirm password')

],  (req, res) => {
    const {name, email, password} = req.body;
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json(errors.array());
    }
    const newUser = new User({
        name,
        email,
        password,

    });
    //Create salt and hash
    bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newUser.password, salt, (err,hash) => {
            if(err) throw err;
            newUser.password = hash;
            newUser.save()
                .then(user => {
                    jwt.sign(
                        {id: user.id},
                        secret,
                        {expiresIn: 3600},
                        (err, token) => {
                            if(err) throw err;
                            res.json({
                                token,
                                id: user.id
                            });
                        }
                    )
                });
        })
    })
});

module.exports = router;