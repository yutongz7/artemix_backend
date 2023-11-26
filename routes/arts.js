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

    return router;
}