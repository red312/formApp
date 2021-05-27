import React, { Fragment, useState, useEffect } from 'react';
import nextId from 'react-id-generator';
import ModalRules from './modal-rules';
import styled from 'styled-components';
import DeleteIcon from '@material-ui/icons/Delete';
import {TextField, Button} from '@material-ui/core';
import { makeStyles, ThemeProvider, createMuiTheme } from '@material-ui/core/styles';

const useStyles = makeStyles(() => ({
    delete: {
        fontSize: 40,
        color: '#FCAF17'
    },
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

const Block = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 20px;
    padding: 10px;
    margin-top: 20px;
    width: 400px;
    height: 30px;
    border: 1px solid black;
`;

const BlockName = styled.div`
    cursor: pointer;
    width: 100%;
`;

const Form = styled.form`
    display: flex;
    justify-content: space-around;
    align-items: center;
    font-size: 20px;
    margin-top: 20px;
    padding-bottom: 20px;
    width: 100%;
    height: 70px;
    border-bottom: 1px solid black;
`;

const Blocks = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    padding-bottom: 20px;
    margin-top: 30px;
    min-height: 100px;
`;

export default function RuleConstruct({blocks, updateRules, getRules}) {
    const classes = useStyles();
    const [rules, setRules] = useState([]);
    const [name, setName] = useState('');
    const [index, setIndex] = useState(null);
    const [isOpen, setOpen] = useState(false);
    useEffect(() => {
        setRules(getRules);
    }, [getRules]);
    const createRule = (event) => {
        event.preventDefault();
        setRules(prevRules => {
            prevRules.push({id: nextId(), name: name, ruleType: '', ruleBlocks: [], blockType: 'rule',
                ruleValue: '', fieldBlockId: '', fieldId: ''});
            return [...prevRules];
        });
        updateRules(rules);
        setName('');
    };
    const openRuleModal = (index) => {
        setIndex(index);
        setOpen(true);
    };
    const changeRule = (newRule) => {
        setRules(prevRules => {
            prevRules.splice(index, 1, newRule);
            return [...prevRules];
        });
        updateRules(rules);
        setOpen(false);
        setIndex(null);
    };
    let modal;
    if (index !== null) {
        modal = <ModalRules isOpen={isOpen}
            changeRule={changeRule} rule={rules[index]} blocks={blocks}/>;
    }
    return (
        <Fragment>
            <Form onSubmit={createRule}>
                <ThemeProvider theme={theme}>
                    <TextField variant="outlined" label={'Имя правила'} onChange={(event) => setName(event.target.value)} value={name}/>
                </ThemeProvider>
                <Button variant="outlined"
                    className={classes.button}
                    onClick={createRule}>Создать правило</Button>
            </Form>
            <Blocks>
                {rules.map((block, index) => {
                    return(
                        <Fragment  key={block.id}>
                            <Block>
                                <BlockName onClick={() => openRuleModal(index)}>
                                    {block.name}
                                </BlockName>
                                <DeleteIcon className={classes.delete} onClick = {() => {
                                    setRules(prevRules => {
                                        prevRules.splice(index, 1);
                                        return [...prevRules];
                                    });
                                }}>
                            Удалить
                                </DeleteIcon>
                            </Block>
                        </Fragment>
                    );
                })}
            </Blocks>
            {modal}
        </Fragment>
    );
}
