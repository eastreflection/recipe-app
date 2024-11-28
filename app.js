const express = require('express');
const app = express();

app.set('view engine', 'ejs')
app.use(express.static('public'))
app.use(express.urlencoded({ extended: true }));

let recipes = [];

//defining post for adding recipes
app.post('/add-recipe', (req, res) => {
    const { title, ingredients, instructions } = req.body;
    const newRecipe = { id: Date.now(), title, ingredients, instructions };
    recipes.push(newRecipe);
    res.redirect('/');
});
// this will store each new recipe in the recipe array and then redirect to the homepage after submission

//to display recipes on the home-page
app.get('/', (req, res) => {
    res.render('index', { recipes });
})

//getting routes
app.get('/', (req, res) => {
    res.render('index');
});

app.get('/add-recipe', (req, res) => {
    res.render('add-recipe');
})

app.listen(3000, ()}=> {
    console.log('Server is running on localhost:3000')
})


