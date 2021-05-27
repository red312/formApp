import React from 'react';
import styled from 'styled-components';
import Profile from './public/profile.svg';
import Date from './public/date.svg';
import Place from './public/place.svg';

const Field = styled.div`
    background: #FFFFFF;
    border: 1px solid #D2D2D2;
    box-sizing: border-box;
    border-radius: 4px;
    width: 100%;
    max-width: 332px;
    height: 52px;
    padding: 8px 16px 6px 16px;
    font-family: Roboto;
    font-style: normal;
    font-weight: normal;
    font-size: 16px;
    line-height: 22px;
    margin-top: 24px;
`;

const Input = styled.input`
    background: transparent;
    border: none;
    outline: none;
    width: 100%;
    font-family: Roboto;
    font-style: normal;
    font-weight: normal;
    font-size: 16px;
    line-height: 22px;
    color: #353535;
`;

const InputName = styled.div`
    /* width: auto; */
    height: 16px;
    left: 16px;
    top: 8px;
    font-family: Roboto;
    font-style: normal;
    font-weight: normal;
    font-size: 12px;
    line-height: 16px;
    color: #A6A6A6;
`;

const Img = styled.img`
    width: 24px;
    height: 24px;
    position: relative;
    bottom: 35px;
    left: 95%;
`;
export default function InputWithName({field, changeFieldValue, blockline, line, blockId}){
    const changeValue = (event) => {
        changeFieldValue(line, blockId, blockline, field.id, event.target.value);
    };
    let img;
    switch(field.content[0]){
    case('Place'):
        img = <Img src={Place}/>;
        break;
    case('Date'):
        img = <Img src={Date}/>;
        break;
    case('Profile'):
        img = <Img src={Profile}/>;
        break;
    default:
        img = null;
    }
    return(
        <>
            <Field key={field.id}>
                <InputName>{field.name}</InputName>
                <Input onChange={changeValue} value={field.value}/>
                {img}
            </Field>
        </>
    );
}
