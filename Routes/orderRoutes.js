// routes/orderRoutes.js
const express = require("express");
const router = express.Router();
const { newOrder } = require("../Controllers/orderController"); // Adjust the path as necessary
const authMiddleware = require("../Middlewares/AuthMiddleware"); // Ensure you have authentication middleware

// Route to create a new order
router.post("/orders", authMiddleware, newOrder); // Protect this route with authentication

module.exports = router;
