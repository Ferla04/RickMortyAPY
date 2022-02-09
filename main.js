let search = document.getElementById('search');
let cards = document.getElementById('cards');

const getCharacters = async () => {
    try {
        const resPieces = await fetch("https://rickandmortyapi.com/api/character",{
            method: 'GET',
            body: JSON.stringify(),
            headers: { "Content-type": "application/json" }
        })
        let data = await resPieces.json();
        return data.results;

    } catch(error) {
        console.log(error);
    }
}

function createOptions(){
    getCharacters().then(res =>{
        res.forEach(e => {
            let option = document.createElement('option');
            option.className = 'chart';
            option.value = e.id;
            option.innerHTML = e.name;
            search.appendChild(option);
        });
    })
}

function selectCharacter(sectChart){

    cards.innerHTML = '';
    getCharacters().then(res =>{
        if(sectChart == 'all'){
            res.forEach(e => {
                createCards(e);
            })
        }else{
            res.filter(e => {
                if(e.id == sectChart){
                    createCards(e);
                }
            })
        }
    })
}

function createCards(e){
    cards.innerHTML += `
    <div>
        <img src="${e.image}" alt="">
        <article>
            <h1 id="nameC">${e.name}</h1>
            <p id="species">${e.species}</p>
            <p><h3>Gender:</h3>${e.gender}</p>
            <p><h3>Origin:</h3>${e.origin.name}</p>
            <p><h3>Status:</h3>${e.status}</p>
        </article>
    </div>
    `;
}

getCharacters();
createOptions();
selectCharacter('all');