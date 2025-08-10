const mongoose = require('mongoose'); 
const { Schema } = mongoose; 

const NotesSchema = new Schema({
    //Consider it like a foreign key 
    //Link between notes & users 
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    },
    title: {
        type: String, 
        required : true
    }, 
    description: {
        type: String, 
        required : true
    }, 
    tag: {
        type: String, 
        default : "General"
    }, 
    date: {
        type: Date, 
        default : Date.now
    }
});

//Exporting notes model
const Notes = mongoose.model('notes', NotesSchema); 
module.exports = Notes; 