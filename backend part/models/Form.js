const {Schema, model} = require('mongoose')

const Form = new Schema({
    name: {type: String, unique: true, required: true},
    id: {type: String, unique: true, required: true},
    lines: [{type: Object, ref: 'Lane'}],
    blocks: [{type: Object, ref: 'Block'}]
})

module.exports =  model('Form', Form)
