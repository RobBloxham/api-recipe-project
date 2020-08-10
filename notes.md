```javascript
// Event Listeners for buttons
taylorButton.addEventListener('click', () => {
	fetch("https://api.taylor.rest/")
	.then((response) => {
			return response.json();
	})
	.then((data) => {
			let newQuote = {};
			newQuote.quote  = data.quote;
			newQuote.artist = 't-swift';
			quotes.push(newQuote);
			render();
	})
	.catch((err) => {
			console.log(err);
	})
});


//Append Child Template
function appendDiv(quote, artist, idx) {
    let newDiv = document.createElement("div");
    newDiv.innerHTML = `
                <div class="card" id="${artist.toLowerCase()}">
                    <div class="card-body">
                        <blockquote class="blockquote mb-0">
                            <p>${quote}</p>
                            <footer class="blockquote-footer">${artist}</footer>
                        </blockquote>
                    </div>
                    <button onClick={deleteQuote(${idx})} id="delButton" class="btn">X</button>
                </div>    
    `
    container.appendChild(newDiv);
}
```


```json
{"title":"Recipe Puppy","version":0.1,"href":"http:\/\/www.recipepuppy.com\/","results":[{"title":"Chicky-N-Cheese Sandwich","href":"http:\/\/www.recipezaar.com\/Chicky-N-Cheese-Sandwich-57383","ingredients":"chicken, cream cheese, salt","thumbnail":""},{"title":"Chicken Tortilla Wrap Sandwich","href":"http:\/\/www.recipezaar.com\/Chicken-Tortilla-Wrap-Sandwich-126712","ingredients":"cheddar cheese, salsa, chicken, flour tortillas, lettuce","thumbnail":"http:\/\/img.recipepuppy.com\/299609.jpg"},{"title":"Chicken Cordon Bleu Sandwich","href":"http:\/\/www.recipezaar.com\/Chicken-Cordon-Bleu-Sandwich-349780","ingredients":"chicken, french bread, ham, swiss cheese, vegetable oil","thumbnail":"http:\/\/img.recipepuppy.com\/295527.jpg"},{"title":"Chicken & Slaw Sandwich with Bell Pepper Relish \r\n\t\t\n","href":"http:\/\/www.kraftfoods.com\/kf\/recipes\/chicken-slaw-sandwich-bell-110881.aspx","ingredients":"cheese spread, relish, sourdough bread, chicken, broccoli","thumbnail":"http:\/\/img.recipepuppy.com\/651857.jpg"},{"title":"\nHot Chicken Sandwich Recipe\n\n","href":"http:\/\/cookeatshare.com\/recipes\/hot-chicken-sandwich-51902","ingredients":"chicken, eggs, olives, mushroom, mayonnaise","thumbnail":"http:\/\/img.recipepuppy.com\/794805.jpg"},{"title":"Ciabatta Chicken Sandwich","href":"http:\/\/www.recipezaar.com\/Ciabatta-Chicken-Sandwich-241818","ingredients":"spinach, chicken, ciabatta rolls, salad dressing, mayonnaise, monterey jack cheese, tomato","thumbnail":""},{"title":"Chicken Caesar Sandwich \r\n\r\n","href":"http:\/\/www.kraftfoods.com\/kf\/recipes\/chicken-caesar-sandwich-50775.aspx","ingredients":"salad dressing, roll, parmesan cheese, lettuce, chicken, tomato","thumbnail":"http:\/\/img.recipepuppy.com\/649736.jpg"},{"title":"Chicken Caesar Sandwich \r\n\r\n","href":"http:\/\/www.kraftfoods.com\/kf\/recipes\/chicken-caesar-sandwich-50775.aspx?cm_re=1-_-1-_-RecipeAlsoEnjoy","ingredients":"salad dressing, roll, parmesan cheese, lettuce, chicken, tomato","thumbnail":"http:\/\/img.recipepuppy.com\/665828.jpg"},{"title":"Parmesan Chicken Sandwich","href":"http:\/\/www.recipezaar.com\/Parmesan-Chicken-Sandwich-168023","ingredients":"black pepper, chicken, butter, oregano, bread crumbs, paprika, parmesan cheese, parsley, salt","thumbnail":"http:\/\/img.recipepuppy.com\/350088.jpg"},{"title":"Crispy Chicken Sandwich \r\n\t\t\r\n\t\r\n\t\t\r\n\t\r\n\t\t\r\n\t\r\n\t\r\n\r\n","href":"http:\/\/www.kraftfoods.com\/kf\/recipes\/crispy-chicken-sandwich-55445.aspx","ingredients":"chicken, chicken, mozzarella cheese, french bread, dijon mustard, lettuce, tomato","thumbnail":"http:\/\/img.recipepuppy.com\/650315.jpg"}]}
```

```css
html {
    box-sizing: border-box
  }
 
  /* The Universal Selector */
  *, /* All elements*/
  *::before, /* All ::before pseudo-elements */
  *::after { /* All ::after pseudo-elements */
    /* height & width will now include border & padding by default
       but can be over-ridden as needed */
    box-sizing: inherit;
  }
 
 
  
body {
	background-color: gray;
	/* Use a system font, if none are available use an available sans-sarif font */
	font-family: system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI",
			Roboto, Oxygen-Sans, Ubuntu, Cantarell, "Helvetica Neue", sans-serif;
	margin: 0;

	color: whitesmoke;
	display: grid;
	font-size: 2.4rem;
	font-weight: bold;
	height: 100vh;
	
}


/* Another way to center content, this time using flexbox */
header,
footer,
aside,
main {
  display: flex;
  justify-content: center;
  align-items: center;
}

```

```css
/* html {
	box-sizing: border-box
}

/* Credit to david for teaching us */
/* The Universal Selector */
*, /* All elements*/
*::before, /* All ::before pseudo-elements */
*::after { /* All ::after pseudo-elements */
	/* height & width will now include border & padding by default
		 but can be over-ridden as needed */
	box-sizing: inherit;
}

/* Credit to david for teaching us */
/* resets font size to be 62.5% of the user preference - 
in most browser configurations this will be 10px */
:root {
font-size: 62.5%
} */
```


```js
function hasNullValue(obj) {
  for (let key in obj) {
    if (obj[key] === null) return true
  }

  return false
}
```

check if the JSon key -> value has a value at all. if its empty do something with it.


<!-- Materialize CDN Links -->
<!-- Compiled and minified CSS -->
```html
   

Materialize:
Uses a container class. set to ~70% of the window width. <div class="container">




-- materialize expand

-- make recipe cards slightly different
- add extra card for lists?

Cards
<div class="card blue-grey darken-1">
        <div class="card-content white-text">
          <span class="card-title">Card Title</span>

          #0097a7 cyan darken-2

          card cyan darken-2
          card-content white-text

buttons
<a class="waves-effect waves-teal btn-flat">Button</a>
```
        
Chose card color
chose button color
chose text color
