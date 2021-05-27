const {Schema, model} = require('mongoose')

const Block = new Schema({
    id: {type: String, unique: true, required: true},
    name: {type: String, unique: true, required: true},
    type: {type: String, required: true},
    ruluValue: {type: String, required: true},
    ruleType: {type: String, required: true},
    fieldBlockId: {type: String, required: true},
    fieldId: {type: String, required: true},
    blockLines: [{type: Object, ref: 'BlockLine'}],
    blocks: [{type: Object, required: true}]
})

module.exports =  model('Block', Block)
