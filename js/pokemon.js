const urlPoke = "https://pokeapi.co/api/v2/pokemon/"

const pokeSprite = document.querySelector(".sprites")
const pokeNome = document.querySelector(".poke-nome")
const pokeType = document.querySelector(".type")
const statList = document.querySelector(".list-stats")
const abilities = document.querySelector(".abilities")
const pokeVital = document.querySelector(".vital")

const urlParam = new URLSearchParams(window.location.search)
const pokeParam = urlParam.get('nome')

const createElement = (tag, className)=>{
    const element = document.createElement(tag)
    element.className = className
    return element
}

const createPost = (pokemon)=>{
    const sprite_f = createElement('img','pokeSprite')
    const sprite_b = createElement('img','pokeSprite')
    
    const heightElement = createElement('h4', 'vitalSub')
    const weightElement = createElement('h4', 'vitalSub')

    pokeSprite.appendChild(sprite_f)
    pokeSprite.appendChild(sprite_b)

    pokeVital.appendChild(heightElement)
    pokeVital.appendChild(weightElement)

    fetch(urlPoke+pokemon).then(res => res.json()).then((data)=>{
        let nome = data.name
        let type1 = data.types[0].type.name; let type2 = ''
        let height = data.height.toString().split('')
        let weight = data.weight.toString().split('')

        if(data.types.length > 1){
            type2 = '/ '+data.types[1].type.name
            console.log(type2)
        }

        if (height.length > 1) {
            height.splice(-1, 0, ".")
            height = height.join("")
            console.log(height)
        } else{
            height = '0.' + height.join()
            console.log(height)
        }

        if (weight.length > 1) {
            weight.splice(-1, 0, ".")
            weight = weight.join('')
            console.log(weight)
        } else{
            weight = '0.' + weight.join()
            console.log(weight)
        }

        for (let i = 0; i <= 5; i++) {
            const stat = data.stats[i];
            const element = createElement('h4', 'stats')
            
            let stats = `${stat.stat.name} - ${stat.base_stat}`

            statList.appendChild(element)
            element.innerHTML = stats
        }

        for(let i = 0; i < data.abilities.length; i++){
            const ability = data.abilities[i];
            const element = createElement('h4', 'ability')
            
            let abilityHtml = `ability ${i+1} - ${ability.ability.name}`

            abilities.appendChild(element)
            element.innerHTML = abilityHtml
        }

        heightElement.innerHTML = `Height: ${height}m`
        weightElement.innerHTML = `Weight: ${weight}kg`
    
        console.log(data);

        sprite_f.setAttribute('src', `${data.sprites.front_default}`)
        sprite_b.setAttribute('src', `${data.sprites.back_default}`)

        pokeNome.innerHTML = nome
        pokeType.innerHTML = `Type: ${type1} ${type2}`
    }).catch((e)=>{
        console.log(e)
    })
}

console.log(pokeParam)
createPost(pokeParam)