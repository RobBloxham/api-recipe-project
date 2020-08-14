let mealChoice;
let fridgeChoice = [];
let proteinChoice;
let start;
let expanded;
let endpoint;
let returnedResults = null;

const mealList = ['sandwich','soup','salad','baked','fried'];
const fridgeList = ['lettuce','tomato','pickles','mustard','ketchup','cheese','butter','cabbage','salsa','olives','spinach'];
const proteinList = ['chicken','fish','egg','tofu','beef'];

const body = document.body;
const main = document.getElementById('main');
const mealSelect = document.getElementById('select-meal');
const fridgeItemsSelect = document.getElementById('select-fridge-items');
const proteinSelect = document.getElementById('select-primary-protein');
const searchRecipesButton = document.getElementById('search-recipes');
const recipeSection = document.getElementById('returned-recipes');
const returnToRecipesButton = document.getElementById('return-to-recipes');
const shoppingList = document.getElementById('shopping-list');
const recipesHeadline = document.getElementById('recipes-headline');

body.addEventListener('click', e => handleChoice(e));
searchRecipesButton.addEventListener('click', fetchData);
// Materialzie Collapsible
document.addEventListener('DOMContentLoaded', function() {
	const elems = document.querySelector('.collapsible');
    const instances = M.Collapsible.init(elems);
  });


init();

function init() {
	createButtons(mealList, mealSelect);
	createButtons(fridgeList, fridgeItemsSelect);
	createButtons(proteinList,proteinSelect);
}

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


// Handle button choices
function handleChoice(e) {
	const originalId = e.target.id;
	const id = e.target.id.split(" ")[1];
	
	const parent = e.target.parentElement.id;
	if (parent === 'select-meal') {
		if (!mealChoice) {
			mealChoice = originalId;
			e.target.setAttribute('class', "btn selected")
		} else if (mealList.includes(id)) {
			limitChoices(mealChoice,e);
			mealChoice = originalId;
		}
	} 
	if (parent === 'select-fridge-items') {
		if (fridgeChoice.includes(id)) {			
			fridgeChoice.splice(fridgeChoice.indexOf(id));
		} else if (fridgeList.includes(id)) {
			fridgeChoice.push(id) ;
			e.target.setAttribute('class', "btn selected");
		}
	}
	if (parent === 'select-primary-protein') {	
		if (!proteinChoice) {
			proteinChoice = originalId;
			e.target.setAttribute('class', "btn selected");
		} else if (proteinChoice) {
			limitChoices(proteinChoice, e)
			proteinChoice = originalId
		} 
	} 
}

function limitChoices(choice, e) {
	let previous = document.getElementById(choice);
	previous.setAttribute('class', 'btn cleared');
	e.target.setAttribute('class', 'btn selected');
}

function createRequestString() {
	if (proteinChoice) {
		const protein = proteinChoice.split(' ')[1];
		const meal = mealChoice.split(' ')[1];
		endpoint = `https://recipepuppyproxy.herokuapp.com/api/?i=${protein}&q=${meal}&p=3`;
		return endpoint;
	}
}

function fetchData() {
	if (proteinChoice) {
		createRequestString();
		let url = endpoint;
	
		return fetch(url)
			.then((response) => {
				return response.json();
			})
			.then(data => {
				returnedResults = cleanData(data.results);
				createRecipeCard(returnedResults, recipeSection)
				return returnedResults
			})	
	}
}

async function fetchShortenedUrl(url) {
	requestData = { 
		"url": url
	}
	endpoint = 'https://rel.ink/api/links/'
	let addTo = 'https://rel.ink/'
	
	return await fetch(endpoint, {
		method: 'post',
		// mode: 'cors',
		body: JSON.stringify(requestData),
		headers: {
			"Content-type" : "application/json"
		}
	})
		.then((response) => {
			return response.json()	
		})
		.then(data => {
			const shortened = addTo+data.hashid
			return shortened;
		})
}

function cleanData(data) {
	data.forEach(recipe => {
		recipe.title = recipe.title.replace(/\r\n|\n|\r|\t/gm,'');
		recipe.ingredients = recipe.ingredients.split(',');
		recipe.ingredients.forEach((ingredient,idx) => {
			recipe.ingredients[idx] = ingredient.trim();
		})
		if (recipe.thumbnail === '') {
			recipe.thumbnail = "https://picsum.photos/50";
		}
	});
	return data;
}

function createRecipeCard(recipes, recipeContainer) {
	recipesHeadline.style.display = "block";
	recipes.forEach((recipe,idx) => {
		appendRecipeCard(recipe,idx, recipeContainer)
	})
	let shortLinkTexts = document.querySelectorAll('.shortened-links')
	recipes.forEach((recipe, idx) => {
		fetchShortenedUrl(recipe.href).then(shortLink => {
			shortLinkTexts[idx].innerText = shortLink;
		})
	})
}

function appendRecipeCard(recipe, idx, recipeContainer) {
	let overlapping = fridgeChoice.filter(fridgeItem => recipe.ingredients.includes(fridgeItem));
	
	let newRecipeCard = document.createElement("li");
	newRecipeCard.setAttribute('class','card recipe-card');
	newRecipeCard.id = recipe.title.toLowerCase();
	newRecipeCard.innerHTML = `
	<div class="collapsible-header">
		<img width="50" height="50" id="${recipe.title.toLowerCase()}" src=${recipe.thumbnail}>
		<div class='collapsible-text'>
			<h1 class="recipe-title">${recipe.title}</h1>
			<h2 class="recipe-overlap">You have ${overlapping.length} out of ${recipe.ingredients.length} ingredients for this recipe.</h2>
		</div>
	</div>
	<div class="list-container collapsible-body" id=${idx}>
		<a href="#jump-to-shopping-list" class="btn create-shopping-list" id="${idx}">Create Shopping List</a>
		<a href=${recipe.href} class="btn" target="_blank">Visit Recipe Website</a>
		<h1 class="share-with-friends">Share Recipe With Friends</h1>
		<h1 class="shortened-links"></h1>
		<h1>Ingredients</h1>
	</div> `;

	recipeContainer.appendChild(newRecipeCard);

	let createShoppingList = document.getElementById(idx);
	createShoppingList.addEventListener('click', e => appendToShoppingList(recipe));
	appendUl(idx);
	appendLiToUl(idx, recipe)
}

function appendUl(id) {
	const listContainer = document.getElementById(id)
	const ul = document.createElement('ul');
	ul.id = `ul${id}`
	ul.setAttribute('class','unordered-list');
	listContainer.appendChild(ul)
}

function appendLiToUl(id, recipe) {
	const unorderedList = document.getElementById(`ul${id}`)
	recipe.ingredients.forEach(ingredient => {
		const li = document.createElement('li');
			li.innerHTML = ingredient;
			checkFridgeIncludes(ingredient,'', li)
			unorderedList.appendChild(li);
	})
}

function appendToShoppingList(recipe) {
	shoppingList.innerHTML = `
	<div class="card-content">
		<h1>Shopping List</h1>
		<ul id="shopping-list-ul">
		</ul>
	</div>
	`;
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

function updateIcons(icons) {
	icons.forEach(icon => {
		icon.addEventListener('click', e => {
			if (icon.innerText === 'check_box') {
				icon.innerText = 'check_box_outline_blank'
			} else {
				icon.innerText = 'check_box'
			}
		})
	})
}

