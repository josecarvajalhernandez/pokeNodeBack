const axios = require("axios");

const listPokemons = async () => {
    const pokemons = [];

    const res = await axios.get(
        "https://pokeapi.co/api/v2/pokemon/?limit=151&offset=0"
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
            image: data.sprites.front_default,
        });
    }
    //console.log(pokemons)
    return pokemons;
};

const build_evo_list = (data, evo_list) => {
    evo_list.push(data.species.name)
  
    if (data.evolves_to.length === 0) return
  
    build_evo_list(data.evolves_to[0], evo_list)
}

const pokeDetails = async (name) => {
    const pokemon = [];
    const evo_list = [];

    const respuesta = await axios.get(
        "https://pokeapi.co/api/v2/pokemon/" + name
    );

    const { data } = respuesta;
    const especie = await axios.get(
        "https://pokeapi.co/api/v2/pokemon-species/" + data.id
    );
    
    const url_evo = especie.data.evolution_chain.url;
    
    const evo = await axios.get(url_evo);

    build_evo_list(evo.data.chain, evo_list)
    
    const abilities = data.abilities.map((obj) => {
        return obj.ability.name;
    });
    const types = data.types.map((obj) => {
        return obj.type.name;
    });

    pokemon.push({
        name: data.name,
        weight: data.weight,
        image: data.sprites.front_default,
        abilities:abilities,
        types:types,
        evolution_chain:evo_list
    });
    console.log(pokemon);
    return pokemon;
};

module.exports = {
    list: listPokemons,
    details: pokeDetails,
};
