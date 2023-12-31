const express = require('express');
const querystring = require('querystring');
const url = require('url');
const Chats = require('../models/chats');

module.exports = function (router) {
    const chatsRoute = router.route('/chats');

    chatsRoute.get(async function (req, res) {
        try {
            const parsed_url = url.parse(req.url);
            const parsed_queryString = querystring.parse(parsed_url.query || '');
            const where = typeof parsed_queryString.where === 'string' ? JSON.parse(parsed_queryString.where)
                : Array.isArray(parsed_queryString.where) ? JSON.parse(parsed_queryString.where.join('')) : {};
            const select = typeof parsed_queryString.select === 'string' ? JSON.parse(parsed_queryString.select)
                : Array.isArray(parsed_queryString.select) ? JSON.parse(parsed_queryString.select.join('')) : {};

            const chats = await Chats.find(where, select);
            if (!chats || chats.length === 0) {
                res.status(404).json({
                    message: "GET: no chats found",
                    data: []
                });
                return;
            }

            const chatsData = chats.map((chat) => ({
                ...chat._doc,
                ArtistIdToChats: Object.fromEntries(chat.ArtistIdToChats)
            }));

            res.status(200).json({
                message: "GET: 200 success",
                data: chatsData
            });
        } catch (err) {
            console.error(err);
            res.status(500).json({
                message: "GET: 500 server error",
                data: { err }
            });
        }
    });

    chatsRoute.post(async function (req, res) {
        try {
            const { ChatId, CurrUserId, ArtistIdToChats } = req.body;

            let existingChat = await Chats.findOne({ ChatId });

            if (existingChat) {
                existingChat.CurrUserId = CurrUserId;
                existingChat.ArtistIdToChats = new Map(Object.entries(ArtistIdToChats));
                await existingChat.save();

                res.status(200).json({
                    message: 'POST: 200 success (updated)',
                    data: existingChat,
                });
            } else {
                const newChat = new Chats({
                    ChatId,
                    CurrUserId,
                    ArtistIdToChats: new Map(Object.entries(ArtistIdToChats)),
                });

                await newChat.save();

                res.status(201).json({
                    message: 'POST: 201 created',
                    data: newChat,
                });
            }
        } catch (err) {
            console.error(err);
            res.status(500).json({
                message: 'POST: 500 server error',
                data: { err },
            });
        }
    });

    return router;
};


// var express = require('express');
// var querystring = require('querystring');
// var url = require('url');
// var Chats = require('../models/chats');

// module.exports = function (router) {
//     var chatsRoute = router.route('/chats');

//     chatsRoute.get(async function (req, res) {
//         try {
//             let parsed_url = url.parse(req.url);
//             let parsed_queryString = querystring.parse(parsed_url.query || '');
//             const where = typeof parsed_queryString.where === 'string' ? JSON.parse(parsed_queryString.where) 
//                                 : Array.isArray(parsed_queryString.where) ? JSON.parse(parsed_queryString.where.join('')) : {};
//             const select = typeof parsed_queryString.select === 'string' ? JSON.parse(parsed_queryString.select) 
//                                 : Array.isArray(parsed_queryString.select) ? JSON.parse(parsed_queryString.select.join('')) : {};
            
//             const chats = await Chats.find(where, select);
//             if (chats === null || chats.length === 0) {
//                 res.status(404);
//                 var response = {
//                     message: "GET: no chats found",
//                     data: []
//                 }
//                 res.send(response);
//                 return
//             }
//             const chatsData = chats.map((like) => ({
//                 ...like._doc,
//                 artistIdToLikedArts: Object.fromEntries(like.artistIdToLikedArts)
//             }));
//             var response_successful = {
//                 message: "GET: 200 success",
//                 data: chatsData
//             }
//             res.status(200);
//             res.send(response_successful);
//             return
//         } catch (err) {
//             res.status(500);
//             var response_err = {
//                 message: "GET: 500 server error",
//                 data: {err}
//             }
//             res.send(response_err);
//             return
//         }
//     })

//     chatsRoute.post(async function (req, res) {
//         try {
//             const { likeFromUserId, artistIdToLikeCount, likedArtIds } = req.body;
    
//             let existingLike = await Chats.findOne({ likeFromUserId });
    
//             if (existingLike) {
//                 existingLike.artistIdToLikedArts = new Map(Object.entries(artistIdToLikeCount));
//                 existingLike.likedArtIds = likedArtIds;
//                 await existingLike.save();
    
//                 res.status(200).json({
//                     message: 'POST: 200 success (updated)',
//                     data: existingLike,
//                 });
//             } else {
//                 const newLike = new Chats({
//                     likeFromUserId,
//                     artistIdToLikedArts: new Map(Object.entries(artistIdToLikeCount)),
//                     likedArtIds,
//                 });
    
//                 await newLike.save();
    
//                 res.status(201).json({
//                     message: 'POST: 201 created',
//                     data: newLike,
//                 });
//             }
//         } catch (err) {
//             res.status(500).json({
//                 message: 'POST: 500 server error',
//                 data: { err },
//             });
//         }
//     });
//     return router;
// }