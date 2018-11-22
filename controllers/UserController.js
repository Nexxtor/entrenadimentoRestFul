var mongoose = require('mongoose');
var userModel = require('../models/User');

let controller = {};

// Obtener todos los usuarios
controller.getAll = function (req, res) {
    userModel.find({}, function (err, users) {
        if (err) {
            res.status(500);
            res.json({
                ok: false,
                err
            });
        } else {
            res.json({
                ok: true,
                users
            });
        }
    });
};

controller.getOne = function (req, res) {
    userModel.findOne({
        _id: req.params.id
    }, function (err, user) {
        if (err) {
            res.status(500);
            res.json({
                ok: false,
                err
            });
        } else {
            res.json({
                ok: true,
                user
            });
        }
    });
};

controller.update = function (req, res) {
    // Falta validar si exiten los atributos
    let update = {
        username: req.body.username,
        name: req.body.name,
        lastname: req.body.lastname
    };
    userModel.findByIdAndUpdate(req.params.id, update, function (err, old) {
        if (err) {
            res.status(500);
            res.json({
                ok: false,
                err
            })
        } else {
            res.json({
                ok: true,
                old,
                update
            });
        }
    });
};

controller.insert = function(req,res){
    let userNew = new userModel({
        name: req.body.name,
        lastname: req.body.lastname,
        username: req.body.username
    });

    userNew.save(function(err,insertado){
        if(err){
            res.status(500);
            res.json({
                ok: false,
                err
            });
        } else {
            res.json({
                ok: true,
                insertado
            });
        }
    });
};

controller.delete =  function(req,res){
    userModel.findByIdAndRemove(req.params.id, function(err, eliminado){
        if(err){
            res.status(500);
            res.json({
                ok: false,
                err
            });
        } else {
            res.json({
                ok: true,
                eliminado
            });
        }
    });
}
module.exports = controller;