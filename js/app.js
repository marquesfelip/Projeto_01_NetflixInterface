const MOVIES_DAY = 'https://api.themoviedb.org/3/trending/movie/day?api_key=75efc6851dd0dcc7d252dcd886d46635'
const TV_SHOWS_DAY = 'https://api.themoviedb.org/3/trending/tv/week?api_key=75efc6851dd0dcc7d252dcd886d46635'

const TOP_MOVIES = httpGet(MOVIES_DAY)
const TOP_TVS = httpGet(TV_SHOWS_DAY)

const TV_BANNER_TITLE = TOP_TVS['results'][0]['name']
const TV_BANNER_BACKDROP = TOP_TVS['results'][0]['backdrop_path']
const OVERVIEW_PTBR = httpGet(`https://api.themoviedb.org/3/tv/${TOP_TVS['results'][0]['id']}/translations?api_key=75efc6851dd0dcc7d252dcd886d46635`)

// Define a imagem de fundo da série TOP 1 e o título
document.getElementById('banner').style.backgroundImage = `url('https://image.tmdb.org/t/p/original${TV_BANNER_BACKDROP}')`
document.getElementById('banner-title').innerText = TV_BANNER_TITLE

// Define a descrição pt-BR da série no banner
for (const iterator of OVERVIEW_PTBR['translations']) {

    if (iterator['iso_3166_1'] === 'BR') {
        document.getElementById('banner-overview').innerText = iterator['data']['overview']
    }
}

criarLista(TOP_MOVIES, 'carousel-item-filmes')
criarLista(TOP_TVS, 'carousel-item-tvshows')

function httpGet(url) {
    const xhttp = new XMLHttpRequest()
    xhttp.open('GET', url, false)
    xhttp.send(null)
    return JSON.parse(xhttp.responseText)
}

function criarLista(category, idList) {
    for (let index = 0; index < 20; index++) {
        const IMG_POSTER = `https://image.tmdb.org/t/p/w500${category['results'][index]['poster_path']}`

        document.getElementById(idList).innerHTML +=
        `<div class="item">
            <img class="box-filme-tv" src="${IMG_POSTER}" alt="Poster">
        </div>`
    }
}