const users = [];
let userCounter = 0;

class User {
    constructor(username) {
        this.id = userCounter;
        userCounter++;
        this.username = username;
    }

    save() {
        users.push(this);
    }

    static getByName(username) {
        return users.find((user) => {
            return user.username === username;
        });
    }

    static getById(userId) {
        return users.find((user) => {
            return user.id === userId;
        });
    }
    static existsWithId(userId) {
        if (this.getById(userId) === undefined) {
            return false;
        }
        return true;
    }

    static exists(username) {
        if (this.getByName(username) === undefined) {
            return false;
        }
        return true;
    }

    static log() {
        console.log(users);
    }
}

module.exports = User;
