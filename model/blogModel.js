const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const ArticleSchema = new Schema({
    title: {
        type: String,
        required: true,
        unique: true
    },
    description: String,
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    state: {
        type: String,
        enum: ['draft', 'published'],
        default: 'draft'
    },
    readCount: {
        type: Number,
        default: 0
    },
    readingTime: String,
    tags: [String],
    body: {
        type: String,
        required: true
    },
    timestamp: {
        type: Date,
        default: Date.now,
        required: true
    }
})





const Article = mongoose.model("Article", ArticleSchema);

module.exports = Article;