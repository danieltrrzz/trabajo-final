const express = require('express');
const Hotel = require('../db/models/hotel');
const Ciudad = require('../db/models/ciudad');

const router = new express.Router();

router.get('/hoteles', async (req, res) => {
    try {
        const hoteles = await Hotel.find({}).populate('ciudad');
        res.send(hoteles);
    } catch(e) {
        res.status(500).send(e);
    }
});

router.get('/hoteles/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const hotel = await Hotel.findById(id).populate('ciudad');
        if (!hotel) {
            res.status(404).send();
        } else {
            res.send(hotel);
        }
    } catch(e) {
        res.status(500).send(e);
    }
});

router.post('/hoteles', async (req, res) => {
    try {
        const dataHotel = req.body;
        const hotel = new Hotel(dataHotel);

        await hotel.save();
        res.status(201).send(hotel);
    } catch(e) {
        res.status(400).send(e);
    }
});

router.patch('/hoteles/:id', async (req, res) => {
    try {
        const id = req.params.id;

        const hotel = await Hotel.findByIdAndUpdate(
            id,
            req.body,
            { new: true, runValidators: true }
        );
        if (!hotel) {
            res.status(404).send();
        } else {
            res.send(hotel);
        }
    } catch(e) {
        res.status(500).send(e);
    }
});

router.delete('/hoteles/:id', async (req, res) => {
    try {
        const id = req.params.id;

        const hotel = await Hotel.findByIdAndDelete(id);
        if (!hotel){
            res.status(404).send();
        } else {
            res.send();
        }
    } catch(e) {
        res.status(500).send(e);
    }
});

router.post('/ciudades', async (req, res) => {
    try {
        const dataCiudad = req.body;
        const ciudad = new Ciudad(dataCiudad);

        await ciudad.save();
        res.status(201).send(ciudad);
    } catch(e) {
        res.status(400).send(e);
    }
});

// Ruta por defecto
router.use((req, res) => {
    res.sendStatus(404);
});

module.exports = router;
