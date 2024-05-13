const express = require("express");
const router = express.Router();
const Message = require("../models/message");
const User = require("../models/user");
let messageCounter = 0;
router.post("/messages/direct/:receiverId", (req, res) => {
    const text = req.body.text;
    const senderId = req.body.senderId;
    const receiverId = req.params.receiverId;
    if (!User.existsWithId(senderId)) {
        return res.status(400).send({ message: "Invalid sender Id" });
    }
    if (!User.existsWithId(receiverId)) {
        return res.status(400).send({ message: "Invalid receiver Id" });
    }
    const message = new Message(messageCounter, text, senderId, receiverId);
    message.send();
    res.status(201).send({ message: message });
});

module.exports = router;
