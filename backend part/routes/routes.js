const express = require('express');
const router = express.Router();
const Form = require('../models/Form');
const Field = require('../models/Field');


router.post('/form', async (req, res) => {
        try{
            const content = req.body.form
            const neww = await Form.findOne({id: content.id})
            console.log(neww)
            if (neww === null) {
                const newForm = new Form({id: content.id, lines: content.lines, name: content.name, blocks: req.body.blocks})
                await newForm.save();
            }
            else await Form.findOneAndUpdate({id: content.id}, {id: content.id, lines: content.lines, name: content.name, blocks: req.body.blocks})
            return res.json({message: 'Форма добавлена'})
        }
        catch(e){
            console.log(e);
            res.status(400).json({message: 'Невозможно добавить форму'})
        }
    })
    router.get('/:formId', async (req, res) => {
        try{
            const id = req.params.formId
            const form = await Form.findOne({id: id})
            return await res.json(form);
        }
        catch(e){
            console.log(e);
        }
    })
    router.get('/', async (req, res) => {
        try{
            const forms = await Form.find()
            console.log(forms)
            return await res.json(forms);
        }
        catch(e){
            console.log(e);
        }
    })
module.exports = router;
