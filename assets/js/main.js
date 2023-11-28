const pokemonList = document.getElementById('pokemonList')
const loadMoreButton = document.getElementById('loadMoreButton')
const maxRecords = 151
//número de pokemons da 1 geração
const limit = 10
let offset = 0;


function loadPokemonItens(offset, limit) {
    pokeApi.getPokemons(offset, limit).then((pokemons = []) => {
        //pega a lista de pokemons, mapeia a lista e converte pra  uma lista de li, junta os lis sem separador, depois concatena no html que tinha
     const newHtml = pokemons.map((pokemon) => ` 
     <li class="pokemon ${pokemon.type}">
        <span class="number">#${pokemon.number}</span>
        <span class="name">${pokemon.name}</span>
    
        <div class="detail">
            <ol class="types">
                    ${pokemon.types.map((type) => `<li class="type ${type}">${type}</li>`).join('')}
                </ol>
    
            <img src="${pokemon.photo}"
                alt="${pokemon.name}">
        </div>
    </li>
    `).join('')
    
       pokemonList.innerHTML += newHtml
    
    })
    
}

loadPokemonItens(offset, limit)

loadMoreButton.addEventListener('click', () => {
    offset += limit
    const qtRecordNextPage = offset + limit

//se a quantidade de pokemons for maior q o max records
    if (qtRecordNextPage >= maxRecords){
        const newLimit =  maxRecords - offset
//é criado o novo limite e esse novo limite é usado para o loadPokemin
        loadPokemonItens(offset, newLimit)
//quando a página tiver exibindo a quant maxima de pokemons, o botão suirá
        loadMoreButton.parentElement.removeChild(loadMoreButton)
    } else {
        loadPokemonItens(offset, limit) 
    }
})