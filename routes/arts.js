var express = require('express');
var Arts = require('../models/arts');

module.exports = function (router) {
    var artsRoute = router.route('/arts');

    artsRoute.get(async (req, res) => {
        try {
            const arts = await Arts.find().lean().exec();

            if (!arts || arts.length === 0) {
                res.status(404).json({
                    message: "GET: No arts found",
                    data: []
                });
            } else {
                res.status(200).json({
                    message: "GET: 200 success",
                    data: arts
                });
            }
        } catch (err) {
            res.status(500).json({
                message: "GET: 500 server error",
                data: { err }
            });
        }
    });

    // TODO: POST/PUT function for edit preferences tags
    artsRoute.post(async function (req, res) {
        try {
            const { artID, userId, userName, artTitle, artContent, artAddress, artTags, width, height} = req.body;
    
            let existingArt = await Arts.findOne({ artId });
    
            if (existingArt) {
                existingArt.artTitle = artTitle;
                existingArt.artContent = artContent;
                existingArt.artAddress = artAddress;
                existingArt.artTags= artTags;
                existingArt.width = width;
                existingArt.height = height;
                await existingArt.save();
    
                res.status(200).json({
                    message: 'POST: 200 success (updated)',
                    data: existingArt,
                });
            } else {
                const newArt = new Arts({
                    artID, userId, userName, artTitle, artContent, artAddress, artTags, width, height
                });
    
                await newArt.save();
    
                res.status(201).json({
                    message: 'POST: 201 created',
                    data: newArt,
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