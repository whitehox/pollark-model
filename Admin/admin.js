let db = require("../database");
let User = require("./user");
let autoincrement = require("../autoincrement");

function Admin(name, password, role) {
    User.call(this, name, password);
    this.role = role;
}

Admin.prototype = Object.create(User.prototype);
Admin.prototype.constructor = Admin;

Admin.prototype.createEvent = function(name, voteAmount, ...contestants) {
    let id = autoincrement(1, db.Events);
    (voteAmount && name && contestants ?
        db.Events.push({id : id, name : name, voteAmount : voteAmount, contestants : contestants})
        : console.log("Kindly fill in all details"));
    console.log("Event successfully created");
    return {id : id, name : name, voteAmount : voteAmount, contestants : contestants};
};

Admin.prototype.searchEvent = function(event) {
    return db.Events.filter(value => value.name === event);
};

module.exports = Admin;