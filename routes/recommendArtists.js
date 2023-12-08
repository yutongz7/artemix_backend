var express = require('express');
var querystring = require('querystring');
var url = require('url');
var RecommendArtists = require('../models/recommendArtists');

module.exports = function (router) {
    var recommendArtistsRoute = router.route('/recommendArtists');

    recommendArtistsRoute.get(async function (req, res) {
        try {
            let parsed_url = url.parse(req.url);
            let parsed_queryString = querystring.parse(parsed_url.query || '');
            const where = typeof parsed_queryString.where === 'string' ? JSON.parse(parsed_queryString.where) 
                                : Array.isArray(parsed_queryString.where) ? JSON.parse(parsed_queryString.where.join('')) : {};
            const select = typeof parsed_queryString.select === 'string' ? JSON.parse(parsed_queryString.select) 
                                : Array.isArray(parsed_queryString.select) ? JSON.parse(parsed_queryString.select.join('')) : {};
            
            const recommendArtists = await RecommendArtists.find(where, select);
            if (recommendArtists === null || recommendArtists.length === 0) {
                res.status(404);
                var response = {
                    message: "GET: no recommendArtists found",
                    data: []
                }
                res.send(response);
                return
            }
            const recommendArtistsData = recommendArtists.map((recommend) => ({
                ...recommend._doc,
                recommendArtistIds: Object.fromEntries(recommend.recommendArtistIds)
            }));
            var response_successful = {
                message: "GET: 200 success",
                data: recommendArtistsData
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

    recommendArtistsRoute.post(async function (req, res) {
        try {
            const { userId, recommendArtistIds } = req.body;
    
            let existingRecommend = await RecommendArtists.findOne({ userId });
            console.log('Received data:', recommendArtistIds);
    
            if (existingRecommend) {
                console.log(existingRecommend.recommendArtistIds)
                existingRecommend.recommendArtistIds = Object.entries(recommendArtistIds);
                await existingRecommend.save();
                console.log(existingRecommend.recommendArtistIds)
    
                res.status(200).json({
                    message: 'POST: 200 success (updated)',
                    data: existingRecommend,
                });
            } else {
                const newRecommendArtist = new RecommendArtists({
                    userId,
                    recommendArtistIds: new Map(Object.entries(recommendArtistIds)),
                });
    
                await newRecommendArtist.save();
    
                res.status(201).json({
                    message: 'POST: 201 created',
                    data: newRecommendArtist,
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