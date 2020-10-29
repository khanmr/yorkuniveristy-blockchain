const mongoose = require('mongoose');

const NoteSchema = mongoose.Schema({
    title: String,
    content: String,
    note_category: String,
    note_list_name: String
}, {
    timestamps: true
});

module.exports = mongoose.model('Note', NoteSchema);