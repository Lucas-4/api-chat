const express = require("express");
const router = express.Router();
const Room = require("../models/room");
const User = require("../models/user");

// Middleware para verificar se a sala existe
function checkRoomExists(req, res, next) {
    const roomId = parseInt(req.params.roomId);
    const room = Room.getById(roomId);
    if (room === undefined) {
        return res.status(404).json({ error: "Room not found" });
    }
    next();
}

// Middleware para verificar se o usuário existe em uma sala
function checkUserExistsInRoom(req, res, next) {
    const roomId = parseInt(req.params.roomId);
    const userId = parseInt(req.params.userId);
    const room = Room.getById(roomId);
    if (!room.users.includes(userId)) {
        return res.status(404).json({ error: "User not found in room" });
    }
    next();
}

// POST /rooms: Criar uma nova sala
router.post("/rooms", (req, res) => {
    const room = new Room();
    room.save();
    res.status(201).json({ room: room });
});

// DELETE /rooms/:roomId: Remover uma sala
router.delete("/rooms/:roomId", checkRoomExists, (req, res) => {
    Room.delete(parseInt(req.params.roomId));
    res.status(200).send({ message: "Deleted!" });
});

// POST /rooms/:roomId/enter: Adicionar usuário a uma sala
router.post("/rooms/:roomId/enter", checkRoomExists, (req, res) => {
    if (!User.existsWithId(req.body.userId)) {
        return res.status(400).send({ message: "User not found" });
    }
    const room = Room.getById(parseInt(req.params.roomId));
    room.addUser(req.body.userId);
    res.status(201).send({ message: "User added to room" });
});

// POST /rooms/:roomId/leave: Remover usuário de uma sala
router.post("/rooms/:roomId/leave", checkRoomExists, (req, res) => {
    const room = Room.getById(parseInt(req.params.roomId));
    room.removeUser(req.body.userId);
    res.status(200).send({ message: "User removed" });
});

// DELETE /rooms/:roomId/users/:userId: Remover um usuário de uma sala
router.delete(
    "/rooms/:roomId/users/:userId",
    checkRoomExists,
    checkUserExistsInRoom,
    (req, res) => {
        const userId = parseInt(req.params.userId);
        const roomId = parseInt(req.params.roomId);
        const room = Room.getById(roomId);
        room.removeUser(userId);
        res.status(200).send({ message: "User removed" });
    }
);

// POST /rooms/:roomId/messages: Enviar uma mensagem em uma sala
router.post("/rooms/:roomId/messages", checkRoomExists, (req, res) => {
    const room = Room.getById(parseInt(req.params.roomId));
    if (!room.hasUser(req.body.senderId)) {
        return res.status(400).send({ message: "User not found in room" });
    }
    room.sendMessage(req.body.text, req.body.senderId);
    res.status(200).send({ message: "Message sent" });
});

// GET /rooms/:roomId/messages: Obter todas as mensagens de uma sala
router.get("/rooms/:roomId/messages", checkRoomExists, (req, res) => {
    const room = Room.getById(parseInt(req.params.roomId));
    const messages = room.getAllMessages();
    res.status(200).send({ messages: messages });
});

module.exports = router;
