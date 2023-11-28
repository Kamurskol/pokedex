const pokeApi = {}

function convertPokeApiDetailToPokemon(pokeDetail){
    const pokemon = new Pokemon()
    pokemon.number = pokeDetail.id
    pokemon.name = pokeDetail.name
   
    const types = pokeDetail.types.map((typeSlot) => typeSlot.type.name)
    const [type] = types

    pokemon.types = types
    pokemon.type = type

    pokemon.photo = pokeDetail.sprites.other.dream_world.front_default
    return pokemon

}
//adiciona o metodo getpokemon
//será uma sunção
pokeApi.getPokemonDetail = (pokemon) => {
    return fetch(pokemon.url)
    .then((response) => response.json())
    .then(convertPokeApiDetailToPokemon)
}

//o offset e o limit serão parametros
// o default é 0
pokeApi.getPokemons = (offset = 0, limit = 5) => {
    const url = `https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`
    return  fetch(url)
//busca a lista de pokemoons e converte pra json
        .then((response) => response.json())
//pega a lista que estava dentro do json e transforma em uma nova lista, de promessas
        .then((jsonBody) => jsonBody.results)
//é uma lista de promessas em json
        .then((pokemons) => pokemons.map(pokeApi.getPokemonDetail))
//espera as requisições terminarem
        .then((detailRequests) => Promise.all(detailRequests))
//quando todas as requisiç~es terminarem
        .then((pokemonsDetails) => pokemonsDetails)
}

