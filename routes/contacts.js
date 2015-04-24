var router = require('express').Router();
var ContactModel = require('../models/contacts_model');

router.get('/:id', function (req, res) {
    //res.status(200).json({ message: 'IMPL_101' });
    ContactModel.find({'email' : req.params.id}, function (err, result) {
        if(err) res.status(500).json(err);
        else {
            res.status(200).json(result);
        }
    });
});

router.get('/', function (req, res) {
    //res.status(200).json({ message: 'IMPL_101' });
    ContactModel.find({}, function (err, result) {
        if(err) res.status(500).json(err);
        else {
            res.status(200).json(result);
        }
    });
});

router.post('/', function (req, res) {
    (new ContactModel(req.body)).save(function (err, result) {
        if(err) res.status(500).json(err);
        else res.status(200).json(result);
    });

    //res.status(200).json({ message: 'IMPL_101' });
});
//100: information
//200: successful
//300: redirection
//400: client side error
//500: server side error

router.put('/:id', function (req, res) {
    //res.status(200).json({ message: 'IMPL_101' });

    ContactModel.update({'email' : req.params.id}, { $set: {'name' : req.body.name} }, function (err, result) {
        if(err) res.status(500).json(err);
        else {
            res.status(200).json(result);
        }
    });
});

router.delete('/:id', function (req, res) {
    //res.status(200).json({ message: 'IMPL_101' });
    ContactModel.remove({'email' : req.params.id}, function (err, result) {
        if (err) res.status(500).json(err);
        else {
            res.status(200).json(result);
        }
    });
});

module.exports = router;
