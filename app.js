const fs = require('fs');
const _ = require('lodash');
const yargs = require('yargs');

const notes = require('./notes');

const argv = yargs.argv;
var command = argv._[0];
// console.log("Command:", command);

if (command === "add") {
    var note = notes.addNote(argv.title, argv.body);
    if(_.isUndefined(note)) {
        console.log("That title already exists. Please choose another title.");
    }
    else {
        console.log("Your note was successfully added.\n");
        notes.logNote(note);
    }
}
else if (command === "list") {
    notes.getAll();
}
else if (command === "read") {
    var note = notes.readNote(argv.title);
    if (_.isUndefined(note) || _.isEmpty(note)) {
        console.log("ERROR: Note not found!!! Use 'node app.js list' to view saved notes. ");
    }
    else {
        notes.logNote(note);
    }
}
else if (command === "remove") {
    var noteRemoved = notes.removeNote(argv.title);
    if(noteRemoved) {
        console.log(argv.title + " was successfully removed."); 
    }
    else {
        console.log("ERROR: Note not found!!! Use 'node app.js list' to view saved notes. ");
        console.log(notes.getAll());
    }
}
else {
    console.log("Command not recognized.");
}

