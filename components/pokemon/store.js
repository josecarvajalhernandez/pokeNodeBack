const Model = require("./model");
const axios = require("axios");

const listPokemons = async () => {
    const pokemons = [];

    const res = await axios.get(
        "https://pokeapi.co/api/v2/pokemon/?limit=25&offset=0"
    );
    const { data } = res;

    for (const pokemon of data.results) {
        const respuesta = await axios.get(pokemon.url);
        const { data } = respuesta;

        const abilities = data.abilities.map((obj) => {
            return obj.ability.name;
        });
        const types = data.types.map((obj) => {
            return obj.type.name;
        });
        pokemons.push({
            name: data.name,
            weight: data.weight,
            types: types,
            abilities: abilities,
            image: data.sprites.back_default,
        });
    }
    //console.log(pokemons)
    return pokemons;
};

const pokeDetails = async (name) => {
    const pokemon = [];

    const respuesta = await axios.get(
        "https://pokeapi.co/api/v2/pokemon/" + name
    );
    const { data } = respuesta;

    const abilities = data.abilities.map((obj) => {
        return obj.ability.name;
    });
    const types = data.types.map((obj) => {
        return obj.type.name;
    });

    pokemon.push({
        name: data.name,
        weight: data.weight,
        image: data.sprites.back_default,
        abilities:abilities,
        types:types
    });
    console.log(pokemon);
    return pokemon;
};

module.exports = {
    list: listPokemons,
    details: pokeDetails,
};
