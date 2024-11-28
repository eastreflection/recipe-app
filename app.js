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
});

app.get('/recipes/:id', (req, res) => {
    const recipe = recipes.find(r => r.id == req.params.id);
    if (recipe) {
        res.render('recipe-details', { recipe })
    } else {
        res.status(404).send('Recipe not found 404')
    }
});

app.post('edit-recipe/:id', (req, res)=>{
    const { title, ingredients, instructions };
    const recipeIndex = recipes.findIndex(r => r.id == req.params.id);
    recipes[recipeIndex] = { ...recipes[recipeIndex], title, ingredients, instructions };
    res.redirect('/');
});

app.post('/delete-recipe/:id', ()=>{
    recipes = recipes.filter(r => r.id != req.params.id);
    res.redirect('/');
});

app.listen(3000, ()}=> {
    console.log('Server is running on localhost:3000')
})


