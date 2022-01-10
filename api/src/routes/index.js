const { Router } = require('express');
const {Recipe, TypesofDiet} = require('../db');
const {API_KEY} = process.env;
const axios = require('axios');
const { get } = require('express/lib/response');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');


const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
const getApiRecipes = async () =>{ /* me trae la info de la Api */
    const apiUrl = await axios.get('https://api.spoonacular.com/recipes/complexSearch?apiKey={API_KEY}&addRecipeInformation=true&number=100'); /* así traemos las recetas + la info, y limitamos a 100 */
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

 const getDBRecipes = async () => { /* me trae la info del db */
    return await Recipe.findAll({
        include:{
            model: TypesofDiet,
            attributes: ['name'],
            through: {
                attributes: []
            }
        }
    })
 }

 const getAllRecipes= async () => { /* ahora me junto toda la info api + db */
     const apiRecipes = await getApiRecipe();
     const dbRecipes = await getDBRecipes();
     const recipesTotal = apiRecipes.concat(dbRecipes);
     return recipesTotal
 }

 /* ahora las rutas */

 router.get('/recipes', async (req, res) => { /* acá unificamos lo que nos pidan por query, y en el caso de estar vacío todas las recetas */
    const name = req.query.name;
    const recipesTotal = await getAllRecipes();
    if(name){ /* si me pasan un query... */
        let recipeName = await recipesTotal.filter(e => e.name.toLowerCase().includes(name.toLowerCase()))
        recipeName.length ?
        res.status(200).send(recipeName) : 
        res.status(404).send('Sorry, we could not find what you are looking for')
    }
    else {
        res.status(200).send(recipesTotal);
    }
 }),

 router.get('/types', async (req, res) => {
     const dietsApi= await axios.get('https://api.spoonacular.com/recipes/complexSearch?apiKey={API_KEY}&addRecipeInformation=true&number=100'),
     const diets = dietsApi.data.map(e => e.diets) /* me devuelve todos los arreglos de diets de cada recipe */
     const dietsEach = diets.map(e => {
        for (let i = 0; i < e.length; i++) {
            return e[i]}
     })
 })

 router.get()

module.exports = router;
