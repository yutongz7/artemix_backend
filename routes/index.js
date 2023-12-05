module.exports = function (app, router) {
    app.use('/', require('./home.js')(router));
    app.use('/users', require('./users.js')(router));
    app.use('/arts', require('./arts.js')(router));
    app.use('/tags', require('./tags.js')(router));
    app.use('/likes', require('./likes.js')(router));
    app.use('/comments', require('./comments.js')(router));
    app.use('/chats', require('./chats.js')(router));
    app.use('/recommendArtists', require('./recommendArtists.js')(router));
    
    return router;
};