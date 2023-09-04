// Importing dependencies.
const express = require('express');
const router = express.Router();

// Importing users and links routes.
const userRoutes = require('./userRoutes');
const linksRoutes = require('./linksRoutes');

// indicating express where to find the users and links routes.
router.use(userRoutes);
router.use(linksRoutes);

module.exports = router;