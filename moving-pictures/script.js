const myApi = "4394d7ef7cb01b8b02c56df74ad20b06";

const searchApi = `https://api.themoviedb.org/3/search/movie?&api_key=${myApi}&query=`

const filmImgs = "https://image.tmdb.org/t/p/w500"

const searchHub = document.getElementById('search-hub');
const resultsHub = document.getElementById('results-hub');
const btn = document.getElementById('btn');
const form = document.getElementById('form');
const search = document.getElementById('search');
const results = document.getElementById('results');
const unsuccessPanel = document.getElementById('unsuccess-panel');
const searchTitle = document.getElementById('search-title');
const message = document.getElementById('message');
const filmInfoPanel = document.getElementById('film-info-panel');
const panelName = document.getElementById('panel-name');
const title = document.getElementById('title');
const language = document.getElementById('language');
const rating = document.getElementById('rating');
const date = document.getElementById('date');
const img = document.getElementById('panel-img');
const description = document.getElementById('description');
const body = document.getElementById('body');

form.addEventListener('submit',(e)=>{
    e.preventDefault();
    handleEvents();
})

function handleEvents(){
    if(window.navigator.onLine){
        resultsHub.style.display = "block";
        searchHub.style.display = "none";
        const title = search.value;
        if(title){
            searchTitle.innerText = `showing results for "${title}"`;
            showMovies(searchApi+title);
            search.value = ""
        }
        else{
            searchTitle.innerText = `no results rendered`;
            searchHub.style.display = "none";
            unsuccessPanel.style.display = "flex";
            message.innerHTML = `You didn't enter anything! What about "star wars"?`
        }
    }
    else{
        searchHub.style.display = "none";
        unsuccessPanel.style.display= "flex"
    }
}

function showMovies(url){
    fetch(url).then(res=>res.json())
    .then(function(data){
        if(data.results.length){
            data.results.forEach(element=>{
                if(element.poster_path){
                    const el = document.createElement('div');
                    const image = document.createElement('img');
                    const text = document.createElement('p');

                    text.innerHTML = `${element.title}`;
                    image.src = filmImgs + element.poster_path;
                    el.appendChild(image);
                    el.appendChild(text);
                    el.onclick= ()=>showDetails(element);
                    results.appendChild(el)
                }
            });
        }
        else{
            searchTitle.innerText = "Error! No results";
            searchHub.style.display = "none";
            unsuccessPanel.style.display = "flex";
            message.innerHTML = `We couldn't find anything called that - have you checked your spelling?`;
        }
    })
}

function showDetails(element){
    body.style.overflow ="hidden"
    filmInfoPanel.style.display ="flex";
    img.src = filmImgs + element.poster_path;
    title.innerHTML = `${element.title}`;
    panelName.innerHTML = `${element.title}`;
    date.innerHTML = `${element.release_date}`;
    rating.innerHTML = `${element.vote_average}`;
    description.innerHTML = `${element.overview}`;
    language.innerHTML = `${element.original_language}`
}

function handleBack(){
    location.reload();
}

function handleClose(){
    filmInfoPanel.style.display = "none";
    body.style.overflow = "auto"
}


////////////
