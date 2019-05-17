const mongoose = require('mongoose')
const Schema = mongoose.Schema

const WatchSchema = new Schema({
    coinId: {
        type: Number,
        required: true,
        unique: true
    },
    

})

module.exports = Watchs = mongoose.model('watch', WatchSchema)