const addBtn = document.querySelector('#new-toy-btn')
const toyForm = document.querySelector('.container')
const toyCollection = document.querySelector('#toy-collection')
let addToy = false
const createToyForm = document.querySelector(".add-toy-form")
let likes;


// YOUR CODE HERE
/////////////EVENT LISTENERS//////////////////
addBtn.addEventListener('click', () => {
  // hide & seek with the form
  addToy = !addToy
  if (addToy) {
    toyForm.style.display = 'block'
  } else {
    toyForm.style.display = 'none'
  }
})



createToyForm.addEventListener('submit', createToy)

document.addEventListener("DOMContentLoaded", getToys);

function createToy(event) {
    //take in the form values and create a toy object
    //pass that toy object to the db and page with the two functions
    const newToy = {
        name: event.target.name.value,
        image: event.target.image.value
    }
    postToDb(newToy).then(listToy)
}


function addToyToIndex(toys) {
  toys.forEach(toy => {
    listToy(toy)
  });
}



///////////////creates a div with class 'card' which you will add each toy to.
function listToy(toy) {
  let newDiv = document.createElement('div')
  newDiv.className ='card'
  newDiv.innerHTML = `<h2>${toy.name}</h2><img class= "toy-avatar" src = "${toy.image}"><p>${toy.likes}</p><button class= "like-btn">Like <3</button>`
  toyCollection.append(newDiv)
  assignLikeButton()
  addEventListenerToButton()
}


////////////POSTING TO DATABASE
function postToDb(toy) {
    fetch("http://localhost:3000/toys", {
        method: "POST", 
        headers: {
                "Content-Type": "application/json",
                Accept: "application/json"
        }, 
        body: JSON.stringify(toy)
    }).then(resp => resp.json()) 
}
////////////////////////
function getToys() {
    fetch("http://localhost:3000/toys")
    .then(function(response) {
      return response.json() 
    }).then(function(json) {
      //now pass json into function to grab each toy
      addToyToIndex(json)
      //console.log(json)
}) } 

function assignLikeButton() {
 likes = document.querySelectorAll('.like-btn')
}

function addEventListenerToButton() {
    likes.forEach(like => like.addEventListener('click', (e) => {e.target.parentNode.children[2].innerText = parseInt(e.target.parentNode.children[2].innerText) + 1}))
}