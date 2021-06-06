import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
// import nextId from 'react-id-generator';
import FieldInfo from './field-info';
import DefaultForms from './default-forms';
import {TextField, Button, Select, MenuItem} from '@material-ui/core';
import { makeStyles, ThemeProvider, createMuiTheme } from '@material-ui/core/styles';

const useStyles = makeStyles(() => ({
    delete: {
        fontSize: 40,
        color: '#FCAF17'
    },
    button: {
        color: '#FCAF17'
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

const DefaultBlock = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
`;

const ModalWindow = styled.div`
    position: fixed;
    z-index: 4;
    height: 100vh;
    width: 100vw;
    /* background: rgba(0,0,0,.5); */
    display: flex;
    justify-content: center;
    align-items: center;
    top: 0;
    left: 0;
`;

const ModalBody = styled.div`
    padding: 20px;
    border-radius: 12px;
    background-color: white;
    height: 600px;
    width: 800px;
`;

const Form = styled.div`
    display: flex;
    justify-content: space-between;
    margin-bottom: 50px;
    padding-bottom: 20px;
    border-bottom: 1px solid black;
`;

export default function FieldModal({open, addField, receivedField}){
    const classes = useStyles();
    const [field, setField] = useState({style: 'INPUT', content: []});
    const [type, setType] = useState('');
    const [style, setStyle] = useState('');
    const [subStyle, setSubStyele] = useState('');
    const [types] = useState(['INT', 'STR', 'TEXT']);
    const [styles] = useState(['INPUT', 'TITLE', 'SELECT', 'CHECKBOX']);
    const [subStyles] = useState([{name: 'INPUT', items: ['NAME', 'NONAME']},
        {name: 'TITLE', items: ['MAIN', 'SUB']},
        {name: 'SELECT', items: ['TWOSMALL']},
        {name: 'CHECKBOX', items: ['ARROW', 'CLASSIC']}
    ]);
    const [value, setValue] = useState('');
    useEffect(() => {
        setField(receivedField);
        setType(receivedField.type);
        setStyle(receivedField.style);
        setSubStyele(receivedField.subStyle);
    }, [receivedField]);
    useEffect(() => {
        setType(field.type);
        setStyle(field.style);
        setSubStyele(field.subStyle);
    }, [field]);
    const changeContent = (value, index) => {
        setField(prevField => {
            if (prevField.content[index]){
                prevField.content.splice(index, 1, value);
                return {...prevField};
            }
            return {...prevField, content: [...prevField.content, value]};
        });
    };
    const sendField = (event) => {
        event.preventDefault();
        if ((field.name === '') || (field.type === '') || (field.style === '')){
            alert('Заполните все поля');
        }
        else {
            addField({...field});
            setField({});
        }
        
    };
    const changeFieldValue = (newValue) => {
        setValue(newValue);
    };
    const content = field.id !== undefined ? <Form onSubmit={sendField}>
        <Select variant='outlined' value={type}  onChange={(event) => setField(prevField => ({...prevField, type: event.target.value}))}>
            <MenuItem disabled>Тип поля</MenuItem>
            {types.map((option, index) => {
                return(
                    <MenuItem key={index} value={option}>
                        {option}
                    </MenuItem>
                );
            })}
        </Select>
        <Select variant='outlined' value={style} onChange={(event) => setField(prevField => ({...prevField, style: event.target.value}))}>
            <MenuItem disabled>Стиль поля</MenuItem>
            {styles.map((option, index) => {
                return(
                    <MenuItem key={index} value={option}>
                        {option}
                    </MenuItem>
                );
            })}
        </Select>
        <Select variant='outlined' value={subStyle} onChange={(event) => setField(prevField => ({...prevField, subStyle: event.target.value}))}>
            <MenuItem disabled>Доп. стиль</MenuItem>
            {(field.style !== '') && subStyles[subStyles.findIndex(item => item.name === field.style)].items.map((option, index) => {
                return(
                    <MenuItem key={index} value={option}>
                        {option}
                    </MenuItem>
                );
            })}
        </Select>
        <ThemeProvider theme={theme}>
            <TextField value={field.name} variant='outlined' className={classes.input} label={'Имя поля'} onChange={(event) => {
                setField(prevField => ({...prevField, name: event.target.value}));
            }}/>
        </ThemeProvider>
        <Button onClick={sendField} variant='outlined' className={classes.button}>Закрыть</Button>
    </Form> : null;
    return(
        <>
            {open && <ModalWindow>
                <ModalBody>
                    {content}
                    <FieldInfo field={{...field}} changeContent={changeContent}/>
                    <DefaultBlock>
                        <DefaultForms field={{...field, value: value}}
                            changeFieldValue= {changeFieldValue}/>
                    </DefaultBlock>
                </ModalBody>
            </ModalWindow>}
        </>
    );
}
