const { Router } = require('express');
const getAllDogs = require('../controllers/getAllDogs');
const getDogsById = require('../controllers/getDogById');
const getTemperaments = require('../controllers/getTemperaments');
const postDog = require('../controllers/postDog');
const getDogByname = require('../controllers/getDogByName');

const router = Router();

router.get('/dogs', getAllDogs)
router.get('/dogs/name', getDogByname)  // ojo con el orden de las rutas
router.get('/dogs/:id', getDogsById)
router.post('/dogs', postDog)
router.get('/temperaments', getTemperaments)







module.exports = router;
