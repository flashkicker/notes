const fs = require('fs');

var fetchNotes = () => {
    try {
        var notesString = fs.readFileSync('notes-data.json');
        return JSON.parse(notesString);
    } catch (err) {
        return [];
    }
};

var saveNotes = (notes) => {
    fs.writeFileSync('notes-data.json', JSON.stringify(notes));
};

var addNote = (title, body) => {
    var notes = fetchNotes();
    var note = {
        title,
        body
    };

    var duplicateNotes = notes.filter((note) => note.title === title);

    if(duplicateNotes.length === 0) {
        notes.push(note);
        saveNotes(notes);
        return note;
    }
};

var getAll = () => {
    var notes = fetchNotes();
    console.log("You have saved the following notes:")
    for(var value of notes) {
        var title = value.title
        console.log(title);
    }
};

var readNote = (title) => {
    var notes = fetchNotes();
    var requiredNote = notes.filter((note) => note.title === title);
    return requiredNote[0];
};

var removeNote = (title) => {
    var notes = fetchNotes();
    var newNotes = notes.filter((note) => note.title != title);
    saveNotes(newNotes);
    
    return notes.length !== newNotes.length;
};

var logNote = (note) => {
    console.log(note.title);
    console.log("-----------");
    console.log(note.body);
}

module.exports = {
    addNote,
    getAll,
    readNote,
    removeNote,
    logNote
}