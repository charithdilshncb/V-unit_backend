const express = require('express');
const router = express.Router();
const eventService = require('./event.service');
const Event = require('../events/event.model');

// routesI
router.post('/create', create);
router.get('/', getAll);
router.get('/current', getCurrent);
router.get('/:id', getById);
router.put('/:id', update);
router.delete('/:id', _delete);
router.get('/users/:id', findById);
router.post('/approve',approveEvent);
module.exports = router;


function create(req, res, next) {
    eventService.create(req.body)
        .then(() => res.json({}))
        .catch(err => next(err));
}

function approveEvent(req,res){
    
    var id= req.body.id;
    Event.findByIdAndUpdate({_id:id},{$set: {approve:true}})
     .then(event=>{
         res.json({
             success:true
         });
     }).catch(err=>{
         console.log(err);
         res.json({
             success:false
         });
     });
  
}

function getAll(req, res, next) {
    eventService.getAll()
        .then(events => res.json(events))
        .catch(err => next(err));
}

function getCurrent(req, res, next) {
    eventService.getById(req.event.sub)
        .then(event => event ? res.json(event) : res.sendStatus(404))
        .catch(err => next(err));
}
function findById(req, res, next) {
    eventService.findById({users: req.params.id})
        .then(user => event ? res.json(user) : res.sendStatus(404))
        .catch(err => next(err));
}
function getById(req, res, next) {
    eventService.getById(req.params.id)
        .then(event => event ? res.json(event) : res.sendStatus(404))
        .catch(err => next(err));
}

function update(req, res, next) {
    eventService.update(req.params.id, req.body)
        .then(() => res.json({}))
        .catch(err => next(err));
}

function _delete(req, res, next) {
    eventService.delete(req.params.id)
        .then(() => res.json({}))
        .catch(err => next(err));
}