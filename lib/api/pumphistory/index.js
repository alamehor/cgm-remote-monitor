'use strict';

var consts = require('../../constants');

function configure (app, wares, pumphistory) {
    var express = require('express'),
        api = express.Router( );

    // invoke common middleware
    api.use(wares.sendJSONStatus);
    // text body types get handled as raw buffer stream
    api.use(wares.bodyParser.raw( ));
    // json body types get handled as parsed json
    api.use(wares.bodyParser.json( ));
    // also support url-encoded content-type
    api.use(wares.bodyParser.urlencoded({ extended: true }));

    // List settings available
    api.get('/pumphistory/', function(req, res) {
        pumphistory.list({}, function (err, pumphistory) {
            return res.json(pumphistory);
        });
    });

    function config_authed (app, api, wares, pumphistory) {

        api.post('/pumphistory/', /*TODO: auth disabled for now, need to get login figured out... wares.verifyAuthoriza
            var pumprecord = req.body;
            pumphistory.create(pumprecord, function (err, created) {
                if (err)
                    res.sendJSONStatus(res, consts.HTTP_INTERNAL_ERROR, 'Mongo Error', err);
                else
                    res.json(created);
            });
        });

    }

    if (app.enabled('api')) {
        config_authed(app, api, wares, pumphistory);
    }

    return api;
}

module.exports = configure;

