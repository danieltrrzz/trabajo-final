const express = require('express');

const router = new express.Router();

router.get('/', (req, res) => {
    // res.sendFile('../views/index.html', { root: __dirname });
    res.render('index');
});

router.get('/about', (req, res) => {
    // res.sendFile('../views/about.html', { root: __dirname });
    res.render('about');
});

// Ruta por defecto
router.use((req, res) => {
    // res.status(404).sendFile('../views/404.html', { root: __dirname });
    res.status(404).render('404');
});

module.exports = router;
