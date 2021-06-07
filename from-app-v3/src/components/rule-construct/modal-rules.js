import React, { useState, useEffect, Fragment } from 'react';
import styled from 'styled-components';
import {TextField, Button, Select, MenuItem} from '@material-ui/core';
import { makeStyles, ThemeProvider, createMuiTheme } from '@material-ui/core/styles';

const useStyles = makeStyles(() => ({
    button: {
        color: '#FCAF17'
    }
}));

const theme = createMuiTheme({
    palette: {
        primary: {
            main: '#FCAF17',
            secondary: '#FCAF17'
        },
    },
});

const ModalWindow = styled.div`
    position: fixed;
    z-index: 4;
    height: 100vh;
    width: 100vw;
    background: rgba(0,0,0,.5);
    display: flex;
    justify-content: center;
    align-items: center;
    top: 0;
    left: 0;
`;

const ListDiv = styled.div`
    display: flex;
    flex-direction: column;
`;

const ContentRuleName = styled.h3`
    margin-bottom: 10px;
`;

const BlocksList = styled.div`
    display: flex;
    flex-direction: column;
`;

const ListItem = styled.div`
    margin-bottom: 10px;
`;

const ModalBody = styled.div`
    display: flex;
    flex-direction: column;
    padding: 20px;
    border-radius: 12px;
    background-color: white;
    height: 600px;
    width: 1000px;
`;

const Form = styled.div`
    display: flex;
    justify-content: space-around;
    align-items: center;
    width: 1000px;
    margin-bottom: 30px;
    border-bottom: 1px solid black;
    padding-bottom: 50px;
`;

const Content = styled.div`
    display: flex;
    justify-content: space-around;
    align-items: center;
    margin-top: 30px;
`;

export default function ModalRules({isOpen, blocks, changeRule, rule}) {
    const classes = useStyles();
    const [tmpRule, setRule] = useState({ruleBlocks: [], fieldBlockId: '', ruleValue: ''});
    const [types] = useState(['equal','changeValue']);
    const [block, setBlock] = useState('');
    const [field, setField] = useState('');
    const [type, setType] = useState('');
    const [value, setValue] = useState('');
    const [fields, setFields] = useState([]);
    useEffect(() => {
        try{
            setRule({...rule});
            setBlock(rule.fieldBlockId);
            setField(rule.fieldId);
            setType(rule.ruleType);
            setValue(rule.ruleValue);
        }
        catch (error){
            console.log(error);
        }
    }, [rule]);
    console.log();
    useEffect(() => {
        const tmpBlock = blocks.filter(item => item.id === tmpRule.fieldBlockId)[0];
        if (tmpBlock !== undefined)
            setFields(prevFields => {
                let tmpFields = [];
                tmpBlock.lines.forEach(line => {
                    line.fields.forEach(field => {
                        tmpFields = [...tmpFields, field];
                    });
                });
                prevFields = [...tmpFields];
                return [...prevFields];
            });
    }, [tmpRule.fieldBlockId, blocks]);
    useEffect(() => {
        switch(tmpRule.ruleType){
        case('equal'):
            if (tmpRule.ruleBlocks.length === 0)
                setRule(prevRule => ({...prevRule,
                    ruleBlocks: [
                        {name: 'true', blocks: []},
                        {name: 'false', blocks: []}
                    ]}));
            break;
        case('more'):
            if (tmpRule.ruleBlocks.length === 0)
                setRule(prevRule => ({...prevRule,
                    ruleBlocks: [
                        {name: 'true', blocks: []},
                        {name: 'false', blocks: []}
                    ]}));
            break;
        case('less'):
            if (tmpRule.ruleBlocks.length === 0)
                setRule(prevRule => ({...prevRule,
                    ruleBlocks: [
                        {name: 'true', blocks: []},
                        {name: 'false', blocks: []}
                    ]}));
            break;
        case('changeValue'):
            if (tmpRule.ruleBlocks.length === 0)
                setRule(prevRule => ({ ...prevRule,
                    ruleBlocks: [
                        {name: 'change', blocks: [], fields: [], value: ''}
                    ]}));
            break;
        default:
            break;
        }
    }, [tmpRule.ruleType, tmpRule.ruleBlocks.length]);
    useEffect(() => {
        try{
            setBlock(tmpRule.fieldBlockId);
            setField(tmpRule.fieldId);
            setType(tmpRule.ruleType);
            setValue(tmpRule.ruleValue);
        }
        catch(error){
            console.log(error);
        }
    }, [tmpRule.fieldBlockId, tmpRule.fieldId, tmpRule.ruleType, tmpRule.ruleValue]);
    const addBlock = (event, blockIndex) => {
        try{
            setRule(prevRule => {
                prevRule.ruleBlocks[blockIndex].blocks.push(blocks[event.target.value].id);
                return {...prevRule};
            });
        }
        catch(error){
            console.log(error);
        }
    };
    const submitRule = (event) => {
        event.preventDefault();
        try{
            changeRule(tmpRule);
        }
        catch(error){
            console.log(error);
        }
    };
    const findBlock = (blockId) => {
        const block = blocks.filter(item => item.id === blockId)[0];
        return block;
    };
    const content = tmpRule.ruleBlocks !== [] ? <Content>
        {tmpRule.ruleBlocks.map((item, index) => {
            return(
                <ListDiv key={index}>
                    <ContentRuleName>
                        {item.name}
                    </ContentRuleName>
                    <BlocksList>
                        {item.blocks.map(block => {
                            const fullBlock = findBlock(block);
                            return(
                                <ListItem key={fullBlock.id}>
                                    {fullBlock.name}
                                </ListItem>
                            );
                        })}
                    </BlocksList>
                    <Select displayEmpty variant='outlined' value={''} onChange={(event) => addBlock(event, index)}>
                        <MenuItem disabled value=''>Выбор блока</MenuItem>
                        {blocks.map((block, blockIndex) => {
                            return(
                                <MenuItem key={block.id} value={blockIndex} >
                                    {block.name}
                                </MenuItem>
                            );
                        })}
                    </Select>
                    {((tmpRule.ruleType === 'changeValue') && (tmpRule.ruleBlocks[0].blocks.length > 0)) &&
                        <>
                            <select variant='outlined'
                                onChange={event => setRule(prevRule => {
                                    prevRule.ruleBlocks[0].fields[0] = event.target.value;
                                    return {...prevRule};
                                })}>
                                {blocks.filter(item => {
                                    return item.id === tmpRule.ruleBlocks[0].blocks[0];}
                                )[0].lines.map((line) => {
                                    return(
                                        <Fragment key={line.line}>
                                            {line.fields.map((field) => {
                                                return(
                                                    <option key={field.id} value={field.id}>
                                                        {field.name}
                                                    </option>
                                                );
                                            })}
                                        </Fragment>
                                    );
                                })}
                            </select>
                            <TextField variant='outlined' value={tmpRule.ruleBlocks[0].value} onChange={
                                event => setRule(prevRule => {
                                    prevRule.ruleBlocks[0].value = event.target.value;
                                    return {...prevRule};
                                })
                            }/>
                        </>}
                </ListDiv>
            );
        })}
    </Content> : null;
    const fieldChoice = <Select displayEmpty variant='outlined' value={field} onChange={(event => {
        setRule(prevRule => ({...prevRule, fieldId: event.target.value}));
    })}>
        <MenuItem disabled value=''>Выбрать поле</MenuItem>
        {fields.map((field) => {
            return(
                <MenuItem key={field.id} value={field.id}>
                    {field.name}
                </MenuItem>
            );
        })}
    </Select>;
    return (
        <Fragment>
            {isOpen &&
                <ModalWindow>
                    <ModalBody>
                        <Form onSubmit={submitRule}>
                            <Select displayEmpty variant='outlined' value={block} onChange={(event => {
                                setRule(prevRule => ({...prevRule, fieldBlockId: event.target.value}));
                            })}>
                                <MenuItem value='' disabled>Выбрать блок</MenuItem>
                                {blocks.map((block) => {
                                    return(
                                        <MenuItem key={block.id} value={block.id}>
                                            {block.name}
                                        </MenuItem>
                                    );
                                })}
                            </Select>
                            {fieldChoice}
                            <Select displayEmpty variant='outlined' value={type} onChange={(event) => setRule(prevRule => ({...prevRule, ruleType: event.target.value}))}>
                                <MenuItem disabled value=''>
                                    Выбрать тип
                                </MenuItem>
                                {types.map((option, index) => {
                                    return (
                                        <MenuItem key={index} value={option}>
                                            {option}
                                        </MenuItem>
                                    );
                                })}
                            </Select>
                            <ThemeProvider theme={theme}>
                                <TextField variant='outlined' value={value} label={'Значение правила'} onChange={(event => setRule(prevRule => ({...prevRule, ruleValue: event.target.value})))}/>
                            </ThemeProvider>
                            <Button variant='outlined' className={classes.button} onClick={submitRule}>Завершить создание</Button>
                        </Form>
                        {content}
                    </ModalBody>
                </ModalWindow>
            }
        </Fragment>
    );
}