const express = require('express');
const response = require('../../network/response');
const controller = require('./controller');
const router = express.Router();

router.get('/:name', function(req, res){
    controller.pokeDetails(req.params.name)
        .then(pokemon =>{
            response.success(req, res, pokemon, 200) 
        })
        .catch(e=>{
            response.error(req, res,'Unexpected Error', 500, e);
        })
});

router.get('/', function(req, res){
    controller.listPokemons()
        .then(pokemons =>{
            response.success(req, res, pokemons, 200) 
        })
        .catch(e=>{
            response.error(req, res,'Unexpected Error', 500, e);
        })
});

module.exports = router;