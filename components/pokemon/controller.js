const { PromiseProvider } = require('mongoose');
const store = require('./store'); 

function listPokemons(){
    return store.list();
}

function pokeDetails(name){
    return store.details(name);
}

module.exports = {
    listPokemons,
    pokeDetails
}