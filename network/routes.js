const express = require('express');
const pokemon = require('../components/pokemon/network');

const routes = function (server){
    server.use('/pokemon', pokemon);
}

module.exports = routes;