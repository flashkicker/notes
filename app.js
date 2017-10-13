const fs = require('fs');
const _ = require('lodash');
const yargs = require('yargs');

const notes = require('./notes');

const titleOptions = {
    describe: 'Title of note',
    demand: true,
    alias: 't'
}

const bodyOptions = {
        describe: 'Body of the note',
        demand: true,
        alias: 'b'
}

const argv = yargs
.command('add', 'Add a new note', {
    title: titleOptions,
    body: bodyOptions
})
.command('read', 'Read a saved note', {
    title: titleOptions,
})
.command('list', 'List all the saved notes')
.command('remove', 'Remove a saved note', {
    title: titleOptions
})
.help()
.argv;

var command = argv._[0];

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


