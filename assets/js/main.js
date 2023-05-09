const pokemonList = document.getElementById('pokemonList')
const loadMoreButton = document.getElementById('loadMoreButton')

const maxRecords = 151
const limit = 10
let offset = 0;

function convertPokemonToLi(pokemon) {
    return `
        <li class="pokemon ${pokemon.type}" (click)={href='/pokemonDetail.html'} >
            <span class="number">#${pokemon.number}</span>
            <span class="name">${pokemon.name}</span>

            <div class="detail">
                <ol class="types">
                    ${pokemon.types.map((type) => `<li class="type ${type}">${type}</li>`).join('')}
                </ol>

                <img src="${pokemon.photo}"
                     alt="${pokemon.name}">
            </div>
            <button type="button" class="btn btn-outline-light" data-bs-toggle="modal" data-bs-target="#staticBackdrop${pokemon.number}">
                Datail
            </button>
        </li>


        <div class="modal fade" id="staticBackdrop${pokemon.number}" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1"
        aria-labelledby="staticBackdropLabel" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered">
            <div class="modal-content ${pokemon.type}">
                <div class="modal-header">
                    <h1 class="modal-title fs-3 fw-bold" id="staticBackdropLabel">${pokemon.name}</h1>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <div class="container d-flex justify-content-between flex-wrap">
                        <div class="col-6 d-flex flex-column">
                            <p class="fs-4 fw-bold text-light m-0">Height</p>
                            <p class="fs-4 text-dark">${pokemon.height}m</p>
                        </div>
                        <div class="col-6 d-flex flex-column">
                            <p class="fs-4 fw-bold text-light m-0">Weight</p>
                            <p class="fs-4 text-dark">${pokemon.weight}kg</p>
                        </div>
                        <div class="col-6 d-flex flex-column">
                            <p class="fs-4 fw-bold text-light m-0">Abilities</p>
                            <p class="fs-4 text-dark">${pokemon.abilities[0]}m</p>
                        </div>
                        <div class="col-6 d-flex flex-column">
                            <p class="fs-4 fw-bold text-light m-0">Species</p>
                            <p class="fs-4 text-dark">${pokemon.species}m</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    `
}

function loadPokemonItens(offset, limit) {
    pokeApi.getPokemons(offset, limit).then((pokemons = []) => {
        const newHtml = pokemons.map(convertPokemonToLi).join('')
        pokemonList.innerHTML += newHtml
    })
}

loadPokemonItens(offset, limit)

loadMoreButton.addEventListener('click', () => {
    offset += limit
    const qtdRecordsWithNexPage = offset + limit

    if (qtdRecordsWithNexPage >= maxRecords) {
        const newLimit = maxRecords - offset
        loadPokemonItens(offset, newLimit)

        loadMoreButton.parentElement.removeChild(loadMoreButton)
    } else {
        loadPokemonItens(offset, limit)
    }
})

