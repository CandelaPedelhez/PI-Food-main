const { Router } = require('express');
require("dotenv").config();
const { Recipe, TypesofDiet } = require('../db');
const { API_KEY, API_KEY2, API_KEY3, API_KEY4, API_KEY5, API_KEY6} = process.env;
const axios = require('axios');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');

const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
const getApiRecipes = async () => { /* me trae la info de la Api */
    const apiUrl = await axios.get(`https://api.spoonacular.com/recipes/complexSearch?apiKey=${API_KEY6}&addRecipeInformation=true&number=100`); /* así traemos las recetas + la info, y limitamos a 100 */
    const apiInfo = await apiUrl.data.results.map(e => {
        return {
            id: e.id,
            name: e.title,
            summary: e.summary,
            score: e.spoonacularScore,
            healthScore: e.healthScore,
            stepbyStep: (e.analyzedInstructions.length>0 && Array.isArray(e.analyzedInstructions[0].steps))?e.analyzedInstructions[0].steps.map(ele=>`step ${ele.number}: ${ele.step}`).join(", ") :'No steps found',
            image: e.image,
            diets: e.diets.map(e => e), /* es un arreglo */
        }
    }) /* en axios la info me llega en un 'data' */
    return apiInfo;
}

const getDbRecipes = async () => { /* me trae la info del db */
    return await Recipe.findAll({
        include: {
            model: TypesofDiet,
            attributes: ["name"],
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

const searchByIdApi = async (id) => {
    const recipe = await axios.get(`https://api.spoonacular.com/recipes/${id}/information?apiKey=${API_KEY6}`);
    const infoId = {
        name: recipe.data.title,
        image: recipe.data.image,
        diets: recipe.data.diets,
        summary: recipe.data.summary,
        score: recipe.data.spoonacularScore,
        healthScore: recipe.data.healthScore,
        stepbyStep: (recipe.data.analyzedInstructions.length>0 && Array.isArray(recipe.data.analyzedInstructions[0].steps))?recipe.data.analyzedInstructions[0].steps.map(ele=>`step ${ele.number}: ${ele.step}`).join(", ") :'No steps found'
/*         stepbyStep: recipe.data.analyzedInstructions.map(obj => obj.steps.map(obj2 => obj2.step)) */
    }
    return infoId;
}

const searchByIdAtDB = async (id) => {
    const recipe = await Recipe.findByPk(id, {
        include: {
            model: TypesofDiet,
            attributes: ["name"],
            through: {
                attributes: []
            } //ver si la sintaxis esta bien escrita
        }
    })
    return recipe
}

router.get('/recipes', async (req, res) => {
    let name = req.query.name;
    try {
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
    } catch (err) {
        console.log(err);
    }

}),

    router.get('/types', async (req, res) => {
        const dietsApi = await axios.get(`https://api.spoonacular.com/recipes/complexSearch?apiKey=${API_KEY6}&addRecipeInformation=true`)
        const arraysDiets = dietsApi.data.results.map(e => e.diets) /* diets es array */
        const dietsEach = ["ketogenic", "vegetarian", "pescetarian", "low FODMAP", "whole30", "lacto vegetarian", "ovo vegetarian"];
        arraysDiets.map((e) => {
            for (let i = 0; i < e.length; i += 1) dietsEach.push(e[i]);
        });
        dietsEach.forEach(e => {
            TypesofDiet.findOrCreate({
                where: { name: e }
            })
        });
        const allDiets = await TypesofDiet.findAll();
        res.send(allDiets);
    }),

    router.get('/recipes/:id', async (req, res) => {
            const id = req.params.id
            const idString = id.toString()
            if(idString.length<7){
                const detailApibyId = await searchByIdApi(id)
                if(detailApibyId) return res.status(200).send(detailApibyId)
            }
            else{
                const detailDbbyId = await searchByIdAtDB(id)
                if(detailDbbyId) return res.status(200).send(detailDbbyId)
                else{
                    return res.status(404).send("Recipe doesn't exist")
                }
            }
    }),

    router.post('/recipe', async (req, res) => {
        let { name, summary, score, healthScore, stepbyStep, image, createdInDb, diets } = req.body;
/*         const steps = req.body.stepbyStep.join(", ") */
        let recipeCreated = await Recipe.create({ name, summary, score, healthScore, stepbyStep, image, createdInDb });
        let dietDb = await TypesofDiet.findAll({
            where: { name: diets }
        })
        recipeCreated.addTypesofDiet(dietDb)
        res.send('Your recipe was successfully created')
    })

module.exports = router;

/* router.post("/recipe", (req,res) => {
    let {name,summary,score,healthScore,stepbyStep,img,diet}=req.body

    Recipe.create({
        name,
        summary,
        score,
        healthScore,
        stepbyStep,
        img,
    })
    .then(createdRecipe => {
        res.json(createdRecipe)
    })
    .catch(err => res.sendStatus(404))
}) */