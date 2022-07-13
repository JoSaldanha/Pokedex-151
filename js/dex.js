const urlPoke = "https://pokeapi.co/api/v2/pokemon/"
const divPokeList = document.querySelector("#dex")

const createElement = (tag, className)=>{
    const element = document.createElement(tag)
    element.className = className
    return element
}

const createPokeCard = (pokemon)=>{
    const cardLink = createElement('a', 'dex-link')
    const cardDiv = createElement('div', 'card-div')
    const card = createElement('div', 'pokemon')
    const cardBox = createElement('div', 'card-box')
    const pokeNome = createElement('h4','poke-name')

    cardLink.appendChild(cardDiv)
    cardDiv.appendChild(card)
    cardDiv.appendChild(cardBox)
    cardBox.appendChild(pokeNome)

    fetch(urlPoke+pokemon).then(res => res.json()).then((data)=>{
        let nome = data.name
        
        cardLink.setAttribute('href', `/pages/pokemon.html?nome=${nome}`)
        card.style.backgroundImage = `url('${data.sprites.front_default}')`

        pokeNome.innerHTML = nome
    }).catch((e)=>{
        console.log(e)
    })

    return cardLink
}

const loadDex = ()=>{
    for (let i = 1; i <= 151; i++) {
        const card = createPokeCard(i)
        divPokeList.appendChild(card)
    }
}

loadDex()
