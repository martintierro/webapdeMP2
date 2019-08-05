const mongoose = require('mongoose');
const Schema = mongoose.Schema;



//Create Schema and  Model
const userSchema = new Schema({
    username: String,
    password: String
})

const checklistSchema = new Schema({
    task: String,
    status: Boolean
})


const contentSchema = new Schema({
    title: String,
    user: userSchema,
    note: String,
    checklist: [checklistSchema],
    tags: [String] 
})

const contentModel = mongoose.model('content', contentSchema);

module.exports = contentModel;