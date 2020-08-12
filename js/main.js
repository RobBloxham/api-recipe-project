// Arrays and Variables
let mealChoice;
let fridgeChoice = [];
let proteinChoice;
let start;
let expanded;
let endpoint;
let returnedResults = null;

// List of Food Items to be rendered as buttons
const mealList = ['sandwich','soup','salad','baked','fried'];
const fridgeList = ['lettuce','tomato','pickles','chicken','mustard','ketchup','cheese','butter','cabbage'];
const proteinList = ['chicken','fish','egg','tofu','beef'];

// Cached Element References
const body = document.body;
const main = document.getElementById('main');
const mealSelect = document.getElementById('select-meal');
const fridgeItemsSelect = document.getElementById('select-fridge-items');
const proteinSelect = document.getElementById('select-primary-protein');
const searchRecipesButton = document.getElementById('search-recipes');
const recipeSection = document.getElementById('returned-recipes');
const recipeCards = document.getElementsByClassName('recipe-card');
const returnToRecipesButton = document.getElementById('return-to-recipes');
const shoppingList = document.getElementById('shopping-list');
const recipesHeadline = document.getElementById('recipes-headline');



init();

// Event Listeners
body.addEventListener('click', e => handleChoice(e));
searchRecipesButton.addEventListener('click', fetchData);
// Materialzie Collapsible
document.addEventListener('DOMContentLoaded', function() {
	const elems = document.querySelector('.collapsible');
    const instances = M.Collapsible.init(elems);
  });

// Create Buttons
function createButtons(array, buttonContainer) {
	array.forEach(foodItem => appendButton(foodItem, buttonContainer));
}

function appendButton(foodItem, buttonContainer) {
	let newButton = document.createElement("a");
	newButton.id = `${buttonContainer.id} ${foodItem}`;
	newButton.setAttribute("class", "btn")
	newButton.innerHTML = `${foodItem}`;
	buttonContainer.appendChild(newButton);
}

function limitChoices(choice, e) {
	let previous = document.getElementById(choice);
	previous.setAttribute('class', 'btn grey lighten-2');
	e.target.setAttribute('class', "btn green darken-1");
}

// Handle button choices
function handleChoice(e) {
	const originalId = e.target.id;
	const id = e.target.id.split(" ")[1];
	

	const parent = e.target.parentElement.id;
	// match the container to the appropriate array
	if (parent === 'select-meal') {
		if (!mealChoice) {
			mealChoice = originalId;
			e.target.setAttribute('class', "btn green darken-1")
		} else if (mealList.includes(id)) {
			limitChoices(mealChoice,e);
			mealChoice = originalId;
		}
	} 
	if (parent === 'select-fridge-items') {
		if (fridgeChoice.includes(id)) {			c
			fridgeChoice.splice(fridgeChoice.indexOf(id));
		} else if (fridgeList.includes(id)) {
			fridgeChoice.push(id) ;
			e.target.setAttribute('class', "btn green darken-1");
		}
	}
	if (parent === 'select-primary-protein') {	
		if (!proteinChoice) {
			proteinChoice = originalId;
			e.target.setAttribute('class', "btn green darken-1");
		} else if (proteinChoice) {
			limitChoices(proteinChoice, e)
			proteinChoice = originalId
		} 
	} 
}

// Data Handling //
// Create request string after buttons have been selected
function createRequestString() {
	if (proteinChoice) {

		const protein = proteinChoice.split(' ')[1];
		const meal = mealChoice.split(' ')[1];
		endpoint = `https://recipepuppyproxy.herokuapp.com/api/?i=${protein}&q=${meal}&p=3`;
		return endpoint;
	}
}

// function copyToClipBoard(link) {
// 	link.focus();
// 	link.select();
// 	console.log('selected element',link.select());
// 	document.execCommand('copy');
// }

// function Fetch URL
function fetchShortenedUrl() {
	requestData = { 
		"url": "https://www.w3schools.com/tags/ref_urlencode.ASP"
	}
	endpoint = 'https://rel.ink/api/links/'
	

	fetch(endpoint, {
		method: 'post',
		mode: 'cors',
		body: JSON.stringify(requestData)
	}) // make sure post request
		.then((response) => {
			console.log(response)
			response.json()
		})
		.then(data => {
			console.log(data);
		})
}

// Fetch Data and update recipe cards
function fetchData() {
	console.log('Fetching Data')
	if (proteinChoice) {
		createRequestString();
		let url = endpoint;
	
		fetch(url)
			.then((response) => {
				if (response.status == 200) {
					return response.json();
				} else {
					reject('server error');
				}
			})
			.then(data => {
				console.log('Data returned successfully')
				returnedResults = cleanData(data.results);
				createRecipeCard(returnedResults, recipeSection);
			});
	}
}
function cleanData(data) {
	data.forEach(recipe => {
		recipe.title = recipe.title.replace(/\r\n|\n|\r|\t/gm,'');
		recipe.ingredients = recipe.ingredients.split(',');
		
		recipe.ingredients.forEach((ingredient,idx) => {
			recipe.ingredients[idx] = ingredient.trim();
		})

		if (recipe.thumbnail === "") {
			// this is temporary, you will replace this with a generated photo eventually.
			recipe.thumbnail = "https://picsum.photos/50";
		}
	});
	return data;
}

function update() {
	
}

function createRecipeCard(recipeArray, recipeContainer) {
	
	recipesHeadline.style.display = "block";
	recipeArray.forEach((recipe, idx) => {
		appendRecipeCard(recipe, idx, recipeContainer);
	});
	const listContainers = document.getElementsByClassName('list-container');
	for (let i = 0; i < listContainers.length; i++) {
		const ul = document.createElement('ul')
		ul.setAttribute('class','unordered-list');
		listContainers[i].appendChild(ul);
	}
	const unorderedList = document.getElementsByClassName('unordered-list');
	for (x = 0; x < unorderedList.length; x++) {
		recipeArray[x].ingredients.forEach(ingredient => {
			const li = document.createElement('li');
			li.innerHTML = ingredient;
			checkFridgeIncludes(ingredient,'', li)
			unorderedList[x].appendChild(li);
		})
	}

	// let copyLinks = document.querySelectorAll('.copy-link');
	// let textArea = document.querySelectorAll('textarea');
	// copyLinks.forEach((copyLink, idx) => {
	// 	copyLink.addEventListener('click',e => {
	// 		let linkEl = textArea[idx];
	// 		console.dir(linkEl)
	// 		// call function and pass sibling
	// 		copyToClipBoard(linkEl);

	// 	} )
	// })
}

function appendRecipeCard(recipe, idx, recipeContainer) {
	let id = toString(idx);
	let newRecipeCard = document.createElement("li");
	newRecipeCard.setAttribute('class','card recipe-card');
	newRecipeCard.id = recipe.title.toLowerCase();
	newRecipeCard.innerHTML = `
	<div class="collapsible-header">
		<img width="50" height="50" id="${recipe.title.toLowerCase()}" src=${recipe.thumbnail}>
		<h1 class="recipe-title">${recipe.title}</h1>
	</div>
	<div class="list-container collapsible-body">
		<a href="#jump-to-shopping-list" class="btn create-shopping-list" id="${idx}">Create Shopping List</a>
		<a href=${recipe.href} class="btn" target="_blank">Visit Recipe Website</a>
		<textarea class="hidden" id="${idx}">${recipe.href}</textarea>
		<button class="btn copy-link">Copy Link</button>
		<h1>Ingredients</h1>
	</div> `;
	recipeContainer.appendChild(newRecipeCard);

	let createShoppingList = document.getElementById(idx);
	createShoppingList.addEventListener('click', e => appendShoppingList(recipe));
}


function appendShoppingList(recipe) {
	shoppingList.innerHTML = `
	<div class="card-content">
		<h1>Shopping List</h1>
		<ul id="shopping-list-ul">
		</ul>
	</div>
	`;
	// add ingredients to shopping list
	const unorderedList = document.getElementById('shopping-list-ul');
	recipe.ingredients.forEach(ingredient => {
		createListElements(ingredient, unorderedList)
	});

	const icons = document.querySelectorAll('.material-icons');
	updateIcons(icons);
}


function createListElements(ingredient, unorderedList) {
	const li = document.createElement('li');
	li.setAttribute('class', 'shopping-list-item')
	li.innerHTML = `
	<i class="small material-icons">check_box_outline_blank</i>
	<h3>${ingredient}</h3>
	`
	checkFridgeIncludes(ingredient, 'shopping-list-item', li);
	unorderedList.appendChild(li);
}

function checkFridgeIncludes(ingredient, className, li) {
	fridgeChoice.includes(ingredient) ? li.setAttribute('class', `${className} exists`) : li.setAttribute('class', `${className} empty`);
}

// Initialization Function
function init() {
	createButtons(mealList, mealSelect);
	createButtons(fridgeList, fridgeItemsSelect);
	createButtons(proteinList,proteinSelect);
}

function updateIcons(icons) {
	console.log('icons',icons)
	icons.forEach(icon => {
		icon.addEventListener('click', e => {
			console.log('new listener working!')
			if (icon.innerText === 'check_box') {
				icon.innerText = 'check_box_outline_blank'
			} else {
				icon.innerText = 'check_box'
			}
		})
	})
}

