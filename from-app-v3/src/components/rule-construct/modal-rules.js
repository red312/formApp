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

const ModalBody = styled.div`
    display: flex;
    flex-direction: column;
    padding: 20px;
    border-radius: 12px;
    background-color: white;
    height: 600px;
    width: 800px;
`;

const Form = styled.div`
    display: flex;
    justify-content: space-around;
    align-items: center;
    width: 800px;
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
    const [types] = useState(['equal','changeValue' ,'']);
    useEffect(() => {
        setRule({...rule});
    }, [rule]);
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
    const addBlock = (event, blockIndex) => {
        setRule(prevRule => {
            prevRule.ruleBlocks[blockIndex].blocks.push(blocks[event.target.value].id);
            return {...prevRule};
        });
    };
    const submitRule = (event) => {
        event.preventDefault();
        changeRule(tmpRule);
    };
    const content = tmpRule.ruleBlocks !== [] ? <Content>
        {tmpRule.ruleBlocks.map((item, index) => {
            return(
                <div key={index}>
                    {item.name}
                    {item.blocks.map(block => {
                        return(
                            <div key={block.id}>
                                {block.name}
                            </div>
                        );
                    })}
                    <Select variant='outlined' onChange={(event) => addBlock(event, index)}>
                        <MenuItem value=''> </MenuItem>
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
                </div>
            );
        })}
    </Content> : null;
    const fieldChoice = tmpRule.fieldBlockId !== '' ? <select variant='outlined' value={tmpRule.fieldId} onChange={(event => {
        setRule(prevRule => ({...prevRule, fieldId: event.target.value}));
    })}>
        <option value={null}> </option>
        {blocks.filter(item => item.id === tmpRule.fieldBlockId)[0].lines.map((line) => {
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
    </select> : null;
    return (
        <Fragment>
            {isOpen &&
                <ModalWindow>
                    <ModalBody>
                        <Form onSubmit={submitRule}>
                            <Select variant='outlined' value={tmpRule.fieldBlockId} onChange={(event => {
                                setRule(prevRule => ({...prevRule, fieldBlockId: event.target.value}));
                            })}>
                                <MenuItem value={null}> </MenuItem>
                                {blocks.map((block) => {
                                    return(
                                        <MenuItem key={block.id} value={block.id}>
                                            {block.name}
                                        </MenuItem>
                                    );
                                })}
                            </Select>
                            {fieldChoice}
                            <Select variant='outlined' value={tmpRule.ruleType} onChange={(event) => setRule(prevRule => ({...prevRule, ruleType: event.target.value}))}>
                                {types.map((option, index) => {
                                    return (
                                        <MenuItem key={index} value={option}>
                                            {option}
                                        </MenuItem>
                                    );
                                })}
                            </Select>
                            <ThemeProvider theme={theme}>
                                <TextField variant='outlined' value={tmpRule.ruleValue} onChange={(event => setRule(prevRule => ({...prevRule, ruleValue: event.target.value})))}/>
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
