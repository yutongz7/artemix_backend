var express = require('express');
var querystring = require('querystring');
var url = require('url');
var Likes = require('../models/likes');

module.exports = function (router) {
    var likesRoute = router.route('/likes');

    likesRoute.get(async function (req, res) {
        try {
            let parsed_url = url.parse(req.url);
            let parsed_queryString = querystring.parse(parsed_url.query || '');
            const where = typeof parsed_queryString.where === 'string' ? JSON.parse(parsed_queryString.where) 
                                : Array.isArray(parsed_queryString.where) ? JSON.parse(parsed_queryString.where.join('')) : {};
            const select = typeof parsed_queryString.select === 'string' ? JSON.parse(parsed_queryString.select) 
                                : Array.isArray(parsed_queryString.select) ? JSON.parse(parsed_queryString.select.join('')) : {};
            
            const likes = await Likes.find(where, select);
            if (likes === null || likes.length === 0) {
                res.status(404);
                var response = {
                    message: "GET: no likes found",
                    data: []
                }
                res.send(response);
                return
            }
            const likesData = likes.map((like) => ({
                ...like._doc,
                artistIdToLikedArts: Object.fromEntries(like.artistIdToLikedArts)
            }));
            var response_successful = {
                message: "GET: 200 success",
                data: likesData
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
    })

    likesRoute.post(async function (req, res) {
        try {
            const { likeFromUserId, artistIdToLikeCount, likedArtIds } = req.body;
    
            let existingLike = await Likes.findOne({ likeFromUserId });
    
            if (existingLike) {
                existingLike.artistIdToLikedArts = new Map(Object.entries(artistIdToLikeCount));
                existingLike.likedArtIds = likedArtIds;
                await existingLike.save();
    
                res.status(200).json({
                    message: 'POST: 200 success (updated)',
                    data: existingLike,
                });
            } else {
                const newLike = new Likes({
                    likeFromUserId,
                    artistIdToLikedArts: new Map(Object.entries(artistIdToLikeCount)),
                    likedArtIds,
                });
    
                await newLike.save();
    
                res.status(201).json({
                    message: 'POST: 201 created',
                    data: newLike,
                });
            }
        } catch (err) {
            res.status(500).json({
                message: 'POST: 500 server error',
                data: { err },
            });
        }
    });
    return router;
}