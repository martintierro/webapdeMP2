const mongoose = require('mongoose');
const Schema = mongoose.Schema;



//Create Schema and  Model
const checklistSchema = new Schema({
    task: String,
    status: Boolean
})


const contentSchema = new Schema({
    title: String,
    username: String,
    note: String,
    checklist: [checklistSchema],
    tags: [String] 
})

const contentModel = mongoose.model('content', contentSchema);

module.exports = contentModel;