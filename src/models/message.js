const messages = [];

class Message {
    constructor(id, text, senderId, receiverId) {
        this.id = id;
        this.text = text;
        this.senderId = senderId;
        this.receiverId = receiverId;
        this.date = new Date();
    }

    send() {
        messages.push(this);
    }
}

module.exports = Message;
