var express = require('express');
var querystring = require('querystring');
var url = require('url');
var Users = require('../models/users');

module.exports = function (router) {
    var usersRoute = router.route('/users');

    usersRoute.get(async function (req, res) {
        try {
            let parsed_url = url.parse(req.url);
            let parsed_queryString = querystring.parse(parsed_url.query || '');
            const where = typeof parsed_queryString.where === 'string' ? JSON.parse(parsed_queryString.where) 
                                : Array.isArray(parsed_queryString.where) ? JSON.parse(parsed_queryString.where.join('')) : {};
            const select = typeof parsed_queryString.select === 'string' ? JSON.parse(parsed_queryString.select) 
                                : Array.isArray(parsed_queryString.select) ? JSON.parse(parsed_queryString.select.join('')) : {};
            
            const users = await Users.find(where, select);
            if (users === null || users.length === 0) {
                res.status(404);
                var response = {
                    message: "GET: no users found",
                    data: []
                }
                res.send(response);
                return
            }
            var response_successful = {
                message: "GET: 200 success",
                data: users
            }
            res.status(200);
            res.send(response_successful);
            return
        } catch (err) {
            res.status(500);
            var response_err = {
                message: "GET: 500 server error",
                data: {err}
            }
            res.send(response_err);
            return
        }
    });

    // TODO: POST/PUT function for edit preferences tags
    usersRoute.post(async function (req, res) {
        try {
            const { userId, userName, userPassword, userEmail, userPhone, userProfileImgAddress, userPreferenceTags, tags } = req.body;
    
            let existingUser = await Users.findOne({ userId });
    
            if (existingUser) {
                existingUser.userPreferenceTags = userPreferenceTags;
                existingUser.userName = userName;
                existingUser.userPassword = userPassword;
                existingUser.userEmail = userEmail;
                existingUser.userPhone = userPhone;
                existingUser.userProfileImgAddress = userProfileImgAddress;
                existingUser.tags = tags;
                await existingUser.save();
    
                res.status(200).json({
                    message: 'POST: 200 success (updated)',
                    data: existingUser,
                });
            } else {
                const newUser = new Users({
                    userId,
                    userName,
                    userPassword,
                    userEmail,
                    userPhone,
                    userProfileImgAddress,
                    userPreferenceTags,
                    tags
                });
                await newUser.save();
                console.log(newUser)
                res.status(201).json({
                    message: 'POST: 201 created',
                    data: newUser,
                });
            }
        } catch (err) {
            if (err.name === 'ValidationError') {
                console.error('Validation Error:', err.errors);
                // Send a response indicating validation failure
            } 
            res.status(500).json({
                message: 'POST: 500 server error',
                data: { err },
            });
        }
    });
    return router;
}