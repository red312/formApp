import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import {TextField, Select, MenuItem} from '@material-ui/core';
import { ThemeProvider, createMuiTheme } from '@material-ui/core/styles';


const theme = createMuiTheme({
    palette: {
        primary: {
            main: '#FCAF17',
            secondary: '#FCAF17'
        },
    },
});

const FormInput = styled.div`
    width: 800px;
    height: 200px;
    border-bottom: 1px solid black;
    margin-bottom: 50px;
    display: flex;
    justify-content: space-around;
    align-items: center;
`;

export default function FieldInfo({field, changeContent}){
    const [style, setStyle] = useState(['']);
    useEffect(() => {
        if (field.content === undefined)
            setStyle(['']);
        else {
            if (field.content.length === 0)
                setStyle(['']);
            else setStyle(field.content);}
    }, [field]);
    let content;
    switch(field.style){
    case('INPUT'):
        content = <FormInput>
            <Select variant='outlined' value={style[0]} onChange={(event) => changeContent(event.target.value, 0)}>
                <MenuItem disabled>Выберите картинку</MenuItem>
                <MenuItem value={'Profile'}>Profile</MenuItem>
                <MenuItem value={'Date'}>Date</MenuItem>
                <MenuItem value={'Place'}>Place</MenuItem>
            </Select>
        </FormInput>;
        break;
    case('SELECT'):
        switch(field.subStyle){
        case('TWOSMALL'):
            content=<FormInput>
                <ThemeProvider theme={theme}>
                    <TextField placeholder={'Левый блок'} onChange={(event) => changeContent(event.target.value, 0)}/>
                    <TextField placeholder={'Правый блок'} onChange={(event) => changeContent(event.target.value, 1)}/>
                </ThemeProvider>
            </FormInput>;
            break;
        default:
            break;
        }
        break;
    case('CHECKBOX'):
        content = <FormInput>
            <ThemeProvider theme={theme}>
                <TextField placeholder={'Основной текст'} onChange={(event) => changeContent(event.target.value, 0)}/>
                <TextField placeholder={'Побочный текст'} onChange={(event) => changeContent(event.target.value, 1)}/>
            </ThemeProvider>
        </FormInput>;
        break;
    default:
        break;
    }
    return(
        <>
            {content}
        </>
    );
}