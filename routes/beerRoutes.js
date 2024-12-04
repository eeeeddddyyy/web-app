const express = require('express');
const router = express.Router();
const beerController = require('../controllers/beerController');

router.get('/beers', beerController.getAllBeers);
router.post('/beers', beerController.addBeer);
router.put('/beers/:id', beerController.updateBeer);
router.delete('/beers/:id', beerController.deleteBeer);

module.exports = router;