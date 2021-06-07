import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import DeleteIcon from '@material-ui/icons/Delete';
import FormService from '../../service/FormService';
import { TextField, Button, Grid, MenuItem, Select } from '@material-ui/core';
import {
    makeStyles,
    ThemeProvider,
    createMuiTheme,
} from '@material-ui/core/styles';
import nextId from 'react-id-generator';

const useStyles = makeStyles(() => ({
    delete: {
        fontSize: 40,
        color: '#FCAF17',
    },
    button: {
        color: '#FCAF17',
        width: '100px',
    },
    grid: {
        marginLeft: '30px',
        width: '100%',
        marginBottom: '24px',
    },
    paper: {
        padding: '20px',
        marginRight: '70px',
        color: 'black',
    },
}));

const theme = createMuiTheme({
    palette: {
        primary: {
            main: '#FCAF17',
            secondary: '#FCAF17',
        },
    },
});
const ConstuctBody = styled.div`
    display: flex;
    justify-content: space-around;
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

const JsonDiv = styled.pre`
    width: 60%;
    margin-left: 100px;
`;

const Block = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 20px;
  padding: 10px;
  margin-top: 20px;
  height: 30px;
  border: 1px solid black;
`;

const Constructor = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
`;

const BottomPanel = styled.div`
    display: flex;
    justify-content: space-around;
    margin-top: 20px;
`;

export default function FormConstruct({formId, formName, formLines, getBlocks, getRules}) {
    const classes = useStyles();
    const [blocks, setBlocks] = useState([]);
    const [rules, setRules] = useState([]);
    const [allBlocks, setAllBlocks] = useState([]);
    const [block, setBlock] = useState({});
    const [line, setline] = useState('');
    const [formJson, setFormJson] = useState('');
    const [name, setName] = useState('');
    const [fieldBlock, setFieldBlock] = useState('');
    const [ruleBlock, setRuleBlock] = useState('');
    const [id, setId] = useState('');
    const formService = new FormService();
    const updateForm = () => {
        try{
            formService
                .postForm(JSON.stringify({form: {name: name, id: id, lines: allBlocks}, blocks: blocks}))
                .catch(error => {
                    alert(error);
                });
            localStorage.setItem('formId', id);
        }
        catch(error){
            alert(error);
        }
    };
    useEffect(() => {
        console.log(formLines);
        setAllBlocks(formLines);
        setName(formName);
        if (formId === ''){
            const newId = nextId();
            const rnd = Math.floor(Math.random()*100);
            setId(`${newId}${rnd}`);
        }
        else setId(formId);
    }, [formLines, formName, formId]);
    useEffect(() => {
        setBlocks(getBlocks);
        setRules(getRules);
    }, [getBlocks, getRules]);
    useEffect(() => {
        setFormJson(JSON.stringify(allBlocks, null, 4));
    }, [allBlocks]);
    const addRuleBlock = (event) => {
        setBlock(rules[event.target.value]);
        setRuleBlock(event.target.value);
    };
    const addFieldBlock = (event) => {
        setFieldBlock(event.target.value);
        setBlock(blocks[event.target.value]);
    };
    const addBlock = (event) => {
        event.preventDefault();
        setFieldBlock('');
        setRuleBlock('');
        if (event.target.value !== null) {
            setAllBlocks((prevBlocks) => {
                const index = allBlocks.findIndex((item) => item.line === line);
                if (index !== -1) {
                    prevBlocks[index].blocks.push(block);
                } else {
                    prevBlocks.push({ line, blocks: [block] });
                }
                return [...prevBlocks];
            });
        }
        setBlock({});
        setline('');
    };
    const deleteBlock = (lineIndex, blockIndex) => {
        setAllBlocks((prevBlocks) => {
            prevBlocks[lineIndex].blocks.splice(blockIndex, 1);
            if (prevBlocks[lineIndex].blocks.length === 0){
                prevBlocks.splice(lineIndex, 1);
            }
            return [...prevBlocks];
        });
    };
    const renderSteps = () => {
        try{
            updateForm();
        }
        catch(error){
            alert(error);
        }
    };
    const content =
    allBlocks.length > 0
        ? allBlocks.map((line, lineIndex) => (
            <Grid
                spacing={0}
                key={line.line}
                container
                className={classes.grid}
            >
                {line.blocks.map((block, blockIndex) => (
                    <Grid item key={block.id} xs>
                        <Block className={classes.paper}>
                            {block.name}
                            <DeleteIcon
                                className={classes.delete}
                                onClick={() => deleteBlock(lineIndex, blockIndex)}
                            >
                    Удалить блок
                            </DeleteIcon>
                        </Block>
                    </Grid>
                ))}
            </Grid>
        ))
        : null;
    return (
        <>
            <ConstuctBody>
                <Constructor>
                    <Form onSubmit={addBlock}>
                        <ThemeProvider theme={theme}>
                            <TextField
                                variant="outlined"
                                value={line}
                                placeholder="Номер строки"
                                onChange={(event) => setline(event.target.value)}
                            />
                        </ThemeProvider>
                        <Select
                            value={fieldBlock}
                            displayEmpty
                            variant="outlined"
                            onChange={addFieldBlock}
                        >
                            <MenuItem disabled value=''>Выбрать блок полей</MenuItem>
                            {blocks.map((block, index) => (
                                <MenuItem key={block.id} value={index}>
                                    {block.name}
                                </MenuItem>
                            ))}
                        </Select>
                        <Select
                            displayEmpty
                            value={ruleBlock}
                            variant="outlined"
                            onChange={addRuleBlock}
                        >
                            <MenuItem disabled value=''>Выбрать блок правил</MenuItem>
                            {rules.map((rule, index) => (
                                <MenuItem key={rule.id} value={index}>
                                    {rule.name}
                                </MenuItem>
                            ))}
                        </Select>
                        <Button
                            className={classes.button}
                            onClick={addBlock}
                            variant="outlined"
                        >
          Доабвить блок
                        </Button>
                    </Form>
                    {content}
                    <BottomPanel>
                        <TextField variant="outlined" placeholder={'Имя формы'} value={name} onChange={event => setName(event.target.value)}/>
                        <Button
                            className={classes.button}
                            variant="outlined"
                            onClick={renderSteps}
                        >
        Рендер
                        </Button>
                    </BottomPanel>
                </Constructor>
                <JsonDiv>
                    <code>{formJson}</code>
                </JsonDiv>
            </ConstuctBody>
        </>
    );
}
