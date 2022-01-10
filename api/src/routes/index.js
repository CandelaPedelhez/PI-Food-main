const { Router } = require('express');
require("dotenv").config();
const { Recipe, TypesofDiet } = require('../db');
const { API_KEY } = process.env;
const axios = require('axios');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');

const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
const getApiRecipes = async () => { /* me trae la info de la Api */
    const apiUrl = await axios.get(`https://api.spoonacular.com/recipes/complexSearch?apiKey=${API_KEY}&addRecipeInformation=true&number=100`); /* así traemos las recetas + la info, y limitamos a 100 */
    const apiInfo = await apiUrl.data.map(e => {
        return {
            id: e.id,
            name: e.title,
            summary: e.summary,
            score: e.spoonacularScore,
            healthScore: e.healthScore,
            stepbyStep: e.analyzedInstructions,
            img: e.image,
            diets: e.diets.map(e => e), /* es un arreglo */
        }
    }); /* en axios la info me llega en un 'data' */
    return apiInfo;
}

const getDbRecipes = async () => { /* me trae la info del db */
    return await Recipe.findAll({
        include: {
            model: TypesofDiet,
            attributes: ['name'],
            through: {
                attributes: []
            }
        }
    })
}

const getAllRecipes = async () => { 
    const apiInfo = await getApiRecipes();
    const dbInfo = await getDbRecipes();
    const infoTotal = apiInfo.concat(dbInfo);
    return infoTotal 
}


router.get('/recipes', async (req, res) => {
    let name = req.query.name;
    const recipesTotal = await getAllRecipes();
    if (name) {
        let recipeName = await recipesTotal.filter(e => e.name.toLowerCase().includes(name.toLowerCase()));
        recipeName.length ?
            res.status(200).send(recipeName) :
            res.status(404).send('No pudimos encontrar la receta')
    }
    else {
        res.status(200).send(recipesTotal);
    }
}),

router.get('/types', async (req, res) => {
    const dietsApi = await axios.get('https://api.spoonacular.com/recipes/complexSearch?apiKey={API_KEY}&addRecipeInformation=true&number=100')
    const arraysDiets = dietsApi.data.map(e => e.diets)
    const dietsEach = arraysDiets.map(e => { 
        for (let i = 0; i < e.length; i++) return e[i]
        })
    dietsEach.forEach(e => {
        TypesofDiet.findOrCreate({
            where: { name: e } 
        })
    });
    const allDiets = await TypesofDiet.findAll();
    res.send(allDiets);
})

router.post('/recipe', async (req, res) => {
    let {
        name,
        summary,
        score,
        healthScore,
        stepbyStep,
        img,
        createdInDb,
        diet,
    } = req.body
    let recipeCreated = await Recipe.create({
        name,
        summary,
        score,
        healthScore,
        stepbyStep,
        img,
        createdInDb,
    })
    let dietDb = await TypesofDiet.findAll({
        where: {name: diet}
    })
    recipeCreated.addTypeofDiet(dietDb)
    res.send('Tu receta ha sido creada con éxito')
})

module.exports = router;
