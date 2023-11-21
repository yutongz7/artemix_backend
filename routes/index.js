module.exports = function (app, router) {
    app.use('/api', require('./home.js')(router));
    app.use('/api/users', require('./users.js')(router));
    app.use('/api/arts', require('./arts.js')(router));
    app.use('/api/tags', require('./tags.js')(router));
    app.use('/api/likes', require('./likes.js')(router));
    return router;
};