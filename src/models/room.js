const rooms = [];
let roomCounter = 0;

class RoomMessage {
    constructor(id, text, senderId) {
        this.id = id;
        this.text = text;
        this.senderId = senderId;
    }
}

class Room {
    constructor() {
        this.id = roomCounter;
        roomCounter++;
        this.users = [];
        this.messages = [];
        this.messageCounter = 0;
    }

    save() {
        rooms.push(this);
    }

    static delete(roomId) {
        let roomIndex = rooms.findIndex((room) => room.id === roomId);
        if (roomIndex === -1) {
            return;
        }
        rooms.splice(roomIndex, 1);
    }

    static getById(roomId) {
        const room = rooms.find((room) => {
            return room.id === roomId;
        });
        return room;
    }

    addUser(userId) {
        if (!this.users.includes(userId)) {
            this.users.push(userId);
        }
    }

    removeUser(userId) {
        let userIndex = this.users.findIndex((user) => user == userId);
        if (userIndex === -1) {
            return;
        }
        this.users.splice(userIndex, 1);
    }

    sendMessage(text, senderId) {
        const message = new RoomMessage(this.messageCounter, text, senderId);
        this.messages.push(message);
        this.messageCounter++;
    }

    hasUser(userId) {
        if (this.users.find((user) => user === userId) === undefined) {
            return false;
        }
        return true;
    }
    getAllMessages() {
        return this.messages;
    }
    static log() {
        console.log(rooms);
    }
}

module.exports = Room;
