import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import FieldModal from './field-modal/field-modal';
import DeleteIcon from '@material-ui/icons/Delete';
import {Grid, Paper, TextField, Button} from '@material-ui/core';
import { makeStyles, ThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import nextId from 'react-id-generator';

const useStyles = makeStyles(() => ({
    delete: {
        fontSize: 40,
        color: '#FCAF17'
    },
    button: {
        color: '#FCAF17'
    },
    grid: {
        width: '100%',
        margin: '0px'
    },
    paper: {
        padding: '20px',
        color: 'black',
        backgroundColor: 'lightgrey',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        fontSize: '20px',
        marginBottom: '30px'
    },
    input: {
        palette: {
            primary: '#FCAF17'
        }
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
    /* justify-content: center;
    align-items: center; */
    padding: 20px;
    border-radius: 12px;
    background-color: white;
    height: 600px;
    width: 800px;
    overflow: auto;
    ::-webkit-scrollbar{
        width:0;
    }
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
    margin-bottom: 50px;
`;

const BlockName = styled.div`
    width: 100%;
    display: flex;
    justify-content: center;
    font-size: 30px;
`;

const ContentBlock = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    width: 500px;
    margin-left: 150px;
`;

const FieldName = styled.div`
    width: 90%;
`;

export default function BlockModal({block, isOpen, changeBlock}) {
    const classes = useStyles();
    const [field, setField] = useState({});
    const [line, setline] = useState('');
    const [tmpBlock, setBlock] = useState({lines: []});
    const [open, setOpen] = useState(false);
    useEffect(() => {
        setBlock({...block});
    }, [block]);

    const createField = (event) => {
        setField({id: nextId(), style: '', content: [], type: '', subStyle: '', name: ''});
        event.preventDefault();
        setOpen(true);
    };
    const addField = (field) => {
        setBlock(prevBlock => {
            const index = prevBlock.lines.findIndex(item => item.line === line);
            if (index !== -1){
                const fieldIndex = prevBlock.lines[index].fields.findIndex(item => item.id === field.id);
                if (fieldIndex !== -1)
                    prevBlock.lines[index].fields.splice(fieldIndex, 1, field);
                else prevBlock.lines[index].fields.push(field);
            }
            else {
                prevBlock.lines.push({line: line, fields: [field]});
            }
            return {...prevBlock};
        });
        setOpen(false);
        setline('');
    };
    const sendResult = () => {
        changeBlock(tmpBlock);
    };
    const changeField = (field, line) => {
        setField(field);
        setline(line);
        setOpen(true);
    };
    const content = tmpBlock.lines.length > 0 ? tmpBlock.lines.map((line, lineIndex) => {
        return(
            <Grid spacing={2} key={line.line} container className={classes.grid}>
                {line.fields.map((field, index) => {
                    return(
                        <Grid item key={field.id} xs>
                            <Paper className={classes.paper}
                            >
                                <FieldName onClick={() => changeField(field, line.line)}>
                                    {field.name}
                                </FieldName>
                                <DeleteIcon className={classes.delete} onClick={() => setBlock(prevBlock => {
                                    prevBlock.lines[lineIndex].fields.splice(index,1 );
                                    return {...prevBlock};
                                })}>Удалить</DeleteIcon>
                            </Paper>
                        </Grid>
                    );
                })}
            </Grid>
        );
    }) : null;
    return (
        <>
            {isOpen && <ModalWindow>
                <ModalBody>
                    <BlockName>
                        {tmpBlock.name}
                    </BlockName>
                    <Form onSubmit={(event) => createField(event, {})}>
                        <ThemeProvider theme={theme}>
                            <TextField value={line} label={'Номер строки'} onChange={(event) =>
                                setline(event.target.value)}/>
                        </ThemeProvider>
                        <Button variant="outlined"
                            onClick={createField}  className={classes.button}>Редактировать поле</Button>
                    </Form>
                    <ContentBlock>
                        {content}
                        <Button variant="outlined"
                            className={classes.button} onClick={sendResult}>Завершить редактирование блока</Button>
                    </ContentBlock>
                    <FieldModal open={open} addField={(event) => addField(event, {})} receivedField={field}/>
                </ModalBody>
            </ModalWindow>}
        </>
    );
}
