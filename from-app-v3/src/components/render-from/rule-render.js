import React, { Fragment } from 'react';
import FieldRender from './field-render';

export default function RuleRender({blocks, rule, line, changeFieldValue}) {
    const checkRule = () => {
        let content = null;
        const blockIndex = blocks.findIndex(item => item.id === rule.fieldBlockId);
        let fieldIndex, lineIndex;
        let fieldIndexRule, lineIndexRule;
        blocks[blockIndex].lines.forEach((line, index) => {
            line.fields.forEach((item, fIndex) => {
                if (item.id === rule.fieldId){
                    lineIndex = index;
                    fieldIndex = fIndex;
                }
            });
        });
        switch(rule.ruleType){
        case('equal'):
            if (blocks[blockIndex].lines[lineIndex].fields[fieldIndex].value === rule.ruleValue){
                content = blocks.filter(item => item.id === rule.ruleBlocks[0].blocks[0]);
            }
            else content = blocks.filter(item => item.id === rule.ruleBlocks[1].blocks[0]);
            break;
        case('more'):
            if (Number(blocks[blockIndex].lines[lineIndex].fields[fieldIndex].value) > Number(rule.ruleValue)){
                content = blocks.filter(item => item.id === rule.ruleBlocks[0].blocks[0]);
            }
            else content = blocks.filter(item => item.id === rule.ruleBlocks[1].blocks[0]);
            break;
        case('less'):
            if (Number(blocks[blockIndex].lines[lineIndex].fields[fieldIndex].value) < Number(rule.ruleValue)){
                content = blocks.filter(item => item.id === rule.ruleBlocks[0].blocks[0]);
            }
            else content = blocks.filter(item => item.id === rule.ruleBlocks[1].blocks[0]);
            break;
        case('changeValue'):
            if (blocks[blockIndex].lines[lineIndex].fields[fieldIndex].value === rule.ruleValue){
                content = blocks.filter(item => item.id === rule.ruleBlocks[0].blocks[0]);
                content[0].lines.forEach((line, index) => {
                    line.fields.forEach((item, fIndex) => {
                        if (item.id === rule.ruleBlocks[0].fields[0]){
                            lineIndexRule = index;
                            fieldIndexRule = fIndex;
                        }
                    });
                });
                content[0].lines[lineIndexRule].fields[fieldIndexRule].value = rule.ruleBlocks[0].value;
            }
            else content = blocks.filter(item => item.id === rule.ruleBlocks[0].blocks[0]);
            break;
        default:
            break;
        }
        return content;
    };
    const content = checkRule();
    const block = ((content === null) || (content.length === 0)) ? null :
        <FieldRender block={content[0]} line={line} changeFieldValue={changeFieldValue} ruleBlockIndex={0}/>;
    return (
        <Fragment>
            {block}
        </Fragment>
    ); 
}
