'use stric';

const express = require('express');
const router = express.Router();

const genericController = require('../controller/dbController');
const controller = genericController('reservas');

const endPoint = '/reservas';

router.get(endPoint + "/:id?", controller.get);
router.post(endPoint, controller.post);
router.put(endPoint + "/:id", controller.put);
router.patch(endPoint + "/:id", controller.patch);
router.delete(endPoint + "/:id", controller.delete);

module.exports = router;