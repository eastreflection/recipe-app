const express = require('express');
const app = express();

app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));

let recipes = [];

// POST route to add a recipe
app.post('/add-recipe', (req, res) => {
    const { title, ingredients, instructions } = req.body;
    const newRecipe = { id: Date.now(), title, ingredients, instructions };
    recipes.push(newRecipe);
    res.redirect('/');
});

// GET route to display recipes on the homepage
app.get('/', (req, res) => {
    res.render('index', { recipes });
});

// GET route to display the form to add a new recipe
app.get('/add-recipe', (req, res) => {
    res.render('add-recipe');
});

// GET route to view a recipe's details
app.get('/recipes/:id', (req, res) => {
    const recipe = recipes.find(r => r.id == req.params.id);
    if (recipe) {
        res.render('recipe-details', { recipe });
    } else {
        res.status(404).send('Recipe not found');
    }
});

// GET route to display the form to edit a recipe
app.get('/edit-recipe/:id', (req, res) => {
    const recipe = recipes.find(r => r.id == req.params.id);
    if (recipe) {
        res.render('edit-recipe', { recipe });
    } else {
        res.status(404).send('Recipe not found');
    }
});

// POST route to edit a recipe
app.post('/edit-recipe/:id', (req, res) => {
    const { title, ingredients, instructions } = req.body;
    const recipeIndex = recipes.findIndex(r => r.id == req.params.id);
    if (recipeIndex !== -1) {
        recipes[recipeIndex] = { id: req.params.id, title, ingredients, instructions };
        res.redirect('/');
    } else {
        res.status(404).send('Recipe not found');
    }
});

// POST route to delete a recipe
app.post('/delete-recipe/:id', (req, res) => {
    recipes = recipes.filter(r => r.id != req.params.id);
    res.redirect('/');
});

app.listen(3000, () => {
    console.log('Server is running on http://localhost:3000');
});
