const express = require("express");
const router = express.Router();
const User = require("../models/user");

// POST /users: Register a new user
router.post("/users", (req, res) => {
    try {
        const { username } = req.body;

        if (User.exists(username)) {
            return res.status(400).send({ error: "Username already taken" });
        }

        // Create new user
        const newUser = new User(username);
        newUser.save();
        res.status(201).send({ user: newUser });
    } catch (error) {
        console.error(error);
        res.status(500).send({ error: "Internal Server Error" });
    }
});

// POST /users/login: Authenticate a user (check if the user exists)
router.post("/users/login", (req, res) => {
    try {
        User.log();
        const { username } = req.body;

        const user = User.getByName(username);
        // Check if the user exists
        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }

        res.status(200).send({ user: user });
    } catch (error) {
        console.error(error);
        res.status(500).send({ error: "Internal Server Error" });
    }
});

// GET /users/{userId}: Get information about a specific user
router.get("/users/:userId", (req, res) => {
    try {
        const userId = parseInt(req.params.userId);

        // Find user by ID
        const user = User.getById(userId);
        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }

        res.status(200).send({ user: user });
    } catch (error) {
        console.error(error);
        res.status(500).send({ error: "Internal Server Error" });
    }
});

module.exports = router;
