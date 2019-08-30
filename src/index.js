const addBtn = document.querySelector('#new-toy-btn')
const toyForm = document.querySelector('.container')
const addToyForm = document.querySelector(".add-toy-form")
const toyCollection = document.querySelector('div#toy-collection')

let addToy = false

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

addToyForm.addEventListener("submit", event => {
  event.preventDefault()
  
  const newToy = {
    name: addToyForm.name.value,
    image: addToyForm.image.value,
    likes: 0
  }

  createToy(newToy)

})

// Request all toys from database
function getToys() {
  fetch('http://localhost:3000/toys')
    .then(resp => resp.json())
    .then(toys => toys.forEach(addToys))
};

// 
function addToys(object) {
    const toyDiv = document.createElement('div')
    toyDiv.className = "card"
    toyDiv.innerHTML = `
    <h2>${object.name}</h2> 
    <img src='${object.image}' class="toy-avatar"/>
    <p>${object.likes} Likes</p>
    <button class="like-btn">Like</button>
    `
    const likeBtn = toyDiv.querySelector('.like-btn')
    const likesNum = toyDiv.querySelector('p')
    likeBtn.addEventListener('click', (event) => {
      event.preventDefault()
      likeToy(object, likesNum)
      updateSeverLikes(object)
    })
    
    toyCollection.append(toyDiv)
}

function createToy(object) {
  fetch("http://localhost:3000/toys", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(object)
  }).then(resp => resp.json()).then(addToys(object))
}


function likeToy(object, htmlTag) {
  object.likes += 1
  htmlTag.innerText = `${object.likes} Likes`
}

function updateSeverLikes(object) {
  fetch(`http://localhost:3000/toys/${object.id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      likes: object.likes
    })
  })
}

getToys()