var express = require('express');
var querystring = require('querystring');
var url = require('url');
var Tags = require('../models/tags');

module.exports = function (router) {
    var tagsRoute = router.route('/tags');

    tagsRoute.get(async function (req, res) {
        try {
            let parsed_url = url.parse(req.url);
            let parsed_queryString = querystring.parse(parsed_url.query || '');
            const where = typeof parsed_queryString.where === 'string' ? JSON.parse(parsed_queryString.where) 
                                : Array.isArray(parsed_queryString.where) ? JSON.parse(parsed_queryString.where.join('')) : {};
            const select = typeof parsed_queryString.select === 'string' ? JSON.parse(parsed_queryString.select) 
                                : Array.isArray(parsed_queryString.select) ? JSON.parse(parsed_queryString.select.join('')) : {};
            
            const tags = await Tags.find(where, select);
            if (tags === null || tags.length === 0) {
                res.status(404);
                var response = {
                    message: "GET: no tags found",
                    data: []
                }
                res.send(response);
                return
            }
            var response_successfull = {
                message: "GET: 200 sucess",
                data: tags
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