const addBtn = document.querySelector('#new-toy-btn')
const toyForm = document.querySelector('.container')
const toysURL = 'http://localhost:3000/toys'
let toyCollection = document.querySelector('#toy-collection')
let addToy = false


/////////////////////////////////////
////////////////ADD New Toy Toggle
addBtn.addEventListener('click', () => {
  // hide & seek with the form
  addToy = !addToy
  if (addToy) {
    toyForm.style.display = 'block'
  } else {
    toyForm.style.display = 'none'
  }
})
/////////////////////////////////////
/////////////////////////////////////

/////////////////////////////////////
/////////Listening to form///////////
toyForm.addEventListener('submit', event => {
  event.preventDefault()
  let name = event.target.name.value
  let image = event.target.image.value
  let likes = 0
  addToyToDB(name, image, likes)
  event.target.reset()
})
///////Posting to Database///////////
function addToyToDB(name, image, likes) {
    return fetch(toysURL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name,
        image,
        likes
      })
      })
      .then(resp => resp.json())
      .then(toy => renderToy(toy))
}
/////////////////////////////////////
/////////////////////////////////////

/////////////////////////////////////
/////////fetching toys in db/////////
function renderToys() {
  return fetch(toysURL)
    .then(resp => resp.json())
    .then(toys => toys.forEach(toy => renderToy(toy)))
}

function renderToy(toy) {
  let divEl = document.createElement('div')
  divEl.classList.add('card')
  let h2El = document.createElement('h2')
  h2El.innerText = toy.name
  let imgEl = document.createElement('img')
  imgEl.classList.add('toy-avatar')
  imgEl.src = toy.image
  let pEl = document.createElement('p')
  pEl.innerText = toy.likes
  let buttonEl = document.createElement('button')
  buttonEl.classList.add('like-btn')
  buttonEl.innerText = 'Like <3'

  divEl.appendChild(h2El)
  divEl.appendChild(imgEl)
  divEl.appendChild(pEl)
  divEl.appendChild(buttonEl)

  buttonEl.addEventListener('click', event =>{
    event.target.previousElementSibling.innerText = parseInt(event.target.previousElementSibling.innerText) + 1
    ++toy.likes
    likeEvent(toy)
  })

  toyCollection.appendChild(divEl)
}
/////////////////////////////////////
//////Like Post Event////////////////
function likeEvent(toy) {
    return fetch(`${toysURL}/${toy.id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        "likes": toy.likes
      })
    })
}


/////////////////////////////////////
/////////////////////////////////////

renderToys()