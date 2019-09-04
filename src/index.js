const addBtn = document.querySelector('#new-toy-btn')
const toyForm = document.querySelector('.container')
let addToy = false

const toysURL =  'http://localhost:3000/toys'

// YOUR CODE HERE

addBtn.addEventListener('click', () => {
  // hide & seek with the form
  addToy = !addToy
  if (addToy) {
    toyForm.style.display = 'block'
  } else {
    toyForm.style.display = 'none'
  }
})


// OR HERE!

const newToyForm = document.querySelector('form.add-toy-form')


const getAllToys = () => {
 fetch(toysURL)
 .then(resp => resp.json())
 .then(toys => {toys.forEach(parseToy)}).catch(error => alert(error.message))
}


 const parseToy = toy => {
   const divCollection = document.querySelector('div#toy-collection')
   const divToy = document.createElement('div')
   divToy.classList.add('card')
   divToy.innerHTML = `
    <h2>${toy.name}</h2>
      <img src='${toy.image}' class="toy-avatar" />
      <p>${toy.likes} Likes</p>
    <button class="like-btn">Like <3</button>
   `
   const likeBtn = divToy.querySelector('button.like-btn')
   const likesP = divToy.querySelector('p')
   likeBtn.addEventListener('click', event => handleLikeEvent(event, likesP, toy))
   divCollection.append(divToy)
 }


 const handleLikeEvent = (event, likesP, toy) => {

   fetch(`${toysURL}/${toy.id}`, {
     method: 'PATCH',
     headers: {'content-type': 'application/json'},
     body: JSON.stringify({likes: ++toy.likes})
   })
   .then(resp => resp.json())
   .then(toy => {
     likesP.innerText = `${toy.likes} Likes`
   })
   .catch(error => alert(error.message))
 }

 newToyForm.addEventListener('submit', event => {
   event.preventDefault()
   const toyObj = {
    name: event.target.name.value,
    image: event.target.image.value,
    likes: 0
   }
   createNewToy(toyObj)
 })

 const createNewToy = toyObj => {
    fetch(toysURL, {
      method: 'POST',
      headers: {'content-type': 'application/json'},
      body: JSON.stringify(toyObj)
    })
    .then(resp => resp.json())
    .then(parseToy) 
    .catch(error => alert(error.message))
 }

 getAllToys()

