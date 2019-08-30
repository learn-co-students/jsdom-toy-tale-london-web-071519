//Identifying and declaring elements
const addBtn = document.querySelector('#new-toy-btn');
const toyForm = document.querySelector('.container');
let toyList = document.querySelector('#toy-collection');
const createToy = document.querySelector('form.add-toy-form, input.submit');
const url = 'http://localhost:3000/toys';

//The 'Add new toy' form toggle helper variable
let addToy = false;

//The 'Add new toy' form toggle
addBtn.addEventListener('click', () => {
  addToy = !addToy;
  if (addToy) {
    toyForm.style.display = 'block';
  } else {
    toyForm.style.display = 'none';
  }
});

// Creating the HTML for adding new toy cards on the page
addToyCard = (toyObj) => {
  let divTag = document.createElement('div');
  divTag.innerHTML = `
    <h2>${toyObj.name}</h2>
    <img src="${toyObj.image}" class="toy-avatar" />
    <p class="likes-count">${toyObj.likes} Likes </p>
    `;
  let btnTag = document.createElement('button');
  btnTag.className = 'like-btn';
  btnTag.innerText = 'Like <3';
  btnTag.addEventListener('click', updateLikes);
  divTag.append(btnTag);
  divTag.className = 'card';
  divTag.id = toyObj.id;
  toyList.append(divTag);
};

//Packing the form captured data in an object
toyCardData = (e) => {
  output = {};
  output['name'] = e.target[0].value;
  output['image'] = e.target[1].value;
  output['likes'] = 0;
  return output;
};

//Post new card to the database
postToyCard = (e) => {
  e.preventDefault();
  let data = toyCardData(e);
  fetch(url, {
    method: 'POST',
    body: JSON.stringify(data),
    headers: {
      'content-type': 'application/json'
    }
  }).then(addToyCard(data));
  //Clear and toggle the form
  e.target.reset();
  toyForm.style.display = 'none';
  addToy = !addToy;
};
createToy.addEventListener('submit', postToyCard);

//refresh likes on the page
refreshLikes = (toyObj) => {
  document.getElementById(toyObj.id).children[2].innerText = `${toyObj.likes} Likes`;
}

//update likes
updateLikes = (e) => {
  e.preventDefault();
  let readLikes = parseInt(e.target.parentNode.querySelector('p').innerText.split(' ')[0]);
  let newLikes = readLikes + 1;
  let toyID = e.target.parentNode.id;

  fetch(`${url}/${toyID}`, {
      method: 'PATCH',
      body: JSON.stringify({
      likes: newLikes
      }),
      headers: {
        'content-type': 'application/json'
      }
    })
    .then((resp) => resp.json())
    .then(refreshLikes);
}

//List all cards from the server
parseJSON = (resp) => {
  return resp.json();
};

addCardsFromServer = (cards) => {
  cards.forEach(addToyCard);
};

fetch(url).then(parseJSON).then(addCardsFromServer);