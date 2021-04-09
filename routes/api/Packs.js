const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require("jsonwebtoken");
const bodyParser = require('body-parser');
const { check, body, validationResult } = require('express-validator');
const urlencodedParser = bodyParser.urlencoded({extended:false})
const secret = process.env.jwtSecret;

const User = require("../../models/User");

router.post('/buypacks' + '/:id', (req, res) => {
    console.log(req.params.id)
    //req.body.item
    //{ "numberOfPacks": 1, "price": 1000 }

    User.findOne({_id: req.params.id})
        .then(user => {
            console.log(user)
            if (user){
                if (user.gold > req.body.item.price){
                    user.gold -= req.body.item.price
                    user.packs += req.body.item.numberOfPacks
                }
            }

            user.save()
                .then(user => res.json({ 'gold': user.gold, 'packs': user.packs}))
        })
})

router.get('/getpacks' + '/:id', (req, res) => {
     if(req.params.id !== null){
        User.findOne({_id: req.params.id})
            .then(user => {
                if(user){
                    res.json(user.packs);
                }
            })
    }
})

module.exports = router;