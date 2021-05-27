const {Schema, model} = require('mongoose')

const Lane = new Schema({
    lane: {type: String, required: true},
    blocks: [{type: Object, ref: 'Block'}]
})

module.exports =  model('Lane', Lane)
