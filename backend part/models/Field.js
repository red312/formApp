const {Schema, model} = require('mongoose')

const Field = new Schema({
    id: {type: String, required: true, unique: true},
    name: {type: String, required: true},
    value: {type: String, required: true},
    type: {type: String, required: true},
    style: {type: String, required: true},
    subStyle: {type: String, required: true},    
})

module.exports = model('Field', Field)
