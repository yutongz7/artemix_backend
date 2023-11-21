var express = require('express');
var querystring = require('querystring');
var url = require('url');
var Arts = require('../models/arts');

module.exports = function (router) {
    var artsRoute = router.route('/arts');

    artsRoute.get(async function (req, res) {
        try {
            let parsed_url = url.parse(req.url);
            let parsed_queryString = querystring.parse(parsed_url.query || '');
            const where = typeof parsed_queryString.where === 'string' ? JSON.parse(parsed_queryString.where) 
                                : Array.isArray(parsed_queryString.where) ? JSON.parse(parsed_queryString.where.join('')) : {};
            const select = typeof parsed_queryString.select === 'string' ? JSON.parse(parsed_queryString.select) 
                                : Array.isArray(parsed_queryString.select) ? JSON.parse(parsed_queryString.select.join('')) : {};
            
            const arts = await Arts.find(where, select);
            if (arts === null || arts.length === 0) {
                res.status(404);
                var response = {
                    message: "GET: no arts found",
                    data: []
                }
                res.send(response);
                return
            }
            var response_successfull = {
                message: "GET: 200 sucess",
                data: arts
            }
            res.status(200);
            res.send(response_successfull);
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
    return router;
}