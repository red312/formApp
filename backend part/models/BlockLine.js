const {Schema, model} = require('mongoose')

const BlockLine = new Schema({
    line: {type: String, required: true},
    fields: [{type: Object, ref: 'Field'}]
})

module.exports =  model('BlockLine', BlockLine)
