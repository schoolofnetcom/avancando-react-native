var express = require('express');
var router = express.Router();
var translate = require('google-translate-api');
var History   = require('./../models/history');
var mongoose  = require('mongoose');

router.post('/', function(req, res, next) {
    translate(req.body.text , { to: req.body.to }).then(tres => {
        History
            .findOne({
                'text': tres.text
            })
            .exec()
            .then(function(data) {
                if (!data) {
                    var history = new History({
                        text: tres.text,
                        time: 1
                    });

                    return history
                        .save()
                        .then(function(result) {
                            return res.status(200).json({
                                status: true,
                                data: result
                            });
                        });
                }

                var newTime = data.time + 1;

                return History
                    .findOneAndUpdate({
                        _id: new mongoose.Types.ObjectId(data._id)
                    }, {
                        time: newTime
                    }, {
                        new: true
                    })
                    .exec()
                    .then(function(uResult) {
                        return res.status(200).json({
                            status: true,
                            data: uResult
                        });
                    });
            });
    }).catch(err => {
        console.error(err);
    });
});

router.get('/:id', function(req, res, next) {
    History
        .findOne({
            '_id': req.params.id
        })
        .exec()
        .then(function(data) {
            if (!data) {
                return res.status(200).json({
                    status: true,
                    data: {}
                });
            }

            return res.status(200).json({
                status: true,
                data: data
            });
        });
});

module.exports = router;
