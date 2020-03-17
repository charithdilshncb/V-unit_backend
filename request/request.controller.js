const express = require('express');
const router = express.Router();
const requestService = require('./request.service');
const Request = require('./request.model');

// routesI
router.post('/create', create);
router.get('/', getAll);
router.get('/current', getCurrent);
router.get('/:id', getById);
router.put('/:id', update);
router.delete('/:id', _delete);
router.get('/users/:id', findById);
router.get('/unapproved', getAllUnApproved);
router.post('/approveReq',approveReq);

module.exports = router;


function create(req, res, next) {
    console.log(req.body.title);
    requestService.create(req.body)
        .then(() =>{
            console.log("success");
            res.json({
            
                success:"true"
            })

        } )
        .catch((err) => {
           console.log(err);
            next(err)
            
        });
}

function approveReq(req,res){
      console.log(req.body.id);
    var id= req.body.id;
    Request.findByIdAndUpdate({_id:id},{$set: {approve:true}})
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
    requestService.getAll()
        .then(request => res.json(request))
        .catch(err => next(err));
}

function getAllUnApproved(req, res, next) {
   
    requestService.getAllRequest()
        .then((request) =>{
            console.log(request);
            res.json(request)
        } )
        .catch((err) => {
            console.log(err);
            next(err)
        });
}

function getCurrent(req, res, next) {
    requestService.getById(req.request.sub)
        .then(request => request ? res.json(request) : res.sendStatus(404))
        .catch(err => next(err));
}
function findById(req, res, next) {
    requestService.findById({users: req.params.id})
        .then(user => request ? res.json(user) : res.sendStatus(404))
        .catch(err => next(err));
}
function getById(req, res, next) {
    requestService.getById(req.params.id)
        .then(request => request ? res.json(request) : res.sendStatus(404))
        .catch(err => next(err));
}

function update(req, res, next) {
    requestService.update(req.params.id, req.body)
        .then(() => res.json({}))
        .catch(err => next(err));
}

function _delete(req, res, next) {
    requestService.delete(req.params.id)
        .then(() => res.json({}))
        .catch(err => next(err));
}