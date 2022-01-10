const { Router } = require('express');
const {Recipe, TypeofDiet} = require('../db');
const {YOUR_API_KEY} = process.env;
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');


const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
const getApiRecipes = async () =>{
    const apiUrl = await axios.get('https://api.spoonacular.com/recipes/complexSearch?apiKey={YOUR_API_KEY}&addRecipeInformation=true&number=100'); /* así traemos las recetas + la info, y limitamos a 100 */
    const apiInfo = await apiUrl.data.map(e => {
        return {
            name: e.title
        }
    }); /* en axios la info me llega en un 'data' */
    return apiInfo;
}
 const getDBRecipes = async () => {
     return await Recipe.findAll({
         include:{
             
         }
     })
 }

module.exports = router;
